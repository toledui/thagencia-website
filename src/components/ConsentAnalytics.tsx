"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export function ConsentAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Initial check
    try {
      const consent = localStorage.getItem("thagencia-cookie-consent");
      if (consent === "accepted") {
        setEnabled(true);
      }
    } catch {}

    // Listen for acceptance from CookieBanner
    const onConsent = (e: Event) => {
      setEnabled(true);
    };
    window.addEventListener("thagencia-cookie-consent", onConsent);
    return () => window.removeEventListener("thagencia-cookie-consent", onConsent);
  }, []);

  if (!enabled) return null;
  return <GoogleAnalytics gaId="G-T098P1MBEV" />;
}
