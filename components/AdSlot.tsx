"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
}

export default function AdSlot({
  slot,
  format = "auto",
  className = "",
}: AdSlotProps) {
  const pushed = useRef(false);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // Never render fake dummy slots like "0000000001" or empty slots
  const isValidSlot = slot && !/^0+$/.test(slot.replace(/[^0-9]/g, "")) && slot.length > 5;
  const isEnabled = adsenseId && adsenseId.startsWith("ca-pub-") && isValidSlot;

  useEffect(() => {
    if (!isEnabled || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [isEnabled]);

  if (!isEnabled) {
    // Return empty placeholder container during development to prevent layout shifts
    // while keeping content genuine and strictly free of fake advertisement mockups.
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 min-h-[100px] text-center ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
