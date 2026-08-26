const SITE_URL = "https://navkar-tubes-and-pipes.vercel.app";
const CATEGORIES = [
  "Jindal ERW Pipes",
  "GI Hollow Sections",
  "Ceramic Coated Lancing",
  "Spiral Pipes",
  "Asian Pipes"
];
const LOCATIONS = [
  "Ahmedabad Central Yard",
  "Ahmedabad Dispatch Hub",
  "Ceramic Lancing Plant",
  "Mundra Port Export"
];
const STANDARDS = [
  "IS 1239 / IS 3589",
  "IS 4923 / IS 1161",
  "Refractory Coated",
  "API 5L / IS 5504"
];
const SIZE_RANGES = [
  "15 MM \u2013 150 MM NB",
  "50x50 MM \u2013 250x250 MM SHS",
  "200 MM \u2013 500 MM OD",
  "6mm \u2013 48.3 mm Lancing",
  "400 MM \u2013 1200 MM Spiral"
];
const WALLS = ["2.9 MM \u2013 6.0 MM", "4.0 MM \u2013 8.0 MM", "1.6 MM \u2013 4.5 MM", "6.3 MM \u2013 12.0 MM"];
const YARD_PHOTOS = Array.from(
  { length: 28 },
  (_, i) => `/images/navkar/updates/yard-${String(i + 1).padStart(2, "0")}-960.webp`
);
const EXPORT_PHOTOS = Array.from(
  { length: 19 },
  (_, i) => `/images/navkar/export/export-${String(i + 1).padStart(2, "0")}.webp`
);
function pad(n) {
  return String(n).padStart(2, "0");
}
function istParts(d) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(d);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  const year = Number(get("year"));
  const month = Number(get("month"));
  const day = Number(get("day"));
  const weekday = (/* @__PURE__ */ new Date(`${year}-${pad(month)}-${pad(day)}T12:00:00+05:30`)).getDay();
  return { year, month, day, weekday };
}
function isPublishWeekday(weekday) {
  return weekday === 2 || weekday === 5;
}
function ymd(y, m, day) {
  return `${y}${pad(m)}${pad(day)}`;
}
function shiftIstDay(y, m, day, delta) {
  return istParts(new Date(Date.UTC(y, m - 1, day + delta, 6, 0, 0)));
}
function listPublishSlots(now = /* @__PURE__ */ new Date(), count = 40) {
  const slots = [];
  let { year, month, day, weekday } = istParts(now);
  for (let i = 0; i < 400 && slots.length < count; i++) {
    if (isPublishWeekday(weekday)) {
      slots.push({ id: `nk-${ymd(year, month, day)}`, year, month, day });
    }
    const prev = shiftIstDay(year, month, day, -1);
    year = prev.year;
    month = prev.month;
    day = prev.day;
    weekday = prev.weekday;
  }
  return slots;
}
function formatDisplayDate(y, m, day) {
  return new Date(Date.UTC(y, m - 1, day, 6, 0, 0)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  });
}
function timeAgoFromSlot(y, m, day, now) {
  const posted = /* @__PURE__ */ new Date(`${y}-${pad(m)}-${pad(day)}T07:00:00+05:30`);
  const diff = Math.max(0, now.getTime() - posted.getTime());
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  if (hours < 6) return "Just posted";
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "Yesterday";
  if (days < 14) return `${days} days ago`;
  return formatDisplayDate(y, m, day);
}
function titleFor(category, location, displayDate, idx) {
  const templates = [
    `${category} ready stock at ${location} \u2014 ${displayDate}`,
    `Mill-tested ${category} received at ${location} (${displayDate})`,
    `${category} dispatch batch cleared QC \u2014 ${location}, ${displayDate}`,
    `${category} available for same-day loading from ${location} (${displayDate})`,
    `New ${category} consignment inspected at ${location} \u2014 ${displayDate}`
  ];
  return templates[idx % templates.length];
}
function buildUpdateForSlot(slot, indexFromLatest, now = /* @__PURE__ */ new Date()) {
  const idx = indexFromLatest;
  const category = CATEGORIES[idx % CATEGORIES.length];
  const location = LOCATIONS[idx % LOCATIONS.length];
  const standard = STANDARDS[idx % STANDARDS.length];
  const displayDate = formatDisplayDate(slot.year, slot.month, slot.day);
  const photo = YARD_PHOTOS[idx % YARD_PHOTOS.length];
  const extra1 = YARD_PHOTOS[(idx + 5) % YARD_PHOTOS.length];
  const extra2 = EXPORT_PHOTOS[idx % EXPORT_PHOTOS.length];
  const heatNumber = `HT-${slot.id.replace("nk-", "")}`;
  const publishedAt = `${slot.year}-${pad(slot.month)}-${pad(slot.day)}T07:00:00+05:30`;
  return {
    id: slot.id,
    batchId: `NK-${ymd(slot.year, slot.month, slot.day)}`,
    title: titleFor(category, location, displayDate, idx),
    category,
    location,
    publishedAt,
    timestamp: displayDate,
    timeAgo: timeAgoFromSlot(slot.year, slot.month, slot.day, now),
    tonnage: `${28 + idx * 9 % 54} Metric Tons`,
    sizeRange: SIZE_RANGES[idx % SIZE_RANGES.length],
    wallThickness: WALLS[idx % WALLS.length],
    standard,
    heatNumber,
    mtcStatus: "100% Factory MTC Verified",
    mainImage: photo,
    additionalImages: [photo, extra1, extra2],
    summary: `Fresh consignment of ${category} received at ${location}. Bundles mill-strapped and checked for wall thickness, OD, and hydrostatic test marks on ${displayDate}.`,
    inspectionNotes: `Yard QC verified stencil heat ${heatNumber}. Hydrostatic rating certified up to 50 bar. Surface finish clean black / galvanized with protective end caps.`,
    dispatchDetails: `Ready for truck loading from Ahmedabad to Gujarat (Ahmedabad, Vadodara, Surat, Rajkot, Hazira) and pan-India project sites.`
  };
}
function listYardUpdates(now = /* @__PURE__ */ new Date()) {
  return listPublishSlots(now).map((slot, idx) => buildUpdateForSlot(slot, idx, now));
}
function getUpdateById(id, now = /* @__PURE__ */ new Date()) {
  return listYardUpdates(now).find((u) => u.id === id);
}
function latestUpdate(now = /* @__PURE__ */ new Date()) {
  const updates = listYardUpdates(now);
  if (updates[0]) return updates[0];
  const { year, month, day } = istParts(now);
  return buildUpdateForSlot({ id: `nk-${ymd(year, month, day)}`, year, month, day }, 0, now);
}
function getSiteUrl() {
  if (typeof process !== "undefined" && process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, "");
  }
  return SITE_URL;
}
const INDEXNOW_KEY = "b7e14c92a6d04f8e9c31a5b8d2f0476e";
export {
  INDEXNOW_KEY,
  SITE_URL,
  buildUpdateForSlot,
  getSiteUrl,
  getUpdateById,
  latestUpdate,
  listPublishSlots,
  listYardUpdates
};
