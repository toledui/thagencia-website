"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Mail, MapPin, Calendar, Facebook, Youtube } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-anim", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="bg-gradient-to-b from-orange-600 to-orange-700 dark:from-neutral-900 dark:to-neutral-950 text-white pt-32 pb-10 px-6 md:px-20 relative overflow-hidden transition-colors duration-300 border-t border-neutral-800"
    >
      {/* Fondo Abstracto */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] border-[40px] border-white dark:border-white rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-1/4 bottom-0 w-[300px] h-[300px] bg-white/20 dark:bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          
          {/* Columna Izquierda: CTA y SEO */}
          <div className="footer-anim">
            
            {/* CAMBIO CLAVE: Este texto pequeño ahora es tu H2 PODEROSO */}
            <h2 className="text-lg font-mono text-white/80 mb-3 tracking-widest uppercase">
              // Agencia de Desarrollo Web en Querétaro
            </h2>
            
            {/* El texto gigante se convierte en un DIV decorativo (para no diluir el SEO) */}
            <div className="text-[13vw] lg:text-8xl font-black leading-none tracking-tight mb-6 text-white" aria-hidden="true">
              HABLEMOS
            </div>
            
            <p className="text-lg max-w-md opacity-90 leading-relaxed text-white/90">
              Agenda una llamada estratégica de 30 minutos. Analizaremos tu situación actual y te mostraremos cómo podemos escalar tu negocio con tecnología.
            </p>
          </div>

          {/* Columna Derecha: Tarjeta de Contacto */}
          <div className="footer-anim footer-card bg-white dark:bg-neutral-800 text-black dark:text-white p-8 md:p-10 shadow-2xl rounded-3xl transition-colors duration-300 border border-transparent dark:border-neutral-700">
            <h3 className="text-2xl font-black mb-8">Contáctanos Hoy</h3>
            
            <div className="space-y-6 mb-8">
              {/* Email */}
              <a
                href="mailto:ventas@thagencia.com"
                className="flex items-center gap-4 text-lg hover:text-orange-600 dark:hover:text-orange-500 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                </div>
                <span className="font-medium">ventas@thagencia.com</span>
              </a>

              {/* Ubicación */}
              <div className="flex items-start gap-4 text-lg">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <div className="font-medium">El Marqués, Querétaro</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">México</div>
                </div>
              </div>
            </div>
            
            {/* Botón CTA Principal */}
            <Link 
                href="/contacto"
                className="w-full bg-black dark:bg-neutral-950 text-white py-4 px-6 font-bold tracking-wider hover:bg-orange-600 dark:hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-3 group rounded-xl shadow-lg"
            >
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              AGENDAR LLAMADA
            </Link>
          </div>
        </div>

        {/* Sección Inferior: Legal y Redes */}
        <div className="border-t border-white/20 dark:border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-white/80">
          
          {/* Copyright */}
          <div className="text-center md:text-left font-medium">
            © {new Date().getFullYear()} THagencia. Hecho en Querétaro para el mundo.
          </div>

          {/* Enlaces Legales (Vital para E-E-A-T) */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/aviso-de-privacidad" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                Aviso de Privacidad
            </Link>
            <Link href="/aviso-de-cookies" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                Cookies
            </Link>
            <Link href="/terminos-y-condiciones" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                Términos y Condiciones
            </Link>
          </div>

          {/* Redes Sociales */}
          <div className="flex gap-4">
            <SocialLink href="https://www.facebook.com/thagencia.qro" icon={<Facebook className="w-5 h-5" />} label="Facebook" />
            <SocialLink href="https://www.youtube.com/@WebDevLuis" icon={<Youtube className="w-5 h-5" />} label="YouTube" />
            <SocialLink 
                href="https://www.tiktok.com/@thagencia?_r=1&_t=ZS-92xnCNwO0R6" 
                icon={
                    // Icono de TikTok personalizado (Lucide no lo trae por defecto en versiones viejas)
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                } 
                label="TikTok" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Subcomponente para iconos sociales limpios
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all duration-300"
        >
            {icon}
        </a>
    );
}