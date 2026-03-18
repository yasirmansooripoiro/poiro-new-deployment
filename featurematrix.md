import React, { useState } from 'react';

// --- DATA CONFIGURATION ---
const MODULES = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    bigText: 'CONTEXT_SYNC',
    contentTitle: 'Data-Driven Positioning',
    contentDesc: 'Grounded in data, this is where audience signals, market context, and brand positioning come together to define what matters and how the brand should show up.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Premium abstract
  },
  {
    id: 'build',
    number: '02',
    title: 'Build',
    bigText: 'SYS_ARCHITECT',
    contentTitle: 'Narrative Workflows',
    contentDesc: 'Structured through workflows, insights are shaped into clear narrative direction and repeatable content systems—designed for consistency and scale.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop', // Premium structure
  },
  {
    id: 'scale',
    number: '03',
    title: 'Scale',
    bigText: 'AI_PRODUCER',
    contentTitle: 'Continuous Optimization',
    contentDesc: 'Executed by AI producers, content is created, distributed, and continuously optimized to perform across channels and grow over time.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000&auto=format&fit=crop', // Premium expansion
  }
];

export function FeatureMatrix({ className = '' }) {
  const [activeTab, setActiveTab] = useState(MODULES[0].id);

  // Find the currently active module data to display on the right
  const activeData = MODULES.find(m => m.id === activeTab);

  return (
    <div className={`w-full max-w-7xl mx-auto px-6 py-32 text-white font-sans ${className}`}>
      
      {/* Custom CSS for the buttery smooth tab transition */}
      <style>{`
        @keyframes premiumFadeIn {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.98); 
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
            filter: blur(0);
          }
        }
        .animate-premium-in {
          animation: premiumFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes textFlow {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
        .animate-text-flow {
          background: linear-gradient(to right, #ff8015, #9333ea, #ff8015);
          background-size: 200% auto;
          animation: textFlow 4s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* Premium Statement Header */}
      <div className="mb-24">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8">
          An operating system <br className="hidden md:block"/> for <span className="animate-text-flow">storytelling.</span>
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#444] via-[#222] to-transparent"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT COLUMN: Tab Navigation */}
        <div className="flex-1 flex flex-col relative">
          {/* Subtle Vertical tracking line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-[#222] z-0"></div>

          {MODULES.map((module) => {
            const isActive = activeTab === module.id;

            return (
              <div 
                key={module.id}
                onClick={() => setActiveTab(module.id)}
                className="relative z-10 cursor-pointer group py-8"
              >
                <div className="flex items-start gap-8">
                  {/* Status Indicator / Number */}
                  <div className={`mt-1.5 text-sm font-semibold tracking-wider transition-colors duration-500 ${isActive ? 'text-[#ff8015]' : 'text-[#444] group-hover:text-[#888]'}`}>
                    {module.number}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    {/* Tab Title */}
                    <h3 className={`text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#555] group-hover:text-[#aaa]'}`}>
                      {module.title}
                    </h3>
                    
                    {/* Expanding "BIG TEXT" Area */}
                    <div 
                      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        isActive ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                      }`}
                    >
                      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff8015] to-[#888] tracking-tighter uppercase pb-2">
                        {module.bigText}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Content Display */}
        <div className="flex-1 lg:max-w-xl flex flex-col">
          {/* Key forces re-render to re-trigger the animation smoothly */}
          <div key={activeTab} className="animate-premium-in flex flex-col h-full">
            
            {/* Premium Image Container */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative mb-10 shadow-2xl bg-[#050505]">
              <img 
                src={activeData.image} 
                alt={activeData.contentTitle} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
              />
              
              {/* Elegant dark gradient overlay to ensure the image feels grounded */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            </div>

            {/* The Subtext Data */}
            <div className="pl-4 border-l border-[#333]">
              <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {activeData.contentTitle}
              </h4>
              <p className="text-[#999] text-lg leading-relaxed font-light">
                {activeData.contentDesc}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// --- PREVIEW WRAPPER ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#ff8015] selection:text-black">
      <FeatureMatrix />
    </div>
  );
}