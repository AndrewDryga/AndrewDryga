function initHeader(header: HTMLElement) {
  const nav = header.querySelector<HTMLElement>('nav[aria-label="Primary"]');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a"));

  const setActive = (href: string | null) => {
    links.forEach((link) => {
      const match = href && link.getAttribute("href") === href;
      if (match) {
        link.classList.add("text-terminal-cyan");
        link.classList.remove("text-muted-foreground");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("text-terminal-cyan");
        link.classList.add("text-muted-foreground");
        link.removeAttribute("aria-current");
      }
    });
  };

  links.forEach((link) => {
    const href = link.getAttribute("href") ?? "";
    if (!href.startsWith("/#")) return;

    link.addEventListener("click", (event) => {
      const [, id] = href.split("#");
      if (!id) return;
      if (window.location.pathname !== "/") {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const offset = (header.offsetHeight || 64) + 8;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  if (window.location.pathname !== "/") {
    return;
  }

  const candidates: Array<{
    el: HTMLElement;
    link: HTMLAnchorElement | undefined;
  }> = [];
  const byHref = (href: string) =>
    links.find((anchor) => anchor.getAttribute("href") === href);

  const home = document.querySelector<HTMLElement>("main section");
  if (home && byHref("/")) candidates.push({ el: home, link: byHref("/") });

  const about = document.getElementById("about");
  if (about && byHref("/#about"))
    candidates.push({ el: about as HTMLElement, link: byHref("/#about") });

  const projects = document.getElementById("projects");
  if (projects) {
    const byProject = byHref("/projects") ?? byHref("/#projects");
    if (byProject) {
      candidates.push({ el: projects as HTMLElement, link: byProject });
    }
  }

  const blog = document.getElementById("blog");
  if (blog && byHref("/blog"))
    candidates.push({ el: blog as HTMLElement, link: byHref("/blog") });

  const contact = document.getElementById("contact");
  if (contact && byHref("/#contact")) {
    candidates.push({ el: contact as HTMLElement, link: byHref("/#contact") });
  }

  if (candidates.length === 0) return;

  const visible = new Map<Element, number>();

  const update = () => {
    let best: { el: HTMLElement; link: HTMLAnchorElement | undefined } | null =
      null;
    let max = 0;
    candidates.forEach((candidate) => {
      const ratio = visible.get(candidate.el) ?? 0;
      if (ratio > max) {
        max = ratio;
        best = candidate;
      }
    });

    if (!best && window.scrollY < 100) {
      best =
        candidates.find(
          (candidate) => candidate.link?.getAttribute("href") === "/",
        ) ?? null;
    }

    if (best?.link) {
      setActive(best.link.getAttribute("href"));
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visible.set(
          entry.target,
          entry.isIntersecting ? entry.intersectionRatio : 0,
        );
      });
      update();
    },
    {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: `-${(header.offsetHeight || 64) + 8}px 0px -40% 0px`,
    },
  );

  candidates.forEach((candidate) => observer.observe(candidate.el));
  update();
}

function ready(fn: () => void) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  } else {
    fn();
  }
}

ready(() => {
  document
    .querySelectorAll<HTMLElement>('header[data-nav-behavior="primary"]')
    .forEach((header) => initHeader(header));
});
