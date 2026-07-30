import { useEffect } from "react";

const SITE = "Navkar Tubes & Tools";

export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title.includes(SITE) ? title : `${title} | ${SITE}`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}

export function resolvePageTitle(path: string): string {
  const routes: Record<string, string> = {
    "/": "Jindal Pipes Dealer Ahmedabad — MS ERW, GI & Ceramic Lancing",
    "/products": "Industrial Pipe Products & Specifications",
    "/products/erw-pipes": "MS ERW Black Pipes — 15mm to 500mm OD",
    "/products/ms-hollow-sections": "GI & MS Hollow Sections — SHS / RHS",
    "/products/spiral-pipes": "Large Diameter Spiral Welded Pipes",
    "/products/ms-fittings": "MS Butt-Weld Fittings & Accessories",
    "/products/ms-flanges": "MS Forged Flanges — ANSI B16.5",
    "/updates": "Yard Dispatch & Stock Updates",
    "/gallery": "Yard & Export Photo Gallery",
    "/contact": "Contact Sales Desk — Ahmedabad",
    "/about": "About Us — 30+ Years in Steel Supply",
    "/jindal": "Jindal Authorized Channel Partner",
    "/catalogue": "Technical Brochure & Catalogue",
    "/404": "Page Not Found",
  };

  if (routes[path]) return routes[path];

  if (path.startsWith("/updates/")) {
    return "Batch Dispatch Report";
  }

  return "Jindal Pipes Dealer Ahmedabad";
}
