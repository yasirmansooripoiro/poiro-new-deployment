"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════ */

interface NavProps {
  onCtaClick?: () => void;
}

export function Nav({ onCtaClick }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down">("down");
  const thresholdRef = useRef(0);

  useEffect(() => {
    thresholdRef.current = window.innerHeight * (180 * 1.25 / 100);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollYRef.current) {
        scrollDirectionRef.current = "down";
      } else if (currentScrollY < lastScrollYRef.current) {
        scrollDirectionRef.current = "up";
      }

      if (currentScrollY > thresholdRef.current) {
        setIsHidden(scrollDirectionRef.current === "down");
      } else {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      className="fixed z-50 flex items-center justify-between"
      style={{
        top: "var(--space-3)",
        left: "50%",
        transform: isHidden ? "translate(-50%, -130%)" : "translateX(-50%)",
        width: "95%",
        maxWidth: "1280px",
        height: "60px",
        padding: "0 8px 0 20px",
        backgroundColor: isScrolled ? "rgba(8,8,8,0.88)" : "rgba(12,12,12,0.7)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: isScrolled
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: "18px",
        boxShadow: isScrolled
          ? "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "all 700ms cubic-bezier(0.32, 0.72, 0, 1)",
      }}
    >
      {/* Animated Logo */}
      <Link
        href="/"
        className="flex items-center group cursor-pointer"
        style={{ width: "120px", textDecoration: "none" }}
      >
        <div
          className="flex items-center font-black text-brand-orange"
          style={{ fontSize: "1.4rem", letterSpacing: "-0.025em" }}
        >
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transformOrigin: "right center",
              maxWidth: isScrolled ? "0px" : "20px",
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? "translateX(10px)" : "translateX(0px)",
              transition: "all 700ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            P
          </span>
          <span
            className="inline-block"
            style={{ position: "relative", zIndex: 10, transition: "transform 500ms ease" }}
          >
            ô
          </span>
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transformOrigin: "left center",
              maxWidth: isScrolled ? "0px" : "50px",
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? "translateX(-10px)" : "translateX(0px)",
              transition: "all 700ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            iro.
          </span>
        </div>
      </Link>

      {/* Links — grouped in frosted inner pill */}
      <div
        className="hidden md:flex items-center"
        style={{
          gap: "4px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          padding: "6px",
        }}
      >
        {["Insights", "Brandify™", "Omni-Focus"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/[^a-z]/g, "")}`}
            className="transition-all duration-200"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: hoveredLink === item ? "#fff" : "rgba(180,180,180,0.8)",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "8px",
              background: hoveredLink === item ? "rgba(255,255,255,0.08)" : "transparent",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={() => setHoveredLink(item)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center" style={{ gap: "6px" }}>
        <button
          className="hidden md:block transition-all duration-200 cursor-pointer"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "rgba(180,180,180,0.8)",
            background: "transparent",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#fff";
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(180,180,180,0.8)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          Log In
        </button>

        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />

        <button
          onClick={onCtaClick}
          className="hidden md:flex items-center cursor-pointer transition-all duration-200"
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#000",
            background: "linear-gradient(135deg, #FF6B2B 0%, #FF5F1F 50%, #e8541a 100%)",
            border: "1px solid rgba(255,95,31,0.6)",
            borderRadius: "10px",
            padding: "9px 20px",
            boxShadow: "0 0 0 0 rgba(255,95,31,0)",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(-1px)";
            el.style.boxShadow = "0 4px 20px rgba(255,95,31,0.4), 0 0 0 1px rgba(255,95,31,0.3)";
            el.style.background = "linear-gradient(135deg, #FF7A3B 0%, #FF6B2B 50%, #f5601e 100%)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 0 0 0 rgba(255,95,31,0)";
            el.style.background = "linear-gradient(135deg, #FF6B2B 0%, #FF5F1F 50%, #e8541a 100%)";
          }}
        >
          Book Demo
          <span style={{ fontSize: "10px", opacity: 0.7 }}>→</span>
        </button>

        <button
          className="flex md:hidden items-center justify-center cursor-pointer"
          style={{
            width: "36px",
            height: "36px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "16px",
          }}
        >
          ≡
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   PRIMARY BUTTON
   ═══════════════════════════════════════════════════════ */

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PrimaryButton({
  children,
  onClick,
  size = "md",
  className = "",
}: ButtonProps) {
  const sizeStyles = {
    sm: { padding: "var(--space-1) var(--space-3)", fontSize: "11px" },
    md: { padding: "var(--space-2) var(--space-5)", fontSize: "13px" },
    lg: { padding: "var(--space-3) var(--space-8)", fontSize: "15px" },
  };

  return (
    <button
      onClick={onClick}
      className={`bg-brand-orange text-black font-bold uppercase tracking-widest
                 border border-brand-orange cursor-pointer
                 hover:translate-x-[-2px] hover:translate-y-[-2px]
                 active:translate-x-0 active:translate-y-0
                 transition-all duration-200 ${className}`}
      style={{
        ...sizeStyles[size],
        borderRadius: "10px",
        boxShadow: "var(--shadow-white-sm)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-white-md)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-white-sm)";
      }}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   SECONDARY BUTTON
   ═══════════════════════════════════════════════════════ */

export function SecondaryButton({
  children,
  onClick,
  size = "md",
  className = "",
}: ButtonProps) {
  const sizeStyles = {
    sm: { padding: "var(--space-1) var(--space-3)", fontSize: "11px" },
    md: { padding: "var(--space-2) var(--space-5)", fontSize: "13px" },
    lg: { padding: "var(--space-3) var(--space-8)", fontSize: "15px" },
  };

  return (
    <button
      onClick={onClick}
      className={`bg-transparent text-white font-bold uppercase tracking-widest
                 border border-border-gray cursor-pointer
                 hover:border-brand-orange
                 hover:translate-x-[-2px] hover:translate-y-[-2px]
                 active:translate-x-0 active:translate-y-0
                 transition-all duration-200 ${className}`}
      style={{
        ...sizeStyles[size],
        borderRadius: "10px",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
      }}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   TICKER
   ═══════════════════════════════════════════════════════ */

interface TickerProps {
  items: string[];
  speed?: number;          /* seconds per full loop */
  separator?: string;
  className?: string;
}

export function Ticker({
  items,
  speed = 20,
  separator = "✦",
  className = "",
}: TickerProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div
      className={`overflow-hidden whitespace-nowrap border-y border-border-gray ${className}`}
      style={{ padding: "var(--space-2) 0" }}
    >
      <div
        className="inline-flex"
        style={{
          animation: `ticker-scroll ${speed}s linear infinite`,
        }}
      >
        <span
          className="text-dark-gray uppercase tracking-widest font-bold"
          style={{ fontSize: "13px", paddingRight: "var(--space-4)" }}
        >
          {content}
        </span>
        <span
          className="text-dark-gray uppercase tracking-widest font-bold"
          style={{ fontSize: "13px", paddingRight: "var(--space-4)" }}
        >
          {content}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STAT BLOCK
   ═══════════════════════════════════════════════════════ */

interface StatBlockProps {
  value: string;
  label: string;
  icon?: string;
  className?: string;
}

export function StatBlock({ value, label, icon, className = "" }: StatBlockProps) {
  return (
    <div
      className={`border border-border-gray bg-accent ${className}`}
      style={{ padding: "var(--space-3)" }}
    >
      {icon && (
        <span className="text-brand-orange" style={{ fontSize: "20px", marginBottom: "var(--space-1)", display: "block" }}>
          {icon}
        </span>
      )}
      <div
        className="text-white font-bold"
        style={{ fontSize: "32px", lineHeight: 1, marginBottom: "var(--space-1)" }}
      >
        {value}
      </div>
      <div
        className="text-dark-gray font-mono uppercase tracking-widest"
        style={{ fontSize: "10px" }}
      >
        {label}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTROL PANEL
   ═══════════════════════════════════════════════════════ */

interface ControlPanelProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ControlPanel({ title, children, className = "" }: ControlPanelProps) {
  return (
    <div
      className={`border border-border-gray bg-accent ${className}`}
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center border-b border-border-gray"
        style={{ padding: "var(--space-1) var(--space-2)", gap: "var(--space-1)" }}
      >
        <div className="bg-brand-orange" style={{ width: "8px", height: "8px" }} />
        <div className="bg-border-gray" style={{ width: "8px", height: "8px" }} />
        <div className="bg-border-gray" style={{ width: "8px", height: "8px" }} />
        <span
          className="font-mono text-dark-gray uppercase tracking-widest"
          style={{ fontSize: "10px", marginLeft: "var(--space-1)" }}
        >
          {title}
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: "var(--space-3)" }}>{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   IMAGE CANVAS
   ═══════════════════════════════════════════════════════ */

interface ImageCanvasProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

export function ImageCanvas({ src, alt, label, className = "" }: ImageCanvasProps) {
  return (
    <div
      className={`border border-border-gray relative overflow-hidden group ${className}`}
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="aspect-[4/3] bg-accent relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {label && (
        <div
          className="border-t border-border-gray flex items-center justify-between"
          style={{ padding: "var(--space-1) var(--space-2)" }}
        >
          <span
            className="font-mono text-dark-gray uppercase tracking-widest"
            style={{ fontSize: "10px" }}
          >
            {label}
          </span>
          <span className="text-brand-orange" style={{ fontSize: "10px" }}>●</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TERMINAL CONSOLE
   ═══════════════════════════════════════════════════════ */

interface TerminalLine {
  prefix: string;
  text: string;
}

interface TerminalConsoleProps {
  title?: string;
  lines: TerminalLine[];
  className?: string;
  animate?: boolean;
}

export function TerminalConsole({
  title = "poiro@terminal",
  lines,
  className = "",
  animate = true,
}: TerminalConsoleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !containerRef.current) return;
    const lineEls = containerRef.current.querySelectorAll(".terminal-line");
    gsap.fromTo(
      lineEls,
      { opacity: 0, x: -16 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.12,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={`border border-border-gray bg-black/80 ${className}`}
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center border-b border-border-gray"
        style={{ padding: "var(--space-1) var(--space-2)", gap: "var(--space-1)" }}
      >
        <div className="bg-brand-orange" style={{ width: "8px", height: "8px" }} />
        <div className="bg-border-gray" style={{ width: "8px", height: "8px" }} />
        <div className="bg-border-gray" style={{ width: "8px", height: "8px" }} />
        <span
          className="font-mono text-dark-gray"
          style={{ fontSize: "10px", marginLeft: "var(--space-1)" }}
        >
          {title}
        </span>
      </div>
      {/* Lines */}
      <div style={{ padding: "var(--space-2) var(--space-3)" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="terminal-line font-mono leading-relaxed"
            style={{ fontSize: "13px", marginBottom: "var(--space-1)" }}
          >
            <span className="text-brand-orange">{line.prefix}</span>
            <span className="text-light-gray" style={{ marginLeft: "var(--space-1)" }}>
              {line.text}
            </span>
          </div>
        ))}
        {/* Blinking cursor */}
        <span
          className="text-brand-orange font-mono inline-block"
          style={{ animation: "blink 1s step-end infinite", fontSize: "13px" }}
        >
          ▌
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PIPELINE TRACKER
   ═══════════════════════════════════════════════════════ */

interface PipelineStage {
  name: string;
  description?: string;
}

interface PipelineTrackerProps {
  stages: PipelineStage[];
  activeIndex?: number;      /* controlled from scroll */
  className?: string;
}

export function PipelineTracker({
  stages,
  activeIndex = -1,
  className = "",
}: PipelineTrackerProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-stretch ${className}`}
      style={{ gap: "var(--space-1)" }}
    >
      {stages.map((stage, i) => {
        const isActive = i <= activeIndex;
        return (
          <div key={stage.name} className="flex items-center flex-1" style={{ gap: "var(--space-1)" }}>
            <div
              className={`flex-1 border transition-all duration-500 ${
                isActive
                  ? "border-brand-orange bg-brand-orange/10"
                  : "border-border-gray bg-accent"
              }`}
              style={{ padding: "var(--space-2) var(--space-3)" }}
            >
              <div
                className={`font-bold uppercase tracking-widest transition-colors duration-500 ${
                  isActive ? "text-brand-orange" : "text-dark-gray"
                }`}
                style={{ fontSize: "12px", marginBottom: "var(--space-1)" }}
              >
                {stage.name}
              </div>
              {stage.description && (
                <div
                  className={`font-mono transition-colors duration-500 ${
                    isActive ? "text-light-gray" : "text-border-gray"
                  }`}
                  style={{ fontSize: "10px" }}
                >
                  {stage.description}
                </div>
              )}
            </div>
            {/* Arrow separator */}
            {i < stages.length - 1 && (
              <span
                className={`font-mono transition-colors duration-500 hidden md:block ${
                  isActive ? "text-brand-orange" : "text-border-gray"
                }`}
                style={{ fontSize: "18px" }}
              >
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TOGGLE SWITCH
   ═══════════════════════════════════════════════════════ */

interface ToggleSwitchProps {
  label: string;
  isOn?: boolean;
  onToggle?: (value: boolean) => void;
  className?: string;
}

export function ToggleSwitch({
  label,
  isOn = false,
  onToggle,
  className = "",
}: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onToggle?.(!isOn)}
      className={`flex items-center cursor-pointer bg-transparent border-none ${className}`}
      style={{ gap: "var(--space-2)" }}
    >
      {/* Track */}
      <div
        className={`relative transition-colors duration-200 ${
          isOn ? "bg-brand-orange" : "bg-border-gray"
        }`}
        style={{ width: "40px", height: "16px" }}
      >
        {/* Thumb */}
        <div
          className="absolute top-0 bg-white transition-all duration-200"
          style={{
            width: "16px",
            height: "16px",
            left: isOn ? "24px" : "0px",
          }}
        />
      </div>
      <span
        className={`font-mono uppercase tracking-widest transition-colors duration-200 ${
          isOn ? "text-brand-orange" : "text-dark-gray"
        }`}
        style={{ fontSize: "10px" }}
      >
        {label}
      </span>
    </button>
  );
}
