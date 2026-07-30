import { Shield, Ruler, FlaskConical } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import { IMG } from "@/asset-map";

export default function SpiralPipes() {
  return (
    <ProductDetail
      title="Large OD Spiral Pipes"
      subtitle="IS 3589"
      tagline="Large diameter pipes for water & utilities"
      description="Spiral welded pipes for water supply, drainage, and industrial utilities. Available in large diameters up to 2000 MM with custom lengths and coatings. Suitable for high-pressure water transmission and structural piling."
      specs={[
        { label: "OD Range", value: "200 - 2000 MM" },
        { label: "Standard", value: "IS 3589" },
        { label: "Coating", value: "PE / FBE" },
        { label: "Length", value: "6 - 12 M" },
      ]}
      highlights={[
        { icon: <Shield size={22} />, title: "Spiral Welded", desc: "Advanced spiral submerged arc welding for consistent seam quality across large diameters." },
        { icon: <Ruler size={22} />, title: "Custom Lengths", desc: "Available in custom lengths up to 12 meters to match project requirements." },
        { icon: <FlaskConical size={22} />, title: "Protective Coating", desc: "PE and FBE coating options available for corrosion protection in buried applications." },
      ]}
      image={IMG.spiral}
      imageFallback="spiral"
      category="Large OD Spiral Welded Pipes"
      breadcrumb={[{ label: "Spiral Pipes", href: "/products/spiral-pipes" }]}
    />
  );
}
