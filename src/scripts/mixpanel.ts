const TOKEN_META = 'meta[name="mixpanel-token"]';
const DEV_META = 'meta[name="astro-dev"]';

function shouldRespectDNT(): boolean {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return true;
  }

  return (
    navigator.doNotTrack === "1" ||
    // @ts-expect-error legacy vendor properties
    window.doNotTrack === "1" ||
    // @ts-expect-error legacy vendor property
    navigator.msDoNotTrack === "1"
  );
}

function initMixpanel() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const token =
    document.querySelector<HTMLMetaElement>(TOKEN_META)?.content ?? "";
  const isDev =
    document.querySelector<HTMLMetaElement>(DEV_META)?.content === "true";
  const replayPercent = clampReplayPercent(
    Number(import.meta.env.PUBLIC_MIXPANEL_REPLAY_PERCENT ?? "10"),
  );

  if (!token || shouldRespectDNT()) {
    return;
  }

  // Official Mixpanel snippet stub — queues calls until the library loads
  /* eslint-disable */
  // @ts-expect-error Mixpanel snippet initialization
  (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
  /* eslint-enable */

  const mixpanel = (window as unknown as { mixpanel: {
    init: (token: string, config: Record<string, unknown>) => void;
    track: (event: string, props?: Record<string, unknown>) => void;
    identify?: (id: string) => void;
    people?: { set?: (props: Record<string, unknown>) => void };
  } }).mixpanel;

  mixpanel.init(token, {
    debug: !!isDev,
    track_pageview: true,
    persistence: "localStorage",
    api_host: "/mp",
    record_sessions_percent: replayPercent,
    record_heatmap_data: replayPercent > 0,
  });

  mixpanel.track("Page View", {
    path: `${location.pathname}${location.search}`,
    title: document.title,
  });
  setupContactTracking(mixpanel);

  window.addEventListener("click", (event: MouseEvent) => {
    const anchor = (
      event.target as Element | null
    )?.closest<HTMLAnchorElement>("a[href]");
    if (!anchor) return;
    try {
      const sameOrigin = anchor.origin === location.origin;
      mixpanel.track("Link Click", { url: anchor.href, sameOrigin });
    } catch {
      // silently ignore tracking errors
    }
  }, { capture: true });
}

function setupContactTracking(mixpanel: {
  track: (event: string, props?: Record<string, unknown>) => void;
  identify?: (id: string) => void;
  people?: { set?: (props: Record<string, unknown>) => void };
}) {
  document.addEventListener(
    "contact:submit",
    (event) => {
      const detail = (event as CustomEvent<Record<string, string>>).detail ?? {};
      const email = detail.email?.trim();
      const name = detail.name?.trim();
      const message = detail.message?.trim();

      if (!email) {
        return;
      }

      try {
        mixpanel.identify?.(email.toLowerCase());
        mixpanel.people?.set?.({
          $email: email,
          $name: name,
          contact_source: "contact_form",
        });
        mixpanel.track("Contact Form Submitted", {
          email,
          name,
          message_length: message?.length ?? 0,
          path: `${location.pathname}${location.hash}`,
        });
      } catch {
        // Ignore tracking failures (e.g., user blocked Mixpanel)
      }
    },
    { passive: true },
  );
}

function clampReplayPercent(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

// Guard against re-execution on SPA navigations (Astro View Transitions)
const win = window as unknown as Record<string, boolean>;
if (!win.__mixpanelInited) {
  win.__mixpanelInited = true;

  // Defer until page is fully loaded and idle
  function scheduleInit() {
    const idle = typeof requestIdleCallback === "function"
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 500);

    idle(() => initMixpanel());
  }

  if (document.readyState === "complete") {
    scheduleInit();
  } else {
    window.addEventListener("load", scheduleInit, { once: true });
  }
}
