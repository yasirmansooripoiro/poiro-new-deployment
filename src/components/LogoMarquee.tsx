"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════
   LOGO MARQUEE — True infinite scroll
   No gaps, perfectly looping
   ═══════════════════════════════════════════════════════ */

const LOGOS = [
  { name: "Chumbak", src: "/logos/chumbak.webp" },
  { name: "EFPY", src: "/logos/EFPY.webp" },
  { name: "Foramour", src: "/logos/foramour.webp" },
  { name: "Godrej", src: "/logos/godrej.webp" },
  { name: "Stella", src: "/logos/stella.webp" },
  { name: "Greenfields", src: "/logos/greenfields.webp" },
  { name: "Imara", src: "/logos/imara.webp" },
  { name: "Chumbak", src: "/logos/chumbak.webp" },
  { name: "EFPY", src: "/logos/EFPY.webp" },
  { name: "Foramour", src: "/logos/foramour.webp" },
  { name: "Godrej", src: "/logos/godrej.webp" },
  { name: "Stella", src: "/logos/stella.webp" },
  { name: "Greenfields", src: "/logos/greenfields.webp" },
  { name: "Imara", src: "/logos/imara.webp" },
];

const SCROLL_SPEED_PX_PER_SEC = 70;

export default function LogoMarquee() {
  const sequenceRef = useRef<HTMLDivElement | null>(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!sequenceRef.current) return;

    const measure = () => {
      setSequenceWidth(sequenceRef.current?.offsetWidth ?? 0);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(sequenceRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    x.set(0);
  }, [sequenceWidth, x]);

  useAnimationFrame((_, delta) => {
    if (!sequenceWidth) return;

    const distance = (SCROLL_SPEED_PX_PER_SEC * delta) / 1000;
    let next = x.get() - distance;

    while (next <= -sequenceWidth) {
      next += sequenceWidth;
    }

    x.set(next);
  });

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    minHeight: "clamp(64px, 8vw, 88px)",
    width: "max-content",
  } as const;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "#000",
        borderTop: "1px solid var(--color-border-gray)",
        borderBottom: "1px solid var(--color-border-gray)",
        minHeight: "clamp(120px, 14vw, 168px)",
        padding: "clamp(26px, 3.6vw, 38px) 0",
        overflow: "hidden",
      }}
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "80px",
          height: "100%",
          background: "linear-gradient(to right, #000, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "80px",
          height: "100%",
          background: "linear-gradient(to left, #000, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          x,
          display: "flex",
          width: "max-content",
          alignItems: "center",
          willChange: "transform",
        }}
      >
        <div ref={sequenceRef} style={rowStyle}>
          {LOGOS.map((logo, index) => (
            <div
              key={`${logo.name}-main-${index}`}
              style={{
                padding: "0 clamp(20px, 2.8vw, 42px)",
                flexShrink: 0,
                width: "clamp(130px, 14vw, 220px)",
                height: "clamp(46px, 5.6vw, 76px)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="(max-width: 768px) 140px, 220px"
                style={{
                  objectFit: "contain",
                  filter: "grayscale(1)",
                  opacity: 0.78,
                }}
              />
            </div>
          ))}
        </div>

        <div aria-hidden="true" style={rowStyle}>
          {LOGOS.map((logo, index) => (
            <div
              key={`${logo.name}-dup-${index}`}
              style={{
                padding: "0 clamp(20px, 2.8vw, 42px)",
                flexShrink: 0,
                width: "clamp(130px, 14vw, 220px)",
                height: "clamp(46px, 5.6vw, 76px)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={logo.src}
                alt=""
                fill
                sizes="(max-width: 768px) 140px, 220px"
                style={{
                  objectFit: "contain",
                  filter: "grayscale(1)",
                  opacity: 0.78,
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}