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

  if (!token || shouldRespectDNT()) {
    return;
  }

  // Load Mixpanel via CDN snippet (async, ~15KB vs 91KB npm bundle)
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
  script.onload = () => {
    const mixpanel = (window as unknown as Record<string, unknown>).mixpanel as {
      init: (token: string, config: Record<string, unknown>) => void;
      track: (event: string, props?: Record<string, unknown>) => void;
    };

    if (!mixpanel) return;

    mixpanel.init(token, {
      debug: !!isDev,
      track_pageview: true,
      persistence: "localStorage",
      api_host: "/mp",
    });

    mixpanel.track("Page View", {
      path: `${location.pathname}${location.search}`,
      title: document.title,
    });

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
  };

  if (isDev) {
    script.onerror = () => console.warn("Mixpanel CDN failed to load");
  }

  document.head.appendChild(script);
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
