"use client";

import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_DATA: FAQItem[] = [
  {
    question: "Do we need to learn a new tool or workflow?",
    answer:
      "No. You brief us. We deliver. Your team reviews and approves. Zero ramp-up, zero prompt engineering, zero AI learning curve ever.",
  },
  {
    question: "Will it actually look on brand or like generic AI?",
    answer:
      "On-brand. Always. Brandify encodes your visual identity into the production system. Brand Cosmos ensures every creative direction is strategically grounded and never pulled from a template.",
  },
  {
    question: "How accurate is it for ecommerce and PDPs?",
    answer:
      "Highly. Omni-Focus is built specifically for product integrity: logos, textures, colors, and fine details. If it ships in your name, it has to be right. We treat that seriously.",
  },
  {
    question: "What format or placements do you cover?",
    answer:
      "All of them. Statics, Reels, TikTok, Shorts, PDPs, display, performance variants, resizes, and localization across any market delivered to your exact platform specs.",
  },
];

export default function FAQSection({ className = '' }: { className?: string }) {
  // Initialize to 0 so the first item is open, or -1 for all closed
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section
      id="faq"
      className={`relative w-full bg-[#020202] text-white overflow-hidden flex justify-center ${className}`}
      style={{ 
        paddingTop: "clamp(20px, 4vw, 60px)", 
        paddingBottom: "clamp(120px, 12vw, 180px)" 
      }} 
    >
      {/* --- CUSTOM ANIMATION STYLES --- */}
      <style>{`
        @keyframes textFlow {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
        .animate-gradient-text {
          background: linear-gradient(to right, #FF5F1F, #FFB11A, #FF5F1F);
          background-size: 200% auto;
          animation: textFlow 4s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#FF5F1F] rounded-full blur-[200px] opacity-[0.04] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* --- HEADER --- */}
        <div className="w-full text-center flex flex-col items-center">
          <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#666] flex items-center gap-3" style={{ marginBottom: "24px" }}>
            <span className="w-2 h-2 inline-block bg-[#FF5F1F]" />
            System Queries
          </p>

          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95]" style={{ margin: 0 }}>
            Frequently Asked
            <br />
            <span className="animate-gradient-text inline-block" style={{ paddingBottom: "12px" }}>Questions.</span>
          </h3>
        </div>

        {/* --- ACCORDION LIST --- */}
        <div 
          className="w-full max-w-4xl mx-auto border-t border-b border-[#222]"
          style={{ marginTop: "clamp(48px, 6vw, 80px)" }} // Premium, tightened gap
        >
          {FAQ_DATA.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className="group relative border-b border-[#222] last:border-b-0 cursor-pointer"
              >
                {/* Fluid Vertical Accent Line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "bg-[#FF5F1F] scale-y-100"
                      : "bg-[#333] scale-y-0 group-hover:scale-y-50"
                  }`}
                  style={{ transformOrigin: "center" }}
                />

                <div
                  className="transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    // Cleaned up dynamic padding for a sleek, proportional feel
                    paddingTop: isActive ? "32px" : "24px",
                    paddingBottom: isActive ? "32px" : "24px",
                    paddingLeft: "clamp(24px, 4vw, 40px)", 
                    paddingRight: "24px"
                  }}
                >
                  {/* Question Header */}
                  <div className="flex justify-between items-center gap-6 md:gap-8">
                    <h4
                      className="text-xl md:text-2xl lg:text-[1.75rem] font-black tracking-tight leading-[1.2] transition-colors duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ 
                        margin: 0,
                        color: isActive ? "#ffffff" : "#666666" 
                      }}
                    >
                      {faq.question}
                    </h4>

                    {/* Fluid Plus/Minus Icon */}
                    <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                      <div
                        className={`absolute w-4 h-[2px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "bg-[#FF5F1F] rotate-180" : "bg-[#555] group-hover:bg-[#888]"
                        }`}
                      />
                      <div
                        className={`absolute w-[2px] h-4 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "bg-[#FF5F1F] rotate-90 scale-0"
                            : "bg-[#555] group-hover:bg-[#888] rotate-0 scale-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Liquid Answer Reveal (CSS Grid Animation wrapped in styles) */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      opacity: isActive ? 1 : 0,
                      transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p 
                        className="text-base md:text-lg font-medium max-w-2xl"
                        style={{ 
                          color: "#888888",
                          lineHeight: "1.6",
                          margin: 0,
                          paddingTop: "16px", // Tightened inner gap
                          paddingBottom: "4px"
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}