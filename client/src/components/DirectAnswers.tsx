export default function DirectAnswers() {
  const blocks = [
    {
      kicker: "Who we are",
      q: "MS pipes dealer in Ahmedabad",
      a: "Navkar Tubes & Tools is an MS pipes dealer in Ahmedabad and authorized Jindal and Asian pipes supplier in Gujarat since 1995. The GIDC Vatva yard is a stockist for MS ERW, GI pipes and hollow sections, with original mill test certificates and crane loading.",
    },
    {
      kicker: "What we stock",
      q: "ERW, GI, Asian, seamless and lancing pipes",
      a: "Ready stock covers ERW pipes and ERW carbon pipe (IS 1239 / IS 3589), galvanized iron pipes, Asian pipes for construction, MS square pipes, seamless tubes and hydraulic bush pipes, plus ceramic lancing manufactured in Ahmedabad. Same-day quotes from the yard.",
    },
    {
      kicker: "How to buy",
      q: "Call, WhatsApp, or request a quote",
      a: "Call or WhatsApp +91 9601702883 with OD, wall thickness, length and quantity. Visit Plot No. 1426/B, Trikampura Patiya, Phase-3, GIDC Vatva, Ahmedabad 382445, or the Rakhial office at Jaymangal Estate for inspection and dispatch.",
    },
  ];

  return (
    <section className="border-b border-gray-200 bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 sm:px-6 lg:grid-cols-3 lg:px-12">
        {blocks.map((b) => (
          <article key={b.kicker} className="rounded-2xl border border-gray-200 bg-[#FAFAF8] p-5 sm:p-6">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D7A82]">{b.kicker}</p>
            <h2 className="mb-3 font-display text-lg font-semibold text-[#0A1628] sm:text-xl">{b.q}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{b.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
