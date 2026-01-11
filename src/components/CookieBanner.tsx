"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("thagencia-cookie-consent");
    if (!cookieConsent) {
      // Small delay to avoid hydration mismatch
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("thagencia-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("thagencia-cookie-consent", "dismissed");
    setIsVisible(false);
  };

  // Prevent hydration mismatch
  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-900 dark:bg-neutral-800 text-white border-t border-neutral-700 dark:border-neutral-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Message */}
        <p className="text-sm md:text-base leading-relaxed flex-1">
          Este sitio web usa cookies para garantizar que obtengas la mejor experiencia en nuestra web. 
          Si continúas navegando, consideramos que aceptas su uso.{" "}
          <a 
            href="/aviso-de-cookies" 
            className="font-semibold text-orange-500 hover:text-orange-400 underline transition-colors"
          >
            Leer más
          </a>
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          <button
            onClick={handleAccept}
            className="px-4 md:px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors duration-200"
          >
            Entendido
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-neutral-700 dark:hover:bg-neutral-700 rounded-lg transition-colors duration-200"
            aria-label="Cerrar banner de cookies"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
