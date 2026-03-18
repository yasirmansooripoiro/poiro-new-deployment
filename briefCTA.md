import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// --- TIMELINE DATA ---
const TIMELINE = [
  { step: 1, title: 'Send the Brief', desc: 'Share your goal, product, and guardrails.' },
  { step: 2, title: 'We Shape the Direction', desc: 'Hooks, angles, and concepts built for your brand.' },
  { step: 3, title: 'We Create', desc: 'Statics, videos, and PDP assets for every placement.' },
  { step: 4, title: 'You Review', desc: 'Feedback in. We refine fast.' },
  { step: 5, title: 'Ready to Publish', desc: 'Final creatives delivered to spec.' },
  { step: 6, title: 'Then We Scale', desc: 'More variants, markets, and winning creatives.' },
];

// --- ANIMATED FOLDER COMPONENT ---
function AnimatedFolder({ isHovered }) {
  // Significantly larger, premium folder size
  const folderSize = { width: 88, height: 64 };
  const tabWidth = folderSize.width * 0.35;
  const tabHeight = folderSize.height * 0.25;

  const displayImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=300&auto=format&fit=crop"
  ];

  return (
    <div style={{ perspective: '1000px' }} className="pointer-events-none">
      <motion.div
        className="relative"
        style={{
          width: folderSize.width,
          height: folderSize.height,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Folder Back (Classic Golden Manila) */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#D99A29] to-[#B57C1A] shadow-md">
          {/* Folder Tab */}
          <div
            className="absolute left-1 rounded-t-md bg-gradient-to-b from-[#E8A82D] to-[#D99A29]"
            style={{
              top: -tabHeight * 0.8,
              width: tabWidth,
              height: tabHeight,
            }}
          />
        </div>

        {/* Peeking Images (Scaled up for the larger folder) */}
        {displayImages.map((image, index) => {
          const totalImages = displayImages.length;
          const hoverRotation = 15;
          const hoverTranslateY = -65;
          const hoverSpread = 45;
          const teaserImageSize = { width: 52, height: 36 };
          const hoverImageSize = { width: 112, height: 76 };

          const baseRotation = (index - 1) * hoverRotation;
          const hoverY = hoverTranslateY - (totalImages - 1 - index) * 5;
          const hoverX = (index - 1) * hoverSpread;
          const teaseY = -6 - (totalImages - 1 - index) * 2;
          const teaseRotation = (index - 1) * 3;

          return (
            <motion.div
              key={index}
              className="absolute top-1 left-1/2 origin-bottom overflow-hidden rounded-md bg-black shadow-sm ring-1 ring-white/10"
              animate={{
                x: `calc(-50% + ${isHovered ? hoverX : 0}px)`,
                y: isHovered ? hoverY : teaseY,
                rotate: isHovered ? baseRotation : teaseRotation,
                width: isHovered ? hoverImageSize.width : teaserImageSize.width,
                height: isHovered ? hoverImageSize.height : teaserImageSize.height,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: index * 0.03,
              }}
              style={{ zIndex: 10 + index }}
            >
              <img
                src={image}
                alt={`Preview ${index}`}
                className="h-full w-full object-cover opacity-90"
              />
            </motion.div>
          );
        })}

        {/* Folder Front (Lighter Manila, Flattens out on hover) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-md bg-gradient-to-b from-[#F2C154] to-[#E8A82D] shadow-[0_-2px_15px_rgba(0,0,0,0.3)]"
          animate={{
            rotateX: isHovered ? -45 : -20,
            scaleY: isHovered ? 0.85 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          style={{
            transformStyle: "preserve-3d",
            zIndex: 20,
          }}
        >
          {/* Folder line detail */}
          <div className="absolute top-1 right-1 left-1 h-px bg-white/30" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function BriefCTA({ className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // 'idle' | 'uploading' | 'success'
  const [uploadState, setUploadState] = useState('idle');
  const [progress, setProgress] = useState(0);

  // Trigger timeline animations shortly after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Handle the highly-animated, organic fake upload interaction
  const handleUploadClick = () => {
    if (uploadState !== 'idle') return;
    
    setUploadState('uploading');
    setProgress(0);
    setIsHovered(false); // Force fold away

    let currentP = 0;
    let targetP = 0;

    // 1. Simulate organic network chunks (bursts, stalls, and the 99% hang)
    setTimeout(() => { targetP = 20 + Math.random() * 15; }, 100);
    setTimeout(() => { targetP = 45 + Math.random() * 15; }, 600);
    setTimeout(() => { targetP = 60 + Math.random() * 5;  }, 1200); // Network stall
    setTimeout(() => { targetP = 85 + Math.random() * 10; }, 1700);
    setTimeout(() => { targetP = 99; }, 2100); // Dramatic 99% pause
    setTimeout(() => { targetP = 100; }, 2800);

    // 2. Smoothly chase the target value
    const ticker = setInterval(() => {
      if (currentP < targetP) {
        const diff = targetP - currentP;
        currentP += Math.max(0.5, diff * 0.15); 
        if (currentP > 99.9 && targetP === 100) currentP = 100;
        
        setProgress(Math.min(currentP, 100));
      }

      // 3. Complete the upload
      if (currentP >= 100) {
        clearInterval(ticker);
        setTimeout(() => {
          setUploadState('success');
          setTimeout(() => {
            setUploadState('idle');
            setProgress(0);
          }, 3000);
        }, 200); 
      }
    }, 30);
  };

  const lineDrawTime = 2.5; 

  return (
    <section className={`relative w-full bg-[#020202] text-white font-sans py-24 md:py-32 lg:py-48 overflow-hidden ${className}`}>
      
      {/* PRODUCTION IMAGE PLACEHOLDER */}
      <div className="absolute inset-0 z-0 bg-transparent opacity-20 mix-blend-screen"></div>

      {/* Deep ambient glow to ground the center */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#ff8015] rounded-[100%] blur-[150px] opacity-[0.08] pointer-events-none z-0"></div>

      {/* --- CUSTOM ANIMATION STYLES --- */}
      <style>{`
        @keyframes drawTrack { 0% { width: 0; } 100% { width: 100%; } }
        @keyframes drawTrackVertical { 0% { height: 0; } 100% { height: 100%; } }
        
        @keyframes nodeActivate {
          0% { border-color: #333; box-shadow: 0 0 0 rgba(255,95,31,0); transform: scale(1); color: #666; }
          30% { border-color: #ff8015; box-shadow: 0 0 25px rgba(255,95,31,0.8); transform: scale(1.15); color: #fff; }
          100% { border-color: #ff8015; box-shadow: 0 0 15px rgba(255,95,31,0.3); transform: scale(1); color: #fff; }
        }

        @keyframes sproutY { 0% { transform: scaleY(0); opacity: 0; } 100% { transform: scaleY(1); opacity: 1; } }
        @keyframes textFadeUp { 0% { opacity: 0; transform: translateY(15px); filter: blur(4px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes textFadeDown { 0% { opacity: 0; transform: translateY(-15px); filter: blur(4px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }

        @keyframes sweep { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(200%) skewX(-15deg); } }

        /* Custom SVG Checkmark Draw Animation */
        @keyframes drawCheck {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }

        /* Success Pop Animation */
        @keyframes successPop {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        /* Continuous Text Gradient Flow */
        @keyframes textFlow { 
          0% { background-position: 0% center; } 
          100% { background-position: -200% center; } 
        }
        
        .anim-draw-track { animation: drawTrack ${lineDrawTime}s linear forwards; }
        .anim-draw-track-vert { animation: drawTrackVertical ${lineDrawTime}s linear forwards; }
        .anim-node-activate { animation: nodeActivate 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-sprout { animation: sproutY 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-text-up { animation: textFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-text-down { animation: textFadeDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-draw-check { stroke-dasharray: 24; animation: drawCheck 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s; }
        .anim-success-pop { animation: successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
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

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Main Section Heading */}
        <div className="w-full text-center mb-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter">
            Upload your <span className="animate-text-flow">Brief</span>
          </h2>
        </div>

        {/* --- ULTRA PREMIUM DROPZONE WRAPPER --- */}
        <div 
          onClick={handleUploadClick}
          onMouseEnter={() => uploadState === 'idle' && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full max-w-[1000px] mx-auto mb-24 md:mb-32 rounded-[2rem] transition-all duration-700 flex flex-col items-center justify-center py-20 md:py-28 ${
            uploadState === 'idle' 
              ? 'bg-[#050505]/30 hover:bg-[#ff8015]/[0.02] cursor-pointer group shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]' 
              : uploadState === 'uploading'
                ? 'bg-[#ff8015]/[0.02] cursor-wait shadow-[inset_0_0_80px_rgba(255,95,31,0.05)]'
                : 'bg-green-500/[0.02] cursor-default shadow-[inset_0_0_80px_rgba(34,197,94,0.05)]'
          }`}
        >
          {/* Custom Chunky Dashed Border (SVG) */}
          <div className="absolute inset-0 pointer-events-none p-[1px] z-0">
            <svg width="100%" height="100%" className="overflow-visible rounded-[2rem]">
              <rect 
                x="0" y="0" 
                width="100%" height="100%" 
                rx="32" 
                fill="none" 
                strokeWidth="2" 
                strokeDasharray="16 16" 
                className={`transition-colors duration-700 ${
                  uploadState === 'idle' 
                    ? 'stroke-[#444] group-hover:stroke-[#ff8015]/50' 
                    : uploadState === 'uploading'
                      ? 'stroke-[#ff8015]/40'
                      : 'stroke-green-500/40'
                }`}
              />
            </svg>
          </div>

          {/* Animated 3D Folder (Now naturally in the document flow) */}
          <div className={`relative z-20 transition-all duration-500 ease-out flex justify-center w-full ${
              uploadState === 'idle' 
                ? 'opacity-100 translate-y-0 h-[90px] mb-8' 
                : 'opacity-0 translate-y-8 h-0 mb-0'
          }`}>
             <AnimatedFolder isHovered={isHovered} />
          </div>

          {/* Button Wrapper */}
          <div className="relative z-30">
            {/* Dynamic Breathing Aura */}
            <div className={`absolute -inset-2 rounded-full blur-xl transition duration-700 ${
              uploadState === 'idle' 
                ? 'bg-gradient-to-r from-[#ff8015]/0 via-[#ff8015]/40 to-[#ff8015]/0 opacity-40 group-hover:opacity-0' 
                : uploadState === 'success' 
                  ? 'bg-green-500/40 opacity-100' 
                  : 'opacity-0'
            }`}></div>
            
            <div className={`absolute -inset-2 bg-white/0 rounded-full blur-xl transition duration-500 ${uploadState === 'idle' ? 'group-hover:bg-white/30' : 'opacity-0'}`}></div>
            
            {/* Glass Button Base */}
            <button 
              disabled={uploadState !== 'idle'}
              className={`relative min-w-[240px] px-12 py-4 backdrop-blur-md rounded-full font-bold uppercase tracking-[0.2em] text-[13px] overflow-hidden flex items-center justify-center transition-all duration-500 ${
                uploadState === 'idle' 
                  ? 'bg-[#0a0a0a]/80 border border-white/20 text-white group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-[0.96] active:bg-[#e0e0e0] active:shadow-inner'
                  : uploadState === 'uploading'
                    ? 'bg-[#0a0a0a]/80 border border-[#333] text-white cursor-wait shadow-inner'
                    : 'bg-green-500/10 border border-green-500 text-green-400 cursor-default anim-success-pop'
              }`}
            >
              
              {/* Sleek Bottom Loading Bar during Uploading */}
              {uploadState === 'uploading' && (
                <div 
                  className="absolute bottom-0 left-0 h-[2px] bg-[#ff8015] transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  {/* Glowing leading edge */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[10px] bg-[#ff8015] blur-sm"></div>
                </div>
              )}

              {/* Inner top highlight */}
              <div className={`absolute top-0 left-0 right-0 h-[1px] ${uploadState === 'success' ? 'bg-gradient-to-r from-transparent via-green-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-white/50 to-transparent'}`}></div>
              
              {/* Sweeping Light Reflection (Triggers on hover when idle) */}
              {uploadState === 'idle' && (
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-[sweep_0.8s_ease-in-out]"></div>
              )}
              
              <span className="relative z-10 flex items-center justify-center gap-3 w-full">
                
                {/* IDLE STATE */}
                {uploadState === 'idle' && 'Upload Brief'}
                
                {/* UPLOADING STATE (Custom Circular Progress + Counter) */}
                {uploadState === 'uploading' && (
                  <div className="flex items-center gap-4 w-full justify-center">
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 24 24">
                         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" className="text-white/10" />
                         <circle 
                           cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" 
                           className="text-[#ff8015] transition-all duration-75 ease-out" 
                           strokeDasharray="62.83"
                           strokeDashoffset={62.83 - (62.83 * progress) / 100} 
                         />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[#888]">Uploading</span>
                       <span className="font-mono text-[#ff8015] w-[4ch] text-right">{Math.floor(progress)}%</span>
                    </div>
                  </div>
                )}

                {/* SUCCESS STATE */}
              {uploadState === 'success' && (
                <>
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path className="anim-draw-check" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" strokeDashoffset="24"></path>
                  </svg>
                  Uploaded
                </>
              )}
            </span>
          </button>
        </div>
          
        {/* Helper Instruction Text */}
        <div className={`absolute bottom-8 transition-all duration-500 ${uploadState === 'idle' ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
           <span className="text-[#888] text-xs md:text-sm uppercase tracking-[0.2em] font-mono font-bold group-hover:text-[#ff8015]/80 transition-colors duration-500">
             Drag & drop files or click to browse
           </span>
        </div>
      </div>


      {/* --- TIMELINE SECTION --- */}
        <div className="relative w-full max-w-[1200px] mx-auto">
          
          {/* DESKTOP LAYOUT (Horizontal Alternating) */}
          <div className="hidden lg:flex justify-between items-center relative w-full h-[400px]">
            
            {/* Center Track Base */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1a1a1a] -translate-y-1/2"></div>
            
            {/* Center Track Glowing Progress */}
            <div className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 shadow-[0_0_15px_#ff8015]">
               {isVisible && <div className="h-full bg-gradient-to-r from-transparent via-[#ff8015] to-[#ff8015] anim-draw-track"></div>}
            </div>

            {/* Nodes */}
            {TIMELINE.map((item, index) => {
              const isTop = index % 2 !== 0; 
              
              // Calculate EXACTLY when the line will reach this specific node
              const reachTime = lineDrawTime * ((index + 0.5) / TIMELINE.length);
              
              return (
                <div key={item.step} className="relative flex-1 flex flex-col items-center h-full group px-2">
                  
                  {/* TOP HALF TEXT */}
                  <div className="flex-1 w-full flex flex-col justify-end items-center pb-10 relative">
                    {isTop && (
                      <div className="opacity-0 anim-text-down flex flex-col items-center text-center" style={{ animationDelay: `${reachTime + 0.2}s` }}>
                        <h3 className="text-[16px] font-semibold text-white tracking-wide mb-2 transition-colors duration-300 group-hover:text-[#ff8015]">{item.title}</h3>
                        <p className="text-[13px] text-[#aaa] leading-relaxed font-light max-w-[180px]">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* CENTER NODE */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#333] bg-[#050505] flex items-center justify-center z-10 text-[#555] opacity-0 anim-node-activate transition-transform hover:scale-110"
                    style={{ animationDelay: `${reachTime}s` }}
                  >
                     <span className="text-xs font-mono font-bold">{item.step}</span>
                  </div>

                  {/* VERTICAL CONNECTION FILAMENT */}
                  {isVisible && (
                    isTop ? (
                      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-t from-[#ff8015] to-[#ff8015]/10 origin-bottom opacity-0 anim-sprout" style={{ animationDelay: `${reachTime}s` }}></div>
                    ) : (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-[#ff8015] to-[#ff8015]/10 origin-top opacity-0 anim-sprout" style={{ animationDelay: `${reachTime}s` }}></div>
                    )
                  )}

                  {/* BOTTOM HALF TEXT */}
                  <div className="flex-1 w-full flex flex-col justify-start items-center pt-10 relative">
                    {!isTop && (
                      <div className="opacity-0 anim-text-up flex flex-col items-center text-center" style={{ animationDelay: `${reachTime + 0.2}s` }}>
                        <h3 className="text-[16px] font-semibold text-white tracking-wide mb-2 transition-colors duration-300 group-hover:text-[#ff8015]">{item.title}</h3>
                        <p className="text-[13px] text-[#aaa] leading-relaxed font-light max-w-[180px]">{item.desc}</p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* MOBILE/TABLET LAYOUT */}
          <div className="flex lg:hidden flex-col relative w-full max-w-lg mx-auto px-4 mt-12">
            {/* Background Track */}
            <div className="absolute top-2 bottom-0 left-[35px] w-[2px] bg-[#1a1a1a]"></div>
            
            {/* Glowing Progress */}
            <div className="absolute top-2 left-[35px] w-[2px] shadow-[0_0_15px_#ff8015]">
               {isVisible && <div className="w-full bg-gradient-to-b from-transparent via-[#ff8015] to-[#ff8015] anim-draw-track-vert"></div>}
            </div>

            {/* Nodes */}
            {TIMELINE.map((item, index) => {
              const reachTime = lineDrawTime * ((index + 0.5) / TIMELINE.length);

              return (
                <div key={item.step} className="relative flex items-start gap-8 mb-16 group">
                  {/* Node */}
                  <div 
                    className="w-10 h-10 shrink-0 rounded-full bg-[#050505] border border-[#333] flex items-center justify-center z-10 text-[#555] opacity-0 anim-node-activate mt-1"
                    style={{ animationDelay: `${reachTime}s` }}
                  >
                     <span className="text-xs font-mono font-bold">{item.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col pt-1.5 opacity-0 anim-text-up" style={{ animationDelay: `${reachTime + 0.2}s` }}>
                    <h3 className="text-lg font-semibold text-white tracking-wide mb-1 transition-colors duration-300 group-hover:text-[#ff8015]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#aaa] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

// --- PREVIEW WRAPPER ---
// Simulates a full-page environment to verify layout and spacing
export default function App() {
  return (
    <div className="min-h-screen bg-[#020202] selection:bg-[#ff8015] selection:text-black">
      {/* Spacer to simulate previous section */}
      <div className="w-full h-[20vh] bg-neutral-950 border-b border-neutral-900 flex items-center justify-center text-neutral-600 font-mono text-sm">
        [ PREVIOUS SECTION CONTENT ]
      </div>
      
      {/* The component dropped in */}
      <BriefCTA />

      {/* Spacer to simulate next section */}
      <div className="w-full h-[20vh] bg-neutral-950 border-t border-neutral-900 flex items-center justify-center text-neutral-600 font-mono text-sm">
        [ NEXT SECTION CONTENT ]
      </div>
    </div>
  );
}