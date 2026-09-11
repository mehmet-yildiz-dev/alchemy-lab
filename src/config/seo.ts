export const SITE_NAME = "Digital Alchemy";
export const DEFAULT_DESCRIPTION =
  "A living showcase and reusable React foundation for Mehmet Yıldız's metal-and-gemstone design system.";

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

export function applyRouteSeo(pathname: string) {
  const route = (pathname in ROUTE_SEO ? pathname : "/") as ShowcaseRoute;
  const metadata = ROUTE_SEO[route];
  const configuredOrigin = import.meta.env.SITE_URL?.replace(/\/$/, "");
  const origin = configuredOrigin || window.location.origin;
  const canonicalUrl = new URL(route, `${origin}/`).toString();
  const socialImage = new URL("/seo/og-image.webp", `${origin}/`).toString();

  document.title = metadata.title;
  setNamedMeta("description", metadata.description);
  setNamedMeta("twitter:title", metadata.title);
  setNamedMeta("twitter:description", metadata.description);
  setPropertyMeta("og:title", metadata.title);
  setPropertyMeta("og:description", metadata.description);
  setPropertyMeta("og:url", canonicalUrl);
  setPropertyMeta("og:image", socialImage);
  setNamedMeta("twitter:image", socialImage);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = canonicalUrl;
}
