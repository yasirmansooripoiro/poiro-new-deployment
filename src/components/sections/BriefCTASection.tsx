"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

type TimelineStep = {
  step: number;
  title: string;
  desc: string;
  tickHeight: number;
  textMargin: number;
};

type UploadState = "idle" | "uploading" | "success";

const TIMELINE: TimelineStep[] = [
  { step: 1, title: "Send the Brief", desc: "Share your goal, product, and guardrails.", tickHeight: 28, textMargin: 64 },
  {
    step: 2,
    title: "We Shape the Direction",
    desc: "Hooks, angles, and concepts built for your brand.",
    tickHeight: 52,
    textMargin: 88,
  },
  {
    step: 3,
    title: "We Create",
    desc: "Statics, videos, and PDP assets for every placement.",
    tickHeight: 36,
    textMargin: 72,
  },
  { step: 4, title: "You Review", desc: "Feedback in. We refine fast.", tickHeight: 28, textMargin: 64 },
  {
    step: 5,
    title: "Ready to Publish",
    desc: "Final creatives delivered to spec.",
    tickHeight: 52,
    textMargin: 88,
  },
  {
    step: 6,
    title: "Then We Scale",
    desc: "More variants, markets, and winning creatives.",
    tickHeight: 36,
    textMargin: 72,
  },
];

function AnimatedFolder({ isHovered }: { isHovered: boolean }) {
  const folderSize = { width: 88, height: 64 };
  const tabWidth = folderSize.width * 0.35;
  const tabHeight = folderSize.height * 0.25;

  const displayImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=300&auto=format&fit=crop",
  ];

  return (
    <div style={{ perspective: "1000px" }} className="pointer-events-none">
      <motion.div
        className="relative"
        style={{
          width: folderSize.width,
          height: folderSize.height,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#D99A29] to-[#B57C1A] shadow-md">
          <div
            className="absolute left-1 rounded-t-md bg-gradient-to-b from-[#E8A82D] to-[#D99A29]"
            style={{
              top: -tabHeight * 0.8,
              width: tabWidth,
              height: tabHeight,
            }}
          />
        </div>

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
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover opacity-90"
              />
            </motion.div>
          );
        })}

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
          <div className="absolute top-1 right-1 left-1 h-px bg-white/30" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function BriefCTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);

  const timeoutRefs = useRef<number[]>([]);
  const tickerRef = useRef<number | null>(null);

  useEffect(() => {
    const mountTimer = window.setTimeout(() => setIsVisible(true), 200);

    return () => {
      window.clearTimeout(mountTimer);
      timeoutRefs.current.forEach((id) => window.clearTimeout(id));
      if (tickerRef.current !== null) {
        window.clearInterval(tickerRef.current);
      }
    };
  }, []);

  const handleUploadClick = () => {
    if (uploadState !== "idle") return;

    setUploadState("uploading");
    setProgress(0);
    setIsHovered(false);

    let currentProgress = 0;
    let targetProgress = 0;

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timeoutRefs.current.push(id);
    };

    schedule(() => {
      targetProgress = 20 + Math.random() * 15;
    }, 100);
    schedule(() => {
      targetProgress = 45 + Math.random() * 15;
    }, 600);
    schedule(() => {
      targetProgress = 60 + Math.random() * 5;
    }, 1200);
    schedule(() => {
      targetProgress = 85 + Math.random() * 10;
    }, 1700);
    schedule(() => {
      targetProgress = 99;
    }, 2100);
    schedule(() => {
      targetProgress = 100;
    }, 2800);

    tickerRef.current = window.setInterval(() => {
      if (currentProgress < targetProgress) {
        const diff = targetProgress - currentProgress;
        currentProgress += Math.max(0.5, diff * 0.15);
        if (currentProgress > 99.9 && targetProgress === 100) currentProgress = 100;

        setProgress(Math.min(currentProgress, 100));
      }

      if (currentProgress >= 100) {
        if (tickerRef.current !== null) {
          window.clearInterval(tickerRef.current);
          tickerRef.current = null;
        }

        schedule(() => {
          setUploadState("success");
          schedule(() => {
            setUploadState("idle");
            setProgress(0);
          }, 3000);
        }, 200);
      }
    }, 30);
  };

  const lineDrawTime = 2.5;

  return (
    <section
      id="brief-cta"
      className="relative w-full bg-[#020202] text-white overflow-hidden"
      style={{
        padding: "clamp(110px, 13vw, 190px) var(--space-3)",
        minHeight: "clamp(980px, 105vw, 1420px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="absolute inset-0 z-0 bg-transparent opacity-20 mix-blend-screen" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#ff8015] rounded-[100%] blur-[150px] opacity-[0.08] pointer-events-none z-0" />

      <style>
        {`
          @keyframes drawTrack { 0% { width: 0; } 100% { width: 100%; } }
          @keyframes drawTrackVertical { 0% { height: 0; } 100% { height: 100%; } }

          /* Flowing gradient animations */
          @keyframes flowGradientHorizontal {
            0% { background-position: 0% center; }
            100% { background-position: -200% center; }
          }
          @keyframes flowGradientVertical {
            0% { background-position: center 0%; }
            100% { background-position: center -200%; }
          }

          @keyframes nodeActivate {
            0% { border-color: #333; box-shadow: 0 0 0 rgba(255,128,21,0); transform: scale(1); color: #666; opacity: 0; }
            30% { border-color: #ff8015; box-shadow: 0 0 30px rgba(255,128,21,0.6); transform: scale(1.1); color: #fff; opacity: 1; }
            100% { border-color: #ff8015; box-shadow: 0 0 20px rgba(255,128,21,0.3); transform: scale(1); color: #fff; opacity: 1; }
          }

          @keyframes sproutY { 0% { transform: scaleY(0); opacity: 0; } 100% { transform: scaleY(1); opacity: 1; } }
          @keyframes textFadeUp { 0% { opacity: 0; transform: translateY(15px); filter: blur(4px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
          @keyframes textFadeDown { 0% { opacity: 0; transform: translateY(-15px); filter: blur(4px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
          @keyframes sweep { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(200%) skewX(-15deg); } }

          @keyframes drawCheck {
            0% { stroke-dashoffset: 24; }
            100% { stroke-dashoffset: 0; }
          }

          @keyframes successPop {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
            50% { transform: scale(1.02); box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          }

          @keyframes textFlow {
            0% { background-position: 0% center; }
            100% { background-position: -200% center; }
          }

          /* Thick timeline track classes */
          .brief-anim-draw-track {
            background: linear-gradient(to right, #ff8015, #f8ff23, #ff8015);
            background-size: 200% auto;
            animation: drawTrack ${lineDrawTime}s linear forwards, flowGradientHorizontal 3s linear infinite;
          }
          .brief-anim-draw-track-vert {
            background: linear-gradient(to bottom, #ff8015, #f8ff23, #ff8015);
            background-size: 100% 200%;
            animation: drawTrackVertical ${lineDrawTime}s linear forwards, flowGradientVertical 3s linear infinite;
          }
          
          .brief-anim-node-activate { animation: nodeActivate 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .brief-anim-sprout { animation: sproutY 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .brief-anim-text-up { animation: textFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .brief-anim-text-down { animation: textFadeDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .brief-anim-draw-check { stroke-dasharray: 24; animation: drawCheck 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s; }
          .brief-anim-success-pop { animation: successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

          .brief-animate-text-flow {
            background: linear-gradient(to right, #ff8015, #f8ff23, #ff8015);
            background-size: 200% auto;
            animation: textFlow 4s linear infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }
        `}
      </style>

      <div
        className="relative z-10 w-full flex flex-col items-center"
        style={{ maxWidth: 1400, margin: "0 auto" }}
      >
        <div
          className="w-full text-center"
          style={{ maxWidth: 1120, margin: "0 auto", marginBottom: "clamp(28px, 4vw, 56px)" }}
        >
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter ${montserrat.className}`}>
            Upload your <span className="brief-animate-text-flow">Brief</span>
          </h2>
        </div>

        <div
          onClick={handleUploadClick}
          onMouseEnter={() => uploadState === "idle" && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full max-w-[1120px] mx-auto mb-24 md:mb-32 rounded-[2rem] transition-all duration-700 flex flex-col items-center justify-center px-6 md:px-8 py-16 md:py-20 ${
            uploadState === "idle"
              ? "bg-[#050505]/30 hover:bg-[#ff8015]/[0.02] cursor-pointer group shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
              : uploadState === "uploading"
              ? "bg-[#ff8015]/[0.02] cursor-wait shadow-[inset_0_0_80px_rgba(255,95,31,0.05)]"
              : "bg-green-500/[0.02] cursor-default shadow-[inset_0_0_80px_rgba(34,197,94,0.05)]"
          }`}
          style={{ minHeight: "clamp(250px, 26vw, 360px)" }}
        >
          <div className="absolute inset-0 pointer-events-none p-[1px] z-0">
            <svg width="100%" height="100%" className="overflow-visible rounded-[2rem]">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="32"
                fill="none"
                strokeWidth="2"
                strokeDasharray="16 16"
                className={`transition-colors duration-700 ${
                  uploadState === "idle"
                    ? "stroke-[#444] group-hover:stroke-[#ff8015]/50"
                    : uploadState === "uploading"
                    ? "stroke-[#ff8015]/40"
                    : "stroke-green-500/40"
                }`}
              />
            </svg>
          </div>

          <div
            className={`relative z-20 transition-all duration-500 ease-out flex justify-center w-full ${
              uploadState === "idle"
                ? "opacity-100 translate-y-0 h-[90px] mb-8"
                : "opacity-0 translate-y-8 h-0 mb-0"
            }`}
          >
            <AnimatedFolder isHovered={isHovered} />
          </div>

          <div className="relative z-30">
            <div
              className={`absolute -inset-2 rounded-full blur-xl transition duration-700 ${
                uploadState === "idle"
                  ? "bg-gradient-to-r from-[#ff8015]/0 via-[#ff8015]/40 to-[#ff8015]/0 opacity-40 group-hover:opacity-0"
                  : uploadState === "success"
                  ? "bg-green-500/40 opacity-100"
                  : "opacity-0"
              }`}
            />

            <div
              className={`absolute -inset-2 bg-white/0 rounded-full blur-xl transition duration-500 ${
                uploadState === "idle" ? "group-hover:bg-white/30" : "opacity-0"
              }`}
            />

            <button
              type="button"
              disabled={uploadState !== "idle"}
              className={`relative min-w-[300px] md:min-w-[340px] min-h-[52px] md:min-h-[58px] px-12 md:px-14 py-4 md:py-5 backdrop-blur-md rounded-full font-bold uppercase tracking-[0.16em] text-[15px] overflow-hidden flex items-center justify-center transition-all duration-500 ${
                uploadState === "idle"
                  ? "bg-[#0a0a0a]/80 border border-white/20 text-white group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-[0.96] active:bg-[#e0e0e0] active:shadow-inner"
                  : uploadState === "uploading"
                  ? "bg-[#0a0a0a]/80 border border-[#333] text-white cursor-wait shadow-inner"
                  : "bg-green-500/10 border border-green-500 text-green-400 cursor-default brief-anim-success-pop"
              }`}
            >
              {uploadState === "uploading" && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-[#ff8015] transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[10px] bg-[#ff8015] blur-sm" />
                </div>
              )}

              <div
                className={`absolute top-0 left-0 right-0 h-[1px] ${
                  uploadState === "success"
                    ? "bg-gradient-to-r from-transparent via-green-500/50 to-transparent"
                    : "bg-gradient-to-r from-transparent via-white/50 to-transparent"
                }`}
              />

              {uploadState === "idle" && (
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-[sweep_0.8s_ease-in-out]" />
              )}

              <span className="relative z-10 flex items-center justify-center gap-3 w-full">
                {uploadState === "idle" && "Upload Brief"}

                {uploadState === "uploading" && (
                  <div className="flex items-center gap-4 w-full justify-center">
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          className="text-white/10"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          className="text-[#ff8015] transition-all duration-75 ease-out"
                          strokeDasharray="62.83"
                          strokeDashoffset={62.83 - (62.83 * progress) / 100}
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#888]">Uploading</span>
                      <span className="font-mono text-[#ff8015] w-[4ch] text-right">
                        {Math.floor(progress)}%
                      </span>
                    </div>
                  </div>
                )}

                {uploadState === "success" && (
                  <>
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="brief-anim-draw-check"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                        strokeDashoffset="24"
                      />
                    </svg>
                    Uploaded
                  </>
                )}
              </span>
            </button>
          </div>

          <div
            className={`absolute bottom-8 transition-all duration-500 ${
              uploadState === "idle" ? "opacity-100" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="text-[#888] text-xs md:text-sm uppercase tracking-[0.2em] font-mono font-bold group-hover:text-[#ff8015]/80 transition-colors duration-500">
              Drag & drop files or click to browse
            </span>
          </div>
        </div>

        <div
          className="relative w-full max-w-[1220px] mx-auto"
          style={{ marginTop: "clamp(100px, 9vw, 140px)" }}
        >
          <div className="hidden lg:grid grid-cols-6 relative w-full h-[360px]">
            {/* The main horizontal track */}
            <div className="absolute top-1/2 left-0 w-full h-[6px] bg-[#1a1a1a] rounded-full -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 w-full h-[6px] shadow-[0_0_20px_#ff8015] rounded-full -translate-y-1/2">
              {isVisible && (
                <div className="h-full rounded-full brief-anim-draw-track" />
              )}
            </div>

            {TIMELINE.map((item, index) => {
              const isTop = index % 2 !== 0;
              const reachTime = lineDrawTime * ((index + 0.5) / TIMELINE.length);

              return (
                <div key={item.step} className="relative w-full h-full flex justify-center items-center group">
                  {/* The circular node */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full border-[3px] border-[#333] bg-[#050505] flex items-center justify-center z-20 opacity-0 brief-anim-node-activate my-[1px]"
                    style={{ animationDelay: `${reachTime}s` }}
                  >
                    <span className="text-[17px] font-mono font-bold transition-colors duration-300 group-hover:text-white">{item.step}</span>
                  </div>

                  {/* Top content (Text pointing down) */}
                  {isTop && (
                    <div 
                      className="absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-end w-[240px] z-10"
                      style={{ paddingBottom: `${item.textMargin}px` }}
                    >
                      {isVisible && (
                        <div
                          className="absolute bottom-[28px] left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-t from-[#ff8015] to-[#ff8015]/0 origin-bottom opacity-0 brief-anim-sprout"
                          style={{ height: `${item.tickHeight}px`, animationDelay: `${reachTime}s` }}
                        />
                      )}
                      <div
                        className="opacity-0 brief-anim-text-down flex flex-col items-center text-center"
                        style={{ animationDelay: `${reachTime + 0.2}s` }}
                      >
                        <h3 className={`text-[18px] font-bold text-white tracking-wide mb-2 leading-tight transition-colors duration-300 group-hover:text-[#ff8015] ${montserrat.className}`}>
                          {item.title}
                        </h3>
                        <p className="text-[15px] text-[#999] leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bottom content (Text pointing up) */}
                  {!isTop && (
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-start w-[240px] z-10"
                      style={{ paddingTop: `${item.textMargin}px` }}
                    >
                      {isVisible && (
                        <div
                          className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#ff8015] to-[#ff8015]/0 origin-top opacity-0 brief-anim-sprout"
                          style={{ height: `${item.tickHeight}px`, animationDelay: `${reachTime}s` }}
                        />
                      )}
                      <div
                        className="opacity-0 brief-anim-text-up flex flex-col items-center text-center"
                        style={{ animationDelay: `${reachTime + 0.2}s` }}
                      >
                        <h3 className={`text-[18px] font-bold text-white tracking-wide mb-2 leading-tight transition-colors duration-300 group-hover:text-[#ff8015] ${montserrat.className}`}>
                          {item.title}
                        </h3>
                        <p className="text-[15px] text-[#999] leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex lg:hidden flex-col relative w-full h-full px-2 mt-16 sm:mt-24 pb-8">
            {/* The main vertical track */}
            <div className="absolute top-0 bottom-0 left-[40px] w-[6px] bg-[#1a1a1a] rounded-full -translate-x-1/2" />
            <div className="absolute top-0 bottom-0 left-[40px] w-[6px] shadow-[0_0_20px_#ff8015] rounded-full -translate-x-1/2">
              {isVisible && (
                <div className="w-full h-full rounded-full brief-anim-draw-track-vert" />
              )}
            </div>

            {TIMELINE.map((item, index) => {
              const reachTime = lineDrawTime * ((index + 0.5) / TIMELINE.length);

              return (
                <div key={item.step} className="relative flex items-center mb-16 sm:mb-20 w-full group min-h-[64px]">
                  {/* The circular node */}
                  <div
                    className="absolute left-[40px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] shrink-0 rounded-full border-[3px] border-[#333] bg-[#050505] flex items-center justify-center z-20 opacity-0 brief-anim-node-activate my-[1px]"
                    style={{ animationDelay: `${reachTime}s` }}
                  >
                    <span className="text-[17px] font-mono font-bold transition-colors duration-300 group-hover:text-white">{item.step}</span>
                  </div>

                  {/* Text content bounded right */}
                  <div
                    className="w-full pl-[96px] pr-4 opacity-0 brief-anim-text-up pt-1"
                    style={{ animationDelay: `${reachTime + 0.2}s` }}
                  >
                    <h3 className={`text-[20px] font-bold text-white tracking-wide mb-2 leading-tight transition-colors duration-300 group-hover:text-[#ff8015] ${montserrat.className}`}>
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-[#999] leading-relaxed font-normal">{item.desc}</p>
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

export default BriefCTASection;