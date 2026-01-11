"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Code2, TrendingUp } from "lucide-react";
import gsap from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada del título con split text effect
      gsap.from(".hero-title-word", {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      });

      // Fade in para subtítulo y CTAs
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
      });

      // Contadores numéricos
      const counters = heroRef.current?.querySelectorAll<HTMLElement>(
        ".hero-counter"
      );

      counters?.forEach((counter) => {
        const target = counter.dataset.target || "0";
        const isPercent = target.includes("%");
        const isPlus = target.includes("+");
        const numericValue = parseInt(target.replace(/\D/g, "")) || 0;

        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 1.8,
            delay: 1,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              const current = Math.ceil(Number(counter.textContent || 0));
              if (isPercent) {
                counter.textContent = `${current}%`;
              } else if (isPlus) {
                counter.textContent = `+${current}`;
              } else {
                counter.textContent = `${current}`;
              }
            },
          }
        );
      });

      // Animación parallax en scroll
      gsap.to(".hero-bg-shape", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-20 pt-32 pb-16 overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-300"
    >
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-bg-shape absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-600/10 to-purple-600/10 dark:from-orange-600/10 dark:to-purple-600/10 rounded-full blur-3xl" />
        <div className="hero-bg-shape absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-orange-500/5 to-pink-500/5 dark:from-orange-500/5 dark:to-pink-500/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center pt-8">
        {/* Pretitle */}
        <div className="flex items-center justify-center gap-2 mb-2 hero-subtitle">
          <Code2 className="w-4 h-4 text-orange-600" />
          <h2 className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase">
            INGENIERÍA DE SOFTWARE & ESTRATEGIA
          </h2>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1] text-neutral-900 dark:text-white transition-colors duration-300"
        >
          <span className="block hero-title-word">Agencia de Diseño </span>
          <span className="block hero-title-word">y Desarrollo de </span>
          <span className="block hero-title-word">Páginas Web en </span>
          <span className="block hero-title-word text-orange-600">Querétaro</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-12 transition-colors duration-300">
          Somos <strong className="text-neutral-900 dark:text-white font-semibold transition-colors duration-300">THagencia</strong>, una agencia de <strong className="text-neutral-900 dark:text-white">desarrollo web con base en Querétaro</strong>, enfocada en crear experiencias web a medida e interactivas para empresas en crecimiento y establecidas.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="/servicios"
            className="hero-cta group px-8 py-4 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-bold text-lg hover:border-orange-600 hover:text-orange-600 dark:hover:border-orange-600 dark:hover:text-orange-600 transition-all duration-300 flex items-center gap-3 cursor-pointer rounded-xl"
          >
            Nuestros Servicios
          </a>
        </div>
      </div>
    </section>
  );
}
