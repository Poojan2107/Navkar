/**
 * Reliable Industrial Photo & SVG Fallbacks for Navkar Tubes & Tools
 * Ensures that even if /manus-storage storage API is unavailable,
 * all images gracefully fall back to curated high-resolution industrial photography & SVG graphics.
 */

// High quality Unsplash curated industrial assets
export const FALLBACK_IMAGES: Record<string, string> = {
  hero: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
  heroYard: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
  pipesStack: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  facility: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  yard03: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80",
  yard04: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
  yard22: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1000&q=80",
  yardPanoramic: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80",
  erw: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
  hollow: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1000&q=80",
  spiral: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
  productsErw: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  productsHollow: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80",
  export: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80",
  cert: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
};

/**
 * Handle image load error by setting src to fallback URL
 */
export function handleImgError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackKey: keyof typeof FALLBACK_IMAGES = "hero"
) {
  const target = e.currentTarget;
  const fallback = FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES.hero;
  if (target.src !== fallback) {
    target.src = fallback;
  }
}
