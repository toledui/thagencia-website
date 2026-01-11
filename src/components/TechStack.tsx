"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const technologies = [
  { name: "Node.js", src: "/uploads/images/nodejs.png" },
  { name: "Next.js", src: "/uploads/images/nextjs.png" },
  { name: "React", src: "/uploads/images/react.png" },
  { name: "Vue.js", src: "/uploads/images/vuejs.png" },
  { name: "Tailwind CSS", src: "/uploads/images/tailwind.png" },
  { name: "HTML5", src: "/uploads/images/html.png" },
  { name: "JavaScript", src: "/uploads/images/js.png" },
  { name: "PHP", src: "/uploads/images/php.png" },
  { name: "CodeIgniter", src: "/uploads/images/codeigniter.png" },
  { name: "Laravel", src: "/uploads/images/laravel.png" },
  { name: "Python", src: "/uploads/images/python.png" },
  { name: "WordPress", src: "/uploads/images/wordpress.webp" },
  { name: "Shopify", src: "/uploads/images/shopify.svg" },
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const track = container.querySelector(".marquee-track") as HTMLElement;
    
    if (!track) return;

    // Wait for layout (and images) to size the track correctly
    requestAnimationFrame(() => {
      const distance = track.scrollWidth / 2; // width of one full set (we render twice)
      if (!distance) return;

      // Wrap helper ensures continuous loop right-to-left without snapping back
      const wrapX = gsap.utils.wrap(-distance, 0);

      const tween = gsap.to(track, {
        x: -distance,
        duration: 24,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (value) => `${wrapX(parseFloat(value))}px`,
        },
      });

      return () => tween.kill();
    });

    return () => {
      gsap.killTweensOf(track);
    };
  }, []);

  return (
    <div className="py-16 border-t border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto mb-10 px-6">
        <p className="text-center text-sm font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-[0.3em]">
          // Tecnologías que dominamos
        </p>
      </div>
      
      <div ref={containerRef} className="relative overflow-hidden">
        <div className="marquee-track flex gap-10 will-change-transform px-4">
          {/* Render items twice for seamless loop */}
          {[...technologies, ...technologies].map((tech, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-orange-600 dark:hover:border-orange-600 transition-all duration-300 group"
            >
              {tech.src ? (
                <div className="relative h-8 w-8">
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    fill
                    sizes="32px"
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                </div>
              ) : (
                <span className="text-sm font-bold text-neutral-900 dark:text-white">
                  {tech.name}
                </span>
              )}
              <span className="font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Gradient fade edges */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent pointer-events-none transition-colors duration-300" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent pointer-events-none transition-colors duration-300" />
      </div>
    </div>
  );
}
