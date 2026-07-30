import { Shield, Ruler, FlaskConical } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import { IMG } from "@/asset-map";

export default function ErwPipes() {
  return (
    <ProductDetail
      title="MS ERW Black Pipes"
      subtitle="Jindal Authorized"
      tagline="Engineered for demanding applications"
      description="Jindal authorized black steel pipes for fluid conveyance, structural piling, and fire-fighting systems. Available from 15 MM to 500 MM OD with complete mill test certificates. Each pipe is factory hydrostatic tested up to 5 MPa."
      specs={[
        { label: "OD Range", value: "15 - 500 MM" },
        { label: "Standard", value: "IS 1239 / 3589" },
        { label: "Tensile Strength", value: "≥ 415 MPa" },
        { label: "Wall Thickness", value: "1.6 - 8.0 MM" },
      ]}
      highlights={[
        { icon: <Shield size={22} />, title: "Mill Test Certificates", desc: "Every bundle supplied with original MTC from Jindal mills, verifying chemical composition and mechanical properties." },
        { icon: <Ruler size={22} />, title: "Precision Gauge", desc: "OD, wall thickness, and length verified at our yards with calibrated instruments." },
        { icon: <FlaskConical size={22} />, title: "Hydrostatic Tested", desc: "100% factory hydrostatic pressure testing ensures leak-free performance." },
      ]}
      image={IMG.productsErw}
      imageFallback="productsErw"
      category="MS ERW Black Pipes (15mm - 500mm)"
      breadcrumb={[{ label: "MS ERW Black Pipes", href: "/products/erw-pipes" }]}
      relatedProducts={[
        { label: "Hollow Sections", href: "/products/ms-hollow-sections" },
        { label: "Spiral Pipes", href: "/products/spiral-pipes" },
        { label: "All Products", href: "/products" },
        { label: "Yard Updates", href: "/updates" },
      ]}
    />
  );
}
