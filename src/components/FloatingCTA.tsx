"use client";

import { MessageCircle } from "lucide-react";

export function FloatingCTA() {
  return (
    <a
      href="#contacto"
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-lime-400 to-green-500 text-black font-black px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-3 group"
    >
      <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      <span>Speak To Us</span>
    </a>
  );
}
