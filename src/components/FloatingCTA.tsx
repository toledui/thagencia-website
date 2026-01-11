"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingCTA() {
  const [waHref, setWaHref] = useState("https://wa.me/5219656976675");

  useEffect(() => {
    const message = encodeURIComponent(
      `Hola, vengo desde la web y quiero más información. Página: ${window.location.href}`
    );
    setWaHref(`https://wa.me/5219656976675?text=${message}`);
  }, []);

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp con THagencia"
      className="fixed bottom-8 right-8 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform duration-300"
    >
      <span className="absolute inline-flex h-14 w-14 rounded-full bg-[#25D366] opacity-60 animate-ping" aria-hidden />
      <MessageCircle className="relative w-6 h-6" />
    </a>
  );
}
