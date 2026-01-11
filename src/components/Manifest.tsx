"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ManifestProps = {
  logoUrl?: string | null;
};

export function Manifest({ logoUrl }: ManifestProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(".manifest-image", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal
      gsap.from(".manifest-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifest-text",
          start: "top 80%",
        },
      });

      // Stats animation
      gsap.from(".stat-item", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
        },
      });

      // Contadores numéricos
      const counters = sectionRef.current?.querySelectorAll<HTMLElement>(
        ".manifest-counter"
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
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: ".stats-grid",
              start: "top 80%",
            },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="agencia"
      className="py-24 md:py-32 px-6 md:px-20 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-600/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image / Visual */}
          <div className="relative h-[300px] lg:h-[600px] group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-neutral-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />

            <div className="manifest-image relative h-full w-full bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05]" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="relative w-64 h-32 md:w-80 md:h-40 transform transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={
                      logoUrl ??
                      "https://thagencia.com/wp-content/uploads/2023/09/logo-THagencia2.png"
                    }
                    alt="THagencia - Agencia de Desarrollo Web y SEO en Querétaro"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain transition-all duration-300 opacity-90"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="manifest-text">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-orange-600" />
              <span className="text-orange-600 font-mono text-sm tracking-[0.2em] uppercase">
                Agencia Web con Propósito
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white leading-tight mb-6 transition-colors duration-300">
              MÁS QUE CÓDIGO,{' '}
              <br />{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                CREAMOS UN LEGADO DIGITAL.
              </span>
            </h2>

            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-6 transition-colors duration-300">
              <strong className="text-neutral-900 dark:text-white transition-colors duration-300">THagencia</strong> es una agencia dedicada al desarrollo de <strong>páginas web en Querétaro</strong>, enfocada en ofrecer soluciones que impulsen el crecimiento de tu negocio. Nuestro servicio abarca desde el diseño web a la medida hasta el <strong>posicionamiento SEO</strong> estratégico, asegurando que tu empresa destaque en Google y llegue a nuevos clientes reales.
            </p>

            <div className="relative border-l-4 border-orange-600 pl-6 py-2 my-8 bg-orange-50 dark:bg-orange-900/10 rounded-r-lg">
              <p className="text-neutral-800 dark:text-neutral-200 text-lg leading-relaxed font-medium italic">
                "Este proyecto está dedicado a la memoria de <strong>Aitana Toledo Hernández</strong> (QEPD), quien fue una inspiración y motivación constante para que THagencia siguiera creciendo. Gracias a su luz y legado, seguimos impulsando este proyecto con dedicación y compromiso."
              </p>
            </div>

            <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed font-medium transition-colors duration-300">
              No vendemos sitios web; construimos ecosistemas digitales preparados para escalar, optimizados para conversión y diseñados para dominar.
            </p>

            <div className="mt-8">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-neutral-900 dark:text-white font-bold hover:text-orange-600 transition-colors group border-b-2 border-orange-600 pb-1"
              >
                Conoce cómo trabajamos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="stats-grid grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
              <div className="stat-item">
                <div
                  className="text-4xl font-black text-orange-600 mb-2 manifest-counter"
                  data-target="300%"
                >
                  0%
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-500 uppercase tracking-wider transition-colors duration-300">ROI Promedio</div>
              </div>
              <div className="stat-item">
                <div
                  className="text-4xl font-black text-orange-600 mb-2 manifest-counter"
                  data-target="+100"
                >
                  0
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-500 uppercase tracking-wider transition-colors duration-300">Clientes</div>
              </div>
              <div className="stat-item">
                <div
                  className="text-4xl font-black text-orange-600 mb-2 manifest-counter"
                  data-target="8+"
                >
                  0
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-500 uppercase tracking-wider transition-colors duration-300">Años</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
