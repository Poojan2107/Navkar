import { Shield, Ruler, FlaskConical } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import { IMG } from "@/asset-map";

export default function MsFlanges() {
  return (
    <ProductDetail
      title="MS Flanges"
      subtitle="Pipe Flanges & Blinds"
      tagline="Secure connections for every pipeline"
      description="Heavy-duty MS flanges for secure pipe connections in industrial piping systems. Available in slip-on, weld neck, blind, and socket weld types. Manufactured to IS 1239 and ANSI standards."
      specs={[
        { label: "Type", value: "Slip-on / Weld Neck / Blind" },
        { label: "Size Range", value: "15 - 500 MM" },
        { label: "Pressure Class", value: "150# / 300# / 600#" },
        { label: "Face Type", value: "RF / FF / RTJ" },
      ]}
      highlights={[
        { icon: <Shield size={22} />, title: "Multiple Types", desc: "Slip-on, weld neck, blind, and socket weld flanges available for all piping configurations." },
        { icon: <Ruler size={22} />, title: "Precision Machined", desc: "CNC machined bolt holes and sealing surfaces ensure leak-free connections." },
        { icon: <FlaskConical size={22} />, title: "Industry Standards", desc: "Manufactured to IS 1239 and ANSI B16.5 standards with full material traceability." },
      ]}
      image={IMG.msFlanges}
      imageFallback="msFlanges"
      category="MS Fittings & Flanges"
      breadcrumb={[{ label: "MS Flanges", href: "/products/ms-flanges" }]}
    />
  );
}
