import { RAKHIAL_OFFICE, VATVA_YARD } from "@/lib/company";

export const SITE_URL = "https://navkar-tubes-and-pipes.vercel.app";
export const SITE_NAME = "Navkar Tubes & Tools";
export const PHONE_DISPLAY = "+91 9601702883";
export const PHONE_E164 = "+919601702883";
export const EMAIL = "navkartube@gmail.com";
export const OG_IMAGE = `${SITE_URL}/images/navkar/logo-full.png`;

export const PRIMARY_KEYWORDS = [
  "MS Pipes Dealer in Ahmedabad",
  "ERW Pipes Dealer in Ahmedabad",
  "GI Pipe Dealers in Ahmedabad",
  "Asian Pipes in Ahmedabad",
  "Seamless Pipes Supplier In Ahmedabad",
  "Jindal pipes dealer Ahmedabad",
  "MS ERW pipes Ahmedabad",
  "GI hollow sections Gujarat",
  "ceramic lancing pipes manufacturer",
];

export type PageSeo = {
  title: string;
  description: string;
  keywords: string;
  path: string;
};

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    path: "/",
    title: "MS Pipes Dealer Ahmedabad | ERW, GI, Asian & Seamless Stock",
    description:
      "MS pipes dealer and ERW pipes supplier in Ahmedabad. Navkar Tubes stocks Jindal & Asian MS ERW, GI pipes, GI hollow sections and seamless tubes from GIDC Vatva. Call +91 9601702883.",
    keywords:
      "MS Pipes Dealer in Ahmedabad, MS Pipes Supplier in Gujarat, ERW Pipes Dealer in Ahmedabad, GI Pipe Dealers in Ahmedabad, Asian Pipes in Ahmedabad, Seamless Pipes Supplier In Ahmedabad, Jindal pipes dealer Ahmedabad, Galvanized Iron Pipes",
  },
  "/products": {
    path: "/products",
    title: "MS Pipes, ERW, GI & Asian Pipes Supplier Ahmedabad",
    description:
      "MS pipes supplier in Ahmedabad for ERW carbon pipe, GI pipes, Asian pipes, MS square pipes, seamless hydraulic tubes and ceramic lancing. Ready stock, MTC, yard dispatch.",
    keywords:
      "MS Pipes Supplier in Ahmedabad, ERW Pipes Supplier in Gujarat, GI Pipes Manufacturer in Ahmedabad, Asian Pipes Supplier, MS Square Pipes, Seamless Tubes and Pipes Supplier in Ahmedabad",
  },
  "/products/erw-pipes": {
    path: "/products/erw-pipes",
    title: "ERW Pipes Dealer Ahmedabad | MS ERW & Carbon Pipe Stock",
    description:
      "ERW pipes dealer in Ahmedabad and Gujarat. Jindal MS ERW black pipes 15–500mm OD, ERW carbon pipe, IS 1239 / IS 3589. Stockist with MTC and wholesale yard rates.",
    keywords:
      "ERW Pipes Dealer in Ahmedabad, ERW Pipes Supplier in Gujarat, MS Pipes Dealer, ERW Carbon Pipe, Best ERW Pipes Ahmedabad, ERW Pipe Dealer Near Me, Affordable ERW Pipes Gujarat",
  },
  "/products/ms-hollow-sections": {
    path: "/products/ms-hollow-sections",
    title: "GI Pipes & MS Square Pipes Ahmedabad | Hollow Sections",
    description:
      "GI pipe dealers in Ahmedabad for galvanized iron pipes, GI hollow sections and MS square pipes. Jindal and Asian stock for construction, solar and water lines.",
    keywords:
      "GI Pipe Dealers in Ahmedabad, Galvanized Iron Pipes Supplier, GI Pipes Manufacturer in Gujarat, MS Square Pipes, Affordable GI Pipes Gujarat, Asian Pipe Suppliers for Construction",
  },
  "/products/spiral-pipes": {
    path: "/products/spiral-pipes",
    title: "Spiral Welded Pipes 400–2000mm | SAW Line Pipe Ahmedabad",
    description:
      "Large diameter spiral SAW pipes 400mm to 2000mm OD for water trunklines, effluent and piling. IS 5504 / API 5L project supply from Ahmedabad.",
    keywords: "spiral welded pipes, SAW pipes Ahmedabad, large diameter MS pipes",
  },
  "/products/ms-fittings": {
    path: "/products/ms-fittings",
    title: "MS Butt-Weld Fittings Ahmedabad | Elbows, Tees, Reducers",
    description:
      "MS butt-weld elbows, tees, reducers and caps in Sch 40/80. ANSI B16.9 fittings to match ERW and seamless pipe from Navkar Tubes Ahmedabad.",
    keywords: "MS butt weld fittings, MS elbows tees reducers Ahmedabad",
  },
  "/products/ms-flanges": {
    path: "/products/ms-flanges",
    title: "MS Forged Flanges ANSI B16.5 | Class 150–2500 Ahmedabad",
    description:
      "MS forged slip-on, weld-neck and blind flanges Class 150 to 2500, PN 6–40. Matching pipe stock from Navkar Tubes Ahmedabad.",
    keywords: "MS forged flanges Ahmedabad, ANSI B16.5 flanges, Class 150 flanges",
  },
  "/updates": {
    path: "/updates",
    title: "Yard Stock & Dispatch Updates Ahmedabad | Navkar Tubes",
    description:
      "Twice-weekly Ahmedabad yard updates: Jindal ERW arrivals, GI hollow section stock, ceramic lancing batches, tonnage and dispatch status.",
    keywords: "pipe stock Ahmedabad, Jindal pipe dispatch, steel yard updates Gujarat",
  },
  "/gallery": {
    path: "/gallery",
    title: "Pipe Yard & Export Photos Ahmedabad | Navkar Tubes",
    description:
      "Photos of Navkar Tubes Ahmedabad stock yards, crane loading, Jindal pipe bundles and export container stuffing.",
    keywords: "pipe yard Ahmedabad photos, steel pipe loading Gujarat",
  },
  "/contact": {
    path: "/contact",
    title: "MS Pipes Supplier Near Me | Contact Navkar Ahmedabad",
    description:
      "MS pipes supplier near you in Ahmedabad. Call +91 9601702883 for ERW, GI, Asian and seamless pipe quotes from GIDC Vatva yard and Rakhial office.",
    keywords:
      "MS Pipes Supplier Near Me, ERW Pipe Dealer Near Me, Best GI Pipes Supplier Near Me, Asian Pipes Near me, MS Pipe Distributor Near Me",
  },
  "/about": {
    path: "/about",
    title: "About Navkar Tubes | Jindal Pipe Dealer Since 1995",
    description:
      "Navkar Tubes & Tools, Ahmedabad: authorized Jindal channel partner since 1995 and in-house ceramic lancing pipe manufacturer. Two yards, pan-India dispatch.",
    keywords: "Navkar Tubes Ahmedabad, Jindal authorized dealer history, steel supplier Gujarat",
  },
  "/jindal": {
    path: "/jindal",
    title: "Jindal Authorized Channel Partner Ahmedabad | Navkar Tubes",
    description:
      "Official Jindal pipes channel partner in Ahmedabad for MS ERW and GI hollow sections. Mill-origin stock with MTC. View authorization and size range.",
    keywords: "Jindal authorized dealer Ahmedabad, Jindal pipes Gujarat, Jindal ERW stockist",
  },
  "/catalogue": {
    path: "/catalogue",
    title: "Pipe Weight Charts & Catalogue PDF | Navkar Tubes",
    description:
      "Download Navkar Tubes technical catalogue: ERW dimensions, GI hollow section weights, ceramic lancing sizes and flange tables for Ahmedabad supply.",
    keywords: "ERW pipe weight chart, GI hollow section catalogue, pipe specification PDF",
  },
};

export function seoForPath(path: string): PageSeo {
  if (PAGE_SEO[path]) return PAGE_SEO[path];
  if (path.startsWith("/updates/")) {
    return {
      path,
      title: "Yard Batch Dispatch Report | Navkar Tubes Ahmedabad",
      description:
        "Ahmedabad yard batch report from Navkar Tubes: Jindal ERW, GI hollow sections or ceramic lancing stock with heat number, tonnage and MTC status.",
      keywords: "pipe batch Ahmedabad, mill test certificate, yard dispatch report",
    };
  }
  return PAGE_SEO["/"];
}

export function canonicalUrl(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    additionalType: "https://schema.org/WholesaleStore",
    name: SITE_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    telephone: PHONE_E164,
    email: EMAIL,
    foundingDate: "1995",
    priceRange: "₹₹",
    areaServed: ["Ahmedabad", "Gujarat", "India"],
    knowsAbout: [
      ...PRIMARY_KEYWORDS,
      "MS Pipes",
      "ERW Pipes",
      "Galvanized Iron Pipes",
      "Asian Pipes",
      "Seamless Pipes",
      "MS Square Pipes",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: VATVA_YARD.street,
      addressLocality: VATVA_YARD.locality,
      addressRegion: VATVA_YARD.region,
      postalCode: VATVA_YARD.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: VATVA_YARD.lat,
      longitude: VATVA_YARD.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${VATVA_YARD.street}, Ahmedabad`)}`,
    sameAs: [
      "https://www.indiamart.com/navkartubesandtools/",
      "https://www.linkedin.com/company/navkar-tubes-&-tools/",
    ],
    department: [
      {
        "@type": "LocalBusiness",
        name: "Navkar Tubes — Rakhial Office",
        address: {
          "@type": "PostalAddress",
          streetAddress: RAKHIAL_OFFICE.street,
          addressLocality: RAKHIAL_OFFICE.locality,
          addressRegion: RAKHIAL_OFFICE.region,
          postalCode: RAKHIAL_OFFICE.postalCode,
          addressCountry: "IN",
        },
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbJsonLd(path: string) {
  const crumbs: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
  if (path !== "/") {
    const seo = seoForPath(path);
    const parts = path.split("/").filter(Boolean);
    if (parts[0] === "products" && parts.length > 1) {
      crumbs.push({ name: "Products", path: "/products" });
    }
    if (parts[0] === "updates" && parts.length > 1) {
      crumbs.push({ name: "Updates", path: "/updates" });
    }
    crumbs.push({ name: seo.title.split("|")[0].trim(), path });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}

export function graphJsonLd(path: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [localBusinessJsonLd(), websiteJsonLd(), breadcrumbJsonLd(path)],
  };
}
