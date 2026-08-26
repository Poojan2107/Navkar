/** Canonical NAP for Contact, footer, maps, and schema. Keep these in sync with Google listings. */

export const COMPANY_NAME = "Navkar Tubes & Tools";

export const VATVA_YARD = {
  id: "vatva",
  name: "Navkar Tubes & Tools",
  role: "Jindal & Asian Pipes Dealer",
  street: "Plot No. 1426/B, Trikampura Patiya, Phase-3, GIDC Vatva",
  locality: "Ahmedabad",
  region: "Gujarat",
  postalCode: "382445",
  country: "IN",
  lines: [
    "Plot No. 1426/B, Trikampura Patiya",
    "Phase-3, GIDC Vatva",
    "Ahmedabad, Gujarat 382445",
  ] as const,
  lat: 22.9586,
  lng: 72.6478,
};

export const RAKHIAL_OFFICE = {
  id: "rakhial",
  name: "Navkar Tubes & Tools",
  role: "Ceramic & Special Coated Lancing Manufacturer",
  street: "No. 8, Jaymangal Estate, Near Gujarat Bottling, Rakhial",
  locality: "Ahmedabad",
  region: "Gujarat",
  postalCode: "380023",
  country: "IN",
  lines: [
    "No. 8, Jaymangal Estate",
    "Near Gujarat Bottling, Rakhial",
    "Ahmedabad, Gujarat 380023",
  ] as const,
  lat: 23.0215,
  lng: 72.6254,
};

export type CompanyLocation = typeof VATVA_YARD | typeof RAKHIAL_OFFICE;

export function formatAddress(loc: CompanyLocation, separator = ", ") {
  return [...loc.lines].join(separator);
}

export function mapsSearchUrl(loc: CompanyLocation) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${loc.name}, ${loc.street}, ${loc.locality}, ${loc.region} ${loc.postalCode}`
  )}`;
}

export const PRIMARY_LOCATION = VATVA_YARD;
