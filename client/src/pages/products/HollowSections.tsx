import { Shield, Ruler, FlaskConical } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import { IMG } from "@/asset-map";

export default function HollowSections() {
  return (
    <ProductDetail
      title="GI & MS Hollow Sections"
      subtitle="SHS / RHS"
      tagline="Structural tubes built to last"
      description="Square and rectangular structural tubes engineered for industrial sheds, framing, and infrastructure. Precision-formed with consistent wall thickness and full MTC documentation. Available in GI coated and MS black finish."
      specs={[
        { label: "Sections", value: "SHS / RHS" },
        { label: "Sizes", value: "20 - 300 MM" },
        { label: "Surface", value: "GI Coated / MS" },
        { label: "Applications", value: "Structural" },
      ]}
      highlights={[
        { icon: <Shield size={22} />, title: "Jindal Authorized", desc: "Direct channel partnership with Jindal (India) Limited for GI square & rectangular hollow sections." },
        { icon: <Ruler size={22} />, title: "Consistent Wall", desc: "Precision cold-formed with uniform wall thickness across all sections." },
        { icon: <FlaskConical size={22} />, title: "Corrosion Resistant", desc: "GI coated sections offer superior corrosion resistance for long structural life." },
      ]}
      image={IMG.productsHollow}
      imageFallback="productsHollow"
      category="GI & MS Hollow Sections (SHS/RHS)"
      breadcrumb={[{ label: "MS Hollow Sections", href: "/products/ms-hollow-sections" }]}
    />
  );
}
