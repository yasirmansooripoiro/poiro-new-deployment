"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   LOGO MARQUEE — True infinite scroll
   No gaps, perfectly looping
   ═══════════════════════════════════════════════════════ */

const BRANDS = [
  "ACME",
  "QUANTUM",
  "ECHO",
  "CELESTIAL",
  "PULSE",
  "APEX",
  "NOVA",
  "STRATA",
  "ACME",
  "QUANTUM",
  "ECHO",
  "CELESTIAL",
  "PULSE",
  "APEX",
  "NOVA",
  "STRATA",
];

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
        whiteSpace: "nowrap",
        userSelect: "none",
        transition: "color 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color =
          "rgba(255,255,255,0.35)";
      }}
    >
      {name}
    </span>
  );
}

export default function LogoMarquee() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "#000",
        borderTop: "1px solid var(--color-border-gray)",
        borderBottom: "1px solid var(--color-border-gray)",
        padding: "clamp(20px, 3vw, 32px) 0",
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
        animate={{ x: "-50%" }}
        initial={{ x: "0%" }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          display: "flex",
          width: "max-content",
        }}
      >
        {/* Duplicate the list twice */}
        {[...BRANDS, ...BRANDS].map((name, index) => (
          <div
            key={index}
            style={{
              padding: "0 clamp(20px, 3vw, 40px)",
              flexShrink: 0,
            }}
          >
            <LogoPlaceholder name={name} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}