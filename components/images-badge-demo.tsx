"use client";

import { ImagesBadge } from "@/../components/ui/images-badge";

export default function ImagesBadgeDemo() {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <ImagesBadge
        text="Give us your brief"
        className="flex-col items-center justify-center gap-4"
        textClassName="text-[14px] font-semibold tracking-[0.12em] uppercase text-white/70"
        images={[
          "https://assets.aceternity.com/pro/agenforce-1.webp",
          "https://assets.aceternity.com/pro/agenforce-2.webp",
          "https://assets.aceternity.com/pro/agenforce-3.webp",
        ]}
        folderSize={{ width: 120, height: 90 }}
        teaserImageSize={{ width: 70, height: 50 }}
        hoverImageSize={{ width: 140, height: 100 }}
      />
    </div>
  );
}
