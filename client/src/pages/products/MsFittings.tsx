import { Shield, Ruler, FlaskConical } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import { IMG } from "@/asset-map";

export default function MsFittings() {
  return (
    <ProductDetail
      title="MS Fittings & Flanges"
      subtitle="Industrial Pipe Fittings"
      tagline="Complete piping system solutions"
      description="High-quality MS fittings and flanges to complement your piping systems. Elbows, tees, reducers, caps, and flanges available in various sizes and pressure ratings to match Jindal ERW and seamless pipes."
      specs={[
        { label: "Type", value: "Elbows / Tees / Reducers" },
        { label: "Size Range", value: "15 - 500 MM" },
        { label: "Pressure Class", value: "150# / 300# / 600#" },
        { label: "Standards", value: "IS 1239 / ANSI" },
      ]}
      highlights={[
        { icon: <Shield size={22} />, title: "Full Range", desc: "Complete range of MS fittings including elbows, tees, reducers, caps, and flanges in all standard sizes." },
        { icon: <Ruler size={22} />, title: "Pressure Rated", desc: "Available in 150#, 300#, and 600# pressure classes for industrial applications." },
        { icon: <FlaskConical size={22} />, title: "Matched Components", desc: "All fittings compatible with Jindal MS ERW and seamless pipes for complete system integrity." },
      ]}
      image={IMG.msFittings1}
      imageFallback="msFittings1"
      category="MS Fittings & Flanges"
      breadcrumb={[{ label: "MS Fittings", href: "/products/ms-fittings" }]}
    />
  );
}
