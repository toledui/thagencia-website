"use client";

import { useRef, useLayoutEffect } from "react";
import { services } from "@/lib/content";
import { CheckCircle, ArrowRight, Code2, Layers, LineChart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  // Creamos un array de referencias para controlar cada tarjeta individualmente
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Detectar si es pantalla móvil o tablet vertical (lg: 1024px)
      const isSmallScreen = window.innerWidth < 1024;

      // Animación del Header (Título)
      gsap.from(".service-header-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // LÓGICA DEL EFECTO STACKING CON PIN - Solo en pantallas XL
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const nextCard = cardsRef.current[index + 1];

        // Calculamos la altura del contenido de la tarjeta
        const cardHeight = card.offsetHeight;
        const screenHeight = window.innerHeight;
        
        // Si el contenido es más alto que la pantalla, damos más tiempo para ver todo
        const scrollDistance = Math.max(cardHeight, screenHeight);
        
        // Pin solo si existe una tarjeta siguiente Y es pantalla XL
        if (nextCard && !isSmallScreen) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top top+=80px",
              end: `+=${scrollDistance * 0.8}`,
              pin: true,
              pinSpacing: false,
              scrub: 1.2,
            }
          });
        }

        if (!nextCard) return;

        // Transformación solo en pantallas XL
        if (isSmallScreen) return;

        // Transformación de la tarjeta actual cuando la siguiente entra
        gsap.to(card, {
          scale: 0.85,
          opacity: 0.4,
          filter: "blur(5px)",
          rotateZ: -2,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top center+=120",
            end: "top center-=100",
            scrub: 1.2,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Función para asignar refs al array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      id="servicios"
      className="py-32 px-6 md:px-20 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-24 md:text-center max-w-3xl mx-auto">
          <span className="service-header-anim text-orange-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
            // Soluciones Integrales
          </span>
          <h2 className="service-header-anim text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 leading-tight">
            LOS 3 PILARES DEL{' '}<br />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              ÉXITO DIGITAL
            </span>
          </h2>
          <p className="service-header-anim text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
            Hemos simplificado nuestra oferta en tres áreas maestras. Cubrimos todo el ciclo de vida digital de tu negocio.
          </p>
        </div>

        {/* Contenedor de Tarjetas */}
        <div className="relative">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              totalServices={services.length}
              setRef={addToRefs}
            />
          ))}
        </div>
      </div>
      
      {/* Espaciador final para permitir scroll */}
      <div style={{ height: "50px" }} />
    </section>
  );
}

function ServiceCard({ 
  service, 
  index, 
  totalServices,
  setRef
}: { 
  service: (typeof services)[0]; 
  index: number;
  totalServices: number;
  setRef: (el: HTMLDivElement | null) => void;
}) {

  // Iconos
  const getIcon = (id: string) => {
    switch (id) {
      case "01": return <Code2 className="w-8 h-8 text-white" />;
      case "02": return <Layers className="w-8 h-8 text-white" />;
      case "03": return <LineChart className="w-8 h-8 text-white" />;
      default: return <Code2 className="w-8 h-8 text-white" />;
    }
  };

  return (
    <article
      ref={setRef}
      className="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl transition-all will-change-transform bg-white dark:bg-neutral-950 mb-6 md:mb-0"
      style={{ 
        // No sticky, el pinning lo hace GSAP
        zIndex: index + 1 
      }}
    >
      <div className="p-8 md:p-14 relative h-full min-h-[300px] md:min-h-[550px] flex flex-col justify-center">
        
        {/* Fondo decorativo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-600/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* IDENTIDAD */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20">
                  {getIcon(service.id)}
                </div>
                <span className="text-5xl font-black text-neutral-200 dark:text-neutral-800 tracking-tighter">
                  {service.id}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <h4 className="text-lg text-orange-600 font-semibold mb-6 tracking-wide">
                {service.subtitle}
              </h4>
              
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8">
                {service.desc}
              </p>

              <a href={service.link} className="inline-flex items-center gap-3 text-neutral-900 dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-600 transition-colors group">
                Ver Detalles
                <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:border-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>

          {/* DETALLES Y TAGS */}
          <div className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-8 border border-neutral-100 dark:border-neutral-800 flex flex-col justify-center">
            
            {/* Beneficios */}
            <div className="mb-8">
              <h5 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                Beneficios Clave
              </h5>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 w-full my-6"></div>

            {/* Tags (Alcance) */}
            <div>
              <h5 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                Alcance del Servicio
              </h5>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-orange-600 dark:hover:border-orange-600 hover:text-orange-600 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </article>
  );
}