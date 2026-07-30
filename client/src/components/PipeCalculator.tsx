import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, ShieldCheck, Info } from "lucide-react";

export default function PipeCalculator() {
  const [shape, setShape] = useState<"round" | "square" | "rectangular">("round");
  
  // Round pipe inputs (mm)
  const [od, setOd] = useState<number>(114.3); // 4 inch default
  const [wt, setWt] = useState<number>(4.5);   // wall thickness mm
  const [length, setLength] = useState<number>(6); // meters

  // Square / Rect inputs
  const [sideA, setSideA] = useState<number>(100);
  const [sideB, setSideB] = useState<number>(50);

  // Calculations:
  // Round pipe weight (kg/m) = (OD - WT) * WT * 0.0246615
  // Square/Rect weight (kg/m) = (2 * (A + B) / 3.14159 - WT) * WT * 0.0246615 * (4 / 3.14159) approx or 0.0157 * WT * (A + B - 2*WT)
  
  let weightPerMeter = 0;
  if (shape === "round") {
    if (od > wt && wt > 0) {
      weightPerMeter = (od - wt) * wt * 0.0246615;
    }
  } else if (shape === "square") {
    if (sideA > 2 * wt && wt > 0) {
      weightPerMeter = (sideA * 4 / 3.14159 - wt) * wt * 0.0246615 * 0.785 * 4; 
      // standard formula for RHS/SHS: 0.0157 * wt * (A + A - 2*wt) = 0.0157 * wt * (2A - 2wt)
      weightPerMeter = 0.0157 * wt * (2 * sideA - 2 * wt);
    }
  } else {
    if (sideA > wt && sideB > wt && wt > 0) {
      weightPerMeter = 0.0157 * wt * (sideA + sideB - 2 * wt);
    }
  }

  const totalWeightKg = weightPerMeter * length;
  const totalWeightTons = totalWeightKg / 1000;

  return (
    <div className="bg-[#0A1628] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border border-white/10 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D7A82]/10 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-[#2D7A82]/20 text-[#2D7A82] border border-[#2D7A82]/30">
            <Calculator size={20} />
          </div>
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#2D7A82]">Procurement Tool</p>
            <h3 className="font-display text-2xl lg:text-3xl text-white">Pipe Weight & Tonnage Calculator</h3>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-8 max-w-xl">
          Instantly estimate steel pipe linear weight and total shipment tonnage for MS ERW, GI Hollow Sections, and Special Coated Pipes according to Indian Standards (IS 1239 / IS 3589).
        </p>

        {/* Shape Selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: "round", label: "Circular / Round Pipe" },
            { id: "square", label: "Square Section (SHS)" },
            { id: "rectangular", label: "Rectangular Section (RHS)" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setShape(item.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                shape === item.id
                  ? "bg-[#2D7A82] text-white shadow-lg shadow-[#2D7A82]/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Form Inputs */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shape === "round" && (
              <div>
                <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                  Outer Diameter (OD in mm)
                </label>
                <input
                  type="number"
                  value={od}
                  onChange={(e) => setOd(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2D7A82] text-sm font-mono"
                  placeholder="e.g. 114.3"
                />
              </div>
            )}

            {shape === "square" && (
              <div>
                <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                  Side Width (A in mm)
                </label>
                <input
                  type="number"
                  value={sideA}
                  onChange={(e) => setSideA(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2D7A82] text-sm font-mono"
                  placeholder="e.g. 100"
                />
              </div>
            )}

            {shape === "rectangular" && (
              <>
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                    Side A (Width in mm)
                  </label>
                  <input
                    type="number"
                    value={sideA}
                    onChange={(e) => setSideA(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2D7A82] text-sm font-mono"
                    placeholder="e.g. 100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                    Side B (Height in mm)
                  </label>
                  <input
                    type="number"
                    value={sideB}
                    onChange={(e) => setSideB(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2D7A82] text-sm font-mono"
                    placeholder="e.g. 50"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                Wall Thickness (WT in mm)
              </label>
              <input
                type="number"
                step="0.1"
                value={wt}
                onChange={(e) => setWt(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2D7A82] text-sm font-mono"
                placeholder="e.g. 4.5"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                Total Length (Meters / Pipe Quantity)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2D7A82] text-sm font-mono"
                placeholder="e.g. 6 meters (1 standard length)"
              />
            </div>
          </div>

          {/* Result Output Card */}
          <div className="lg:col-span-5 bg-white/5 p-6 lg:p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-mono text-[#2D7A82] uppercase tracking-[0.25em] mb-4">Calculated Output</p>
              
              <div className="mb-6">
                <p className="text-white/60 text-xs uppercase font-mono mb-1">Unit Weight</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl text-[#2D7A82]">{weightPerMeter.toFixed(3)}</span>
                  <span className="text-white/60 text-sm font-mono">kg / meter</span>
                </div>
              </div>

              <div className="mb-6 pt-4 border-t border-white/10">
                <p className="text-white/60 text-xs uppercase font-mono mb-1">Total Batch Tonnage ({length}m)</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl text-white">{totalWeightTons.toFixed(3)}</span>
                  <span className="text-white/60 text-sm font-mono">Metric Tons ({totalWeightKg.toFixed(1)} kg)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#2D7A82]" /> Standard MTC Tolerance: ±7.5%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
