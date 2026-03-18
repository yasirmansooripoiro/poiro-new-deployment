"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ImagesBadgeProps {
  text: string;
  images: string[];
  className?: string;
  textClassName?: string;
  href?: string;
  target?: string;
  folderSize?: { width: number; height: number };
  teaserImageSize?: { width: number; height: number };
  hoverImageSize?: { width: number; height: number };
  hoverTranslateY?: number;
  hoverSpread?: number;
  hoverRotation?: number;
}

export function ImagesBadge({
  text,
  images,
  className,
  textClassName,
  href,
  target,
  folderSize = { width: 38, height: 28 },
  teaserImageSize = { width: 22, height: 15 },
  hoverImageSize = { width: 56, height: 36 },
  hoverTranslateY = -38,
  hoverSpread = 22,
  hoverRotation = 14,
}: ImagesBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const displayImages = images.slice(0, 3);

  const tabWidth = folderSize.width * 0.375;
  const tabHeight = folderSize.height * 0.25;

  const sharedClassName = [
    "inline-flex cursor-pointer items-center gap-2 perspective-[1000px] transform-3d",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <motion.div
        className="relative"
        style={{
          width: folderSize.width,
          height: folderSize.height,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-orange-500 to-orange-600 shadow-sm">
          <div
            className="absolute left-0.5 rounded-t-[2px] bg-gradient-to-b from-orange-400 to-orange-500"
            style={{
              top: -tabHeight * 0.65,
              width: tabWidth,
              height: tabHeight,
            }}
          />
        </div>

        {displayImages.map((image, index) => {
          const totalImages = displayImages.length;
          const baseRotation =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * hoverRotation
                : (index - 1) * hoverRotation;

          const hoverY = hoverTranslateY - (totalImages - 1 - index) * 3;
          const hoverX =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * hoverSpread
                : (index - 1) * hoverSpread;

          const teaseY = -4 - (totalImages - 1 - index) * 1;
          const teaseRotation =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * 3
                : (index - 1) * 3;

          return (
            <motion.div
              key={index}
              className="absolute top-0.5 left-1/2 origin-bottom overflow-hidden rounded-[3px] bg-white shadow-sm ring-1 shadow-black/30 ring-black/20"
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
                className="h-full w-full object-cover"
              />
            </motion.div>
          );
        })}

        <motion.div
          className="absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-[4px] bg-gradient-to-b from-orange-400 to-orange-500 shadow-sm"
          animate={{
            rotateX: isHovered ? -45 : -25,
            scaleY: isHovered ? 0.8 : 1,
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
          <div className="absolute top-1 right-1 left-1 h-px bg-orange-200/60" />
        </motion.div>
      </motion.div>

      <span className={textClassName ?? "text-sm font-semibold text-white/90"}>
        {text}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={sharedClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={sharedClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </div>
  );
}
