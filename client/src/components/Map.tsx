import { cn } from "@/lib/utils";
import { ExternalLink, MapPin } from "lucide-react";

import { PRIMARY_LOCATION, mapsSearchUrl } from "@/lib/company";

/** Shared map config — used on Home, Contact, and anywhere else we show the yard. */
export const NAVKAR_MAP_QUERY = encodeURIComponent(
  `${PRIMARY_LOCATION.name}, ${PRIMARY_LOCATION.street}, ${PRIMARY_LOCATION.locality}`
);
export const NAVKAR_MAP_LINK = mapsSearchUrl(PRIMARY_LOCATION);
export const NAVKAR_MAP_CENTER = { lat: PRIMARY_LOCATION.lat, lng: PRIMARY_LOCATION.lng };

function buildEmbedUrl(zoom = 16) {
  const { lat, lng } = NAVKAR_MAP_CENTER;
  const label = encodeURIComponent("Navkar Tubes & Tools");
  // Lat/lng + label ensures Google drops a pin on the business, not a generic area search
  return `https://www.google.com/maps?q=${lat},${lng}+(${label})&hl=en&z=${zoom}&output=embed`;
}

type GoogleMapEmbedProps = {
  className?: string;
  zoom?: number;
  title?: string;
  showOpenLink?: boolean;
  showPinHighlight?: boolean;
  linkClassName?: string;
};

/** Unified Google Maps embed — same look on Home and Contact, no API key required. */
export function GoogleMapEmbed({
  className,
  zoom = 16,
  title = "Navkar Tubes & Tools — Ahmedabad",
  showOpenLink = true,
  showPinHighlight = true,
  linkClassName,
}: GoogleMapEmbedProps) {
  return (
    <div className={cn("relative h-full w-full min-h-[300px] bg-gray-100 ring-2 ring-[#2D7A82]/20", className)}>
      <iframe
        title={title}
        src={buildEmbedUrl(zoom)}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      {showPinHighlight && (
        <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2.5 rounded-full border border-[#5EAEB3]/40 bg-[#0A1628]/92 px-4 py-2 shadow-lg backdrop-blur-sm">
          <span className="relative flex h-3.5 w-3.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EAEB3] opacity-70" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#2D7A82] ring-2 ring-white" />
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            Navkar Tubes &amp; Tools
          </span>
        </div>
      )}
      {showOpenLink && (
        <a
          href={NAVKAR_MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0A1628]/90 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#2D7A82]",
            linkClassName
          )}
        >
          <MapPin size={13} className="text-[#5EAEB3]" />
          Open in Google Maps
          <ExternalLink size={12} className="text-white/60" />
        </a>
      )}
    </div>
  );
}

/** @deprecated Use GoogleMapEmbed for consistent maps across the site. */
export function MapView(props: GoogleMapEmbedProps & { initialCenter?: unknown; initialZoom?: number; onMapReady?: unknown; fallbackLabel?: string }) {
  return <GoogleMapEmbed className={props.className} zoom={props.initialZoom ?? props.zoom} title={props.fallbackLabel ?? props.title} />;
}
