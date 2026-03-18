"use client";

import { useState } from "react";

type ModuleConfig = {
  id: string;
  number: string;
  title: string;
  bigText: string;
  contentTitle: string;
  contentDesc: string;
  image: string;
};

const MODULES: ModuleConfig[] = [
  {
    id: "understand",
    number: "01",
    title: "Understand",
    bigText: "Data Driven Insights",
    contentTitle: "",
    contentDesc:
      "Grounded in data, this is where audience signals, market context, and brand positioning come together to define what matters and how the brand should show up.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: "build",
    number: "02",
    title: "Build",
    bigText: "Workflow Systems",
    contentTitle: "",
    contentDesc:
      "Structured through workflows, insights are shaped into clear narrative direction and repeatable content systems designed for consistency and scale.",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "scale",
    number: "03",
    title: "Scale",
    bigText: "with AI Accelerators",
    contentTitle: "",
    contentDesc:
      "Executed by AI producers, content is created, distributed, and continuously optimized to perform across channels and grow over time.",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function OperatingSystemSection() {
  const [activeTab, setActiveTab] = useState(MODULES[0].id);
  const activeData = MODULES.find((module) => module.id === activeTab) ?? MODULES[0];

  return (
    <section
      id="operating-system"
      className="os-feature-matrix"
      style={{
        position: "relative",
        padding: "clamp(80px, 12vw, 180px) var(--space-3)",
        background: "#000",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes osPremiumFadeIn {
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

          @keyframes osTextFlow {
            0% { background-position: 0% center; }
            100% { background-position: -200% center; }
          }

          .os-animate-premium-in {
            animation: osPremiumFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .os-animate-text-flow {
            background: linear-gradient(to right, #ff7809, #ffea2b, #ff8015);
            background-size: 200% auto;
            animation: osTextFlow 4s linear infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }

          .os-matrix-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: clamp(28px, 4vw, 48px);
            align-items: start;
          }

          @media (min-width: 1024px) {
            .os-matrix-grid {
              grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
              gap: clamp(36px, 4vw, 96px);
              align-items: start;
            }

            .os-matrix-panel-sticky {
              position: sticky;
              top: clamp(84px, 8vw, 128px);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 110vw)",
          height: "min(900px, 110vw)",
          background:
            "radial-gradient(circle, rgba(255,95,31,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "clamp(52px, 7vw, 108px)" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--color-brand-orange)",
              marginBottom: "var(--space-2)",
              fontWeight: 600,
            }}
          >
            System Architecture
          </p>
          <h2
            style={{
              fontSize: "clamp(36px, 6vw, 84px)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: 900,
              margin: 0,
            }}
          >
            An operating system for{" "}
            <span className="os-animate-text-flow">storytelling.</span>
          </h2>
          <p
            style={{
              marginTop: "var(--space-3)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "var(--color-dark-gray)",
              maxWidth: 620,
              lineHeight: 1.7,
            }}
          >
            Poiro connects context, intelligence, brand logic, and distribution into
            a single autonomous creative pipeline.
          </p>
          <div
            style={{
              marginTop: "clamp(24px, 3.2vw, 38px)",
              height: 1,
              width: "100%",
              background:
                "linear-gradient(to right, rgba(68,68,68,1), rgba(34,34,34,1), rgba(0,0,0,0))",
            }}
          />
        </div>

        <div className="os-matrix-grid">
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 11,
                top: 16,
                bottom: 16,
                width: 1,
                background: "#222",
                pointerEvents: "none",
              }}
            />
            {MODULES.map((module) => {
              const isActive = activeTab === module.id;

              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setActiveTab(module.id)}
                  aria-pressed={isActive}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    padding: "clamp(18px, 2.3vw, 30px) 0",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "clamp(18px, 2.5vw, 38px)",
                    }}
                  >
                    <div
                      style={{
                        marginTop: 3,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: isActive ? "var(--color-brand-orange)" : "#444",
                        transition: "color 0.5s ease",
                      }}
                    >
                      {module.number}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "clamp(30px, 4.2vw, 56px)",
                          fontWeight: 800,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.05,
                          color: isActive ? "#fff" : "#555",
                          transition: "color 0.5s ease",
                        }}
                      >
                        {module.title}
                      </h3>

                      <div
                        style={{
                          overflow: "hidden",
                          transition: "all 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
                          maxHeight: isActive ? 280 : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 14 : 0,
                        }}
                      >
                        <div
                          style={{
                            fontSize: "clamp(12px, 1.8vw, 28px)",
                            fontWeight: 900,
                            letterSpacing: "-0.02em",
                            background:
                              "linear-gradient(to right, #fd7200 20%, #ffea2b 80%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            lineHeight: 1.1,
                            paddingBottom: 4,
                            maxWidth: "100%",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {module.bigText}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="os-matrix-panel-sticky" style={{ width: "100%" }}>
            <div key={activeTab} className="os-animate-premium-in" style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  borderRadius: 18,
                  overflow: "hidden",
                  position: "relative",
                  marginBottom: "clamp(22px, 3vw, 36px)",
                  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
                  background: "#050505",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <img
                  src={activeData.image}
                  alt={activeData.contentTitle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scale(1)",
                    transition: "transform 1s ease-out",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.25), rgba(0,0,0,0))",
                  }}
                />
              </div>

              <div
                style={{
                  paddingLeft: "clamp(14px, 2vw, 24px)",
                  borderLeft: "2px solid #333",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "clamp(24px, 2.8vw, 38px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    lineHeight: 1.18,
                  }}
                >
                  {activeData.contentTitle}
                </h4>
                <p
                  style={{
                    marginTop: "clamp(10px, 1.5vw, 14px)",
                    marginBottom: 0,
                    color: "#9a9a9a",
                    fontSize: "clamp(0.96rem, 1.15vw, 1.08rem)",
                    lineHeight: 1.8,
                    fontWeight: 500,
                    maxWidth: 620,
                  }}
                >
                  {activeData.contentDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
