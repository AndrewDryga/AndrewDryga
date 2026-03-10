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

async function initMixpanel() {
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

  try {
    const mpMod = await import("mixpanel-browser");
    const mixpanel = mpMod.default;
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

    const onClick = (event: MouseEvent) => {
      const anchor = (
        event.target as Element | null
      )?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      try {
        const sameOrigin = anchor.origin === location.origin;
        mixpanel.track("Link Click", { url: anchor.href, sameOrigin });
      } catch (error) {
        if (isDev) {
          console.warn("Mixpanel link tracking failed", error);
        }
      }
    };

    window.addEventListener("click", onClick, { capture: true });
  } catch (error) {
    if (isDev) {
      console.warn("Mixpanel failed to initialise", error);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      initMixpanel().catch((error) => {
        console.error("Mixpanel initialisation error", error);
      });
    },
    { once: true },
  );
} else {
  initMixpanel().catch((error) => {
    console.error("Mixpanel initialisation error", error);
  });
}
