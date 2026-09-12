export const SITE_URL = "https://mehmetyildiz.dev";
export const SHOWCASE_URL = "https://mehmet-yildiz-dev.github.io/alchemy-lab";
export const SITE_NAME = "Digital Alchemy";
export const DEFAULT_DESCRIPTION =
  "A personal reference and React showcase for Mehmet Yıldız's Digital Alchemy theme and frontend defaults.";

export const ROUTE_SEO = {
  "/": {
    title: "Digital Alchemy — Theme and UI showcase",
    description: DEFAULT_DESCRIPTION,
  },
  "/foundations": {
    title: "Foundations — Digital Alchemy",
    description:
      "Explore the Alchemy palette, rating order, typography, radius, motion, and responsive foundations.",
  },
  "/ui": {
    title: "UI primitives — Digital Alchemy",
    description: "Inspect reusable React UI primitives across semantic states and variants.",
  },
  "/patterns": {
    title: "Product patterns — Digital Alchemy",
    description:
      "Preview composed application patterns built from reusable Digital Alchemy UI primitives.",
  },
} as const;

export type ShowcaseRoute = keyof typeof ROUTE_SEO;

function setNamedMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.append(element);
  }
  element.content = content;
}

function setPropertyMeta(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.append(element);
  }
  element.content = content;
}

function setLinkMeta(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.append(element);
  }
  element.href = href;
}

function routeFromPathname(pathname: string): string {
  const pathnameWithoutTrailingSlash = pathname.replace(/\/+$/, "") || "/";
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");

  if (
    basePath &&
    basePath !== "/" &&
    (pathnameWithoutTrailingSlash === basePath ||
      pathnameWithoutTrailingSlash.startsWith(`${basePath}/`))
  ) {
    return pathnameWithoutTrailingSlash.slice(basePath.length) || "/";
  }

  return pathnameWithoutTrailingSlash;
}

function getShowcaseUrl() {
  return (import.meta.env.VITE_SHOWCASE_URL || SHOWCASE_URL).replace(/\/+$/, "");
}

export function applyRouteSeo(pathname: string) {
  const routePath = routeFromPathname(pathname);
  const route = (routePath in ROUTE_SEO ? routePath : "/") as ShowcaseRoute;
  const metadata = ROUTE_SEO[route];
  const showcaseUrl = getShowcaseUrl();
  const canonicalUrl = route === "/" ? `${showcaseUrl}/` : `${showcaseUrl}${route}`;
  const socialImage = `${showcaseUrl}/seo/og-image.webp`;

  document.title = metadata.title;
  setNamedMeta("description", metadata.description);
  setNamedMeta("twitter:title", metadata.title);
  setNamedMeta("twitter:description", metadata.description);
  setPropertyMeta("og:title", metadata.title);
  setPropertyMeta("og:description", metadata.description);
  setPropertyMeta("og:url", canonicalUrl);
  setPropertyMeta("og:image", socialImage);
  setNamedMeta("twitter:image", socialImage);
  setLinkMeta("canonical", canonicalUrl);
  setLinkMeta("author", `${SITE_URL}/`);
}
