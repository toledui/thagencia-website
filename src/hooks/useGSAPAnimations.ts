"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(
      ".reveal-text, .reveal-card, .reveal-image"
    );

    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: element.classList.contains("reveal-image") ? 0 : 40,
          clipPath: element.classList.contains("reveal-image")
            ? "inset(0 0 100% 0)"
            : "none",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: element.classList.contains("reveal-image")
            ? "inset(0 0 0 0)"
            : "none",
          duration: element.classList.contains("reveal-image") ? 1.2 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 20%",
            scrub: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

export function useFloatingAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: -50,
      x: 30,
      duration: 15,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return ref;
}

export function useMagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleHover = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.2 });
    };

    const handleLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", moveCursor);

      document.querySelectorAll("a, button, .cursor-hover").forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleLeave);
      });

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        document.querySelectorAll("a, button, .cursor-hover").forEach((el) => {
          el.removeEventListener("mouseenter", handleHover);
          el.removeEventListener("mouseleave", handleLeave);
        });
      };
    }
  }, []);

  return cursorRef;
}
