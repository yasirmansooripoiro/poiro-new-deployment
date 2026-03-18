"use client";

import { useCallback, useState } from "react";
import HeroSection from "@/components/HeroSection";
import HeroCanvas from "@/components/HeroCanvas";
import { Explosion } from "@/../components/Explosion";
import OperatingSystemSection from "@/components/sections/OperatingSystemSection";
import SecondVideoSection from "@/components/sections/SecondVideoSection";
import FooterCTASection from "@/components/sections/FooterCTASection";
import PagePreloader from "@/../components/PagePreloader";
import { Nav } from "@/components/componentBoard";
import { FRAME_SEGMENTS } from "@/../lib/frameSegments";
import { LightRays } from "@/../components/LightRays";
import { AmbientParticles } from "@/../components/Particles";
import LogoMarquee from "@/components/LogoMarquee";

/* ═══════════════════════════════════════════════════════
   HOME PAGE
  Hero (frame 0→599 + explosion) →
   Operating System →
  Second Video (frame 600→779) →
   Footer CTA

  Hero and second-video canvases render inside their
  own pinned sections, so section flow is natural.
   ═══════════════════════════════════════════════════════ */

const HERO = FRAME_SEGMENTS.HERO;
const SECOND_VIDEO = FRAME_SEGMENTS.SECOND_VIDEO;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export default function Home() {
  const [heroFrame, setHeroFrame] = useState<number>(HERO.start);
  const [secondVideoFrame, setSecondVideoFrame] = useState<number>(SECOND_VIDEO.start);
  const [explosionProgress, setExplosionProgress] = useState(0);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [isSecondVideoActive, setIsSecondVideoActive] = useState(false);

  /* ── Hero frames: update hero segment state + explosion ── */
  const handleHeroFrameChange = useCallback((frameIndex: number) => {
    setHeroFrame(frameIndex);

    const ep = clamp(
      (frameIndex - HERO.explosionStart) /
        (HERO.explosionEnd - HERO.explosionStart),
      0,
      1
    );
    setExplosionProgress(ep);
  }, []);

  /* ── Second video frames: update second segment state ── */
  const handleSecondVideoFrameChange = useCallback((frameIndex: number) => {
    setSecondVideoFrame(frameIndex);
  }, []);

  /* ── Frames loaded from HeroCanvas ── */
  const handleFramesLoaded = useCallback(() => {
    setFramesLoaded(true);
  }, []);

  /* ── Hero intro finished & its ScrollTrigger exists ── */
  const handleHeroIntroComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  /* ── Overlay opacity based on hero frame ── */
  // scrolling forward: <280 = 1, 280→300 fade 1→0, >300 = 0
  // scrolling backward: >320 = 0, 300→280 fade 0→1, <280 = 1
  const overlayOpacity = (() => {
    const frame = heroFrame;
    if (frame < 280) return 1;
    if (frame <= 300) return 1 - (frame - 280) / 20;
    return 0;
  })();

  const secondVideoRenderFrame = isSecondVideoActive
    ? secondVideoFrame
    : Math.max(secondVideoFrame, SECOND_VIDEO.start);

  return (
    <>
      <PagePreloader />
      <Nav />
      <Explosion explosionProgress={explosionProgress} />

      <HeroSection
        onFrameChange={handleHeroFrameChange}
        framesLoaded={framesLoaded}
        onIntroComplete={handleHeroIntroComplete}
      >
        <HeroCanvas
          frameIndex={heroFrame}
          onFramesLoaded={handleFramesLoaded}
        />

        {/* Light Rays — above canvas, below particles */}
        {overlayOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              opacity: overlayOpacity,
              transition: "opacity 0.15s linear",
              pointerEvents: "none",
            }}
          >
            <LightRays />
          </div>
        )}

        {/* Particles — above light rays */}
        {overlayOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              opacity: overlayOpacity,
              transition: "opacity 0.15s linear",
              pointerEvents: "auto",
            }}
          >
            <AmbientParticles
              count={300}
              speed={0.15}
              randomness={0.8}
              glowStrength={2.5}
              minSize={0.6}
              maxSize={2.0}
              clusterRadius={0.5}
              horizontalSpread={3.0}
              hoverRadius={250}
              color="255, 255, 255"
            />
          </div>
        )}
      </HeroSection>

      {/* Logo marquee strip — directly below hero, above OS section */}
      <LogoMarquee />

      {/* Normal sections — stacked naturally */}
      <OperatingSystemSection />

      <SecondVideoSection
        onFrameChange={handleSecondVideoFrameChange}
        heroReady={heroReady}
        onActiveChange={setIsSecondVideoActive}
      >
        <HeroCanvas frameIndex={secondVideoRenderFrame} />
      </SecondVideoSection>

      {/* Footer section */}
      <FooterCTASection />
    </>
  );
}
