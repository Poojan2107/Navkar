import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { IMG } from "@/asset-map";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <img
            src={IMG.emblem}
            alt="Navkar Tubes & Tools"
            className="w-20 h-20 mx-auto object-contain mb-8 opacity-40"
          />
          <p className="text-[10px] font-mono font-semibold tracking-[0.35em] uppercase mb-5 text-[#2D7A82]">
            [ ERROR 404 ]
          </p>
          <h1 className="font-display text-7xl sm:text-8xl text-[#0A1628] mb-4">
            Page not<br />found.
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
            Return to the homepage.
          </p>
          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#0A1628] text-white font-semibold text-xs tracking-wider rounded-full hover:bg-[#2D7A82] transition-all duration-500 cursor-pointer"
          >
            <ArrowLeft size={16} />
            BACK TO HOME
          </button>
        </div>
      </div>
  );
}
