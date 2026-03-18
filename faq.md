import React, { useState } from 'react';

const FAQ_DATA = [
  {
    question: "Do we need to learn a new tool or workflow?",
    answer: "No. You brief us. We deliver. Your team reviews and approves. Zero ramp-up, zero prompt engineering, zero AI learning curve — ever."
  },
  {
    question: "Will it actually look on brand or like generic AI?",
    answer: "On-brand. Always. Brandify™ encodes your visual identity into the production system. Brand Cosmos™ ensures every creative direction is strategically grounded — not pulled from a template."
  },
  {
    question: "How accurate is it for ecommerce and PDP's?",
    answer: "Highly. Omni-focus™ is built specifically for product integrity — logos, textures, colors, fine details. If it ships in your name, it has to be right. We treat that seriously."
  },
  {
    question: "What format or placements do you cover?",
    answer: "All of them. Statics, Reels, TikTok, Shorts, PDPs, display, performance variants, resizes, and localization across any market — delivered to your exact platform specs."
  }
];

export function FAQSection({ className = '' }) {
  // We initialize to 0 so the first FAQ is open by default.
  // Set to -1 if you want them all closed initially.
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={`relative w-full bg-[#020202] text-white font-sans py-24 md:py-32 lg:py-40 overflow-hidden ${className}`}>
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#FF5F1F] rounded-full blur-[200px] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* --- LEFT COLUMN: Sticky Header --- */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
          <h2 className="text-[#666] font-mono text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
             <span className="w-2 h-2 inline-block bg-[#FF5F1F]"></span>
             System Queries
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
            Frequently <br className="hidden lg:block"/> Asked <br className="hidden lg:block"/> Questions.
          </h3>
        </div>

        {/* --- RIGHT COLUMN: Fluid Accordion --- */}
        {/* onMouseLeave resets or holds state. 
          Here, we intentionally do NOT reset to -1 so the last read item stays open, 
          which prevents the page from abruptly jumping up when the mouse leaves. 
        */}
        <div className="w-full lg:w-2/3 flex flex-col">
          {FAQ_DATA.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div 
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className="group relative border-b border-[#222] cursor-pointer"
              >
                {/* Vertical Accent Line: 
                  Glows orange and scales to full height when active to give an industrial "locked in" feel. 
                */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'bg-[#FF5F1F] scale-y-100' : 'bg-[#333] scale-y-0 group-hover:scale-y-50'
                  }`}
                  style={{ transformOrigin: 'top' }}
                ></div>

                <div className="pl-6 md:pl-10 pr-4 py-8 md:py-10">
                  {/* Question Header */}
                  <div className="flex justify-between items-center gap-8">
                    <h4 
                      className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500 ${
                        isActive ? 'text-white' : 'text-[#777] group-hover:text-[#aaa]'
                      }`}
                    >
                      {faq.question}
                    </h4>
                    
                    {/* Fluid Plus/Minus Icon */}
                    <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                      <div 
                        className={`absolute w-4 h-[2px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? 'bg-[#FF5F1F] rotate-180' : 'bg-[#666]'
                        }`}
                      ></div>
                      <div 
                        className={`absolute w-[2px] h-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? 'bg-[#FF5F1F] rotate-90 scale-0' : 'bg-[#666] rotate-0 scale-100'
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Liquid Answer Reveal:
                    Using CSS Grid `grid-template-rows` from 0fr to 1fr is the modern, performant way 
                    to animate height seamlessly without Javascript measurements.
                  */}
                  <div 
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base md:text-lg text-[#999] leading-relaxed font-light max-w-2xl pb-2">
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

// --- PREVIEW WRAPPER ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#020202] selection:bg-[#FF5F1F] selection:text-black">
      {/* Spacer to simulate scrolling context */}
      <div className="w-full h-[20vh] bg-neutral-950 border-b border-neutral-900 flex items-center justify-center text-neutral-600 font-mono text-sm">
        [ PREVIOUS SECTION ]
      </div>
      
      {/* Component */}
      <FAQSection />

      {/* Spacer to simulate scrolling context */}
      <div className="w-full h-[20vh] bg-neutral-950 border-t border-neutral-900 flex items-center justify-center text-neutral-600 font-mono text-sm">
        [ NEXT SECTION ]
      </div>
    </div>
  );
}