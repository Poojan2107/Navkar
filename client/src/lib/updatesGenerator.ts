import { IMG } from "@/asset-map";

export interface DispatchUpdate {
  id: string;
  batchId: string;
  title: string;
  category: "Jindal ERW Pipes" | "GI Hollow Sections" | "Ceramic Coated Lancing" | "Spiral Pipes" | "Asian Pipes";
  location: "Ahmedabad Central Yard" | "Ahmedabad Dispatch Hub" | "Ceramic Lancing Plant" | "Mundra Port Export";
  timestamp: string;
  timeAgo: string;
  tonnage: string;
  sizeRange: string;
  wallThickness: string;
  standard: fontStandard;
  heatNumber: string;
  mtcStatus: string;
  mainImage: string;
  additionalImages: string[];
  summary: string;
  inspectionNotes: string;
  dispatchDetails: string;
}

type fontStandard = "IS 1239 / IS 3589" | "IS 4923 / IS 1161" | "Refractory Coated" | "API 5L / IS 5504";

// Automated stream generator based on assets library
export function generateYardUpdates(): DispatchUpdate[] {
  const categories: DispatchUpdate["category"][] = [
    "Jindal ERW Pipes",
    "GI Hollow Sections",
    "Ceramic Coated Lancing",
    "Spiral Pipes",
    "Asian Pipes",
  ];

  const locations: DispatchUpdate["location"][] = [
    "Ahmedabad Central Yard",
    "Ahmedabad Dispatch Hub",
    "Ceramic Lancing Plant",
    "Mundra Port Export",
  ];

  const standards: fontStandard[] = [
    "IS 1239 / IS 3589",
    "IS 4923 / IS 1161",
    "Refractory Coated",
    "API 5L / IS 5504",
  ];

  const updates: DispatchUpdate[] = IMG.yardUpdates.map((imgSrc, idx) => {
    const category = categories[idx % categories.length];
    const location = locations[idx % locations.length];
    const standard = standards[idx % standards.length];
    const batchNo = 4500 + idx * 7;
    const heatNo = `HT-${20260700 + idx * 13}`;
    
    let timeAgo = "";
    let timestamp = "";
    if (idx === 0) {
      timeAgo = "Just now (Live)";
      timestamp = "Today, 10:45 AM";
    } else if (idx < 3) {
      timeAgo = `${idx * 3} hours ago`;
      timestamp = `Today, 0${9 - idx}:15 AM`;
    } else if (idx < 8) {
      timeAgo = `${idx - 2} days ago`;
      timestamp = `2${8 - idx} July 2026`;
    } else {
      timeAgo = `${Math.floor(idx / 3)} days ago`;
      timestamp = `20 July 2026`;
    }

    const sizeRanges = [
      "15 MM – 150 MM NB",
      "50x50 MM – 250x250 MM SHS",
      "200 MM – 500 MM OD",
      "3/8\" – 1.5\" NB Lancing",
      "400 MM – 1200 MM Spiral",
    ];

    const wallThicknesses = ["2.9 MM – 6.0 MM", "4.0 MM – 8.0 MM", "1.6 MM – 4.5 MM", "6.3 MM – 12.0 MM"];

    const extra1 = IMG.yardUpdates[(idx + 5) % IMG.yardUpdates.length];
    const extra2 = IMG.export[idx % IMG.export.length];

    return {
      id: `upd-${idx + 1}`,
      batchId: `NK-BTCH-${batchNo}`,
      title: `${category} Stock Arrival & Quality Inspection`,
      category,
      location,
      timestamp,
      timeAgo,
      tonnage: `${25 + ((idx * 8) % 60)} Metric Tons`,
      sizeRange: sizeRanges[idx % sizeRanges.length],
      wallThickness: wallThicknesses[idx % wallThicknesses.length],
      standard,
      heatNumber: heatNo,
      mtcStatus: "100% Factory MTC Verified",
      mainImage: imgSrc,
      additionalImages: [imgSrc, extra1, extra2],
      summary: `Fresh consignment of ${category} received at ${location}, Ahmedabad. All bundles strapped with original mill bands and verified for wall thickness and hydrostatic test compliance.`,
      inspectionNotes: `Quality Control verified stenciled heat number ${heatNo}. Hydrostatic pressure test rating certified up to 50 bar. Surface finish clean black / galvanized with protective end caps.`,
      dispatchDetails: `Ready for immediate truck loading and trailer dispatch across Gujarat (Ahmedabad, Vadodara, Surat, Rajkot, Hazira) and pan-India project sites.`,
    };
  });

  return updates;
}

export function getUpdateById(id: string): DispatchUpdate | undefined {
  return generateYardUpdates().find((u) => u.id === id);
}
