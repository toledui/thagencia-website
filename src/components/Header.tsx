"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  siteTitle?: string | null;
  logoUrl?: string | null;
};

export function Header({ siteTitle, logoUrl }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Portafolio", href: "/proyectos" },
    { label: "Agencia", href: "/agencia" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
  ];

  const serviceItems = [
    { label: "Diseño Web", href: "/servicios/diseno-web" },
    { label: "Desarrollo a la Medida", href: "/servicios/desarrollo-web" },
    { label: "Posicionamiento SEO", href: "/servicios/posicionamiento-seo" },
  ];

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
          ${
            isScrolled
              ? "bg-white/90 dark:bg-neutral-950/80 backdrop-blur-md border-neutral-200 dark:border-white/5 py-4"
              : "bg-transparent border-transparent py-6"
          }
        `}
      >
        <div className="max-w-7xl w-full mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center cursor-pointer group z-50">
            {logoUrl ? (
              <a href="/" className="relative w-40 md:w-56 h-12 md:h-16 transition-transform duration-300 hover:scale-105">
                <Image
                  src={logoUrl}
                  alt={siteTitle ?? "Logo THagencia"}
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 160px, 224px"
                  priority
                />
              </a>
            ) : (
              <div className="text-2xl font-black text-neutral-900 dark:text-white transition-colors">
                <span className="text-orange-600">TH</span>agencia
              </div>
            )}
          </div>

          {/* DESKTOP MENU - Visible solo en LG (1024px) en adelante */}
          <div className="hidden lg:flex items-center gap-10">
            <div className={`flex gap-8 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
              isScrolled 
                ? "text-neutral-600 dark:text-neutral-400" 
                : "text-neutral-300"
            }`}>
              {menuItems.map((item, idx) => (
                <Fragment key={item.href}>
                  <a
                    href={item.href}
                    className="relative overflow-hidden group py-2 transition-colors duration-300 text-neutral-700 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isScrolled ? "bg-orange-600" : "bg-orange-600"}`}></span>
                  </a>

                  {idx === 0 && (
                    <div ref={servicesRef} className="relative group">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center gap-1 relative overflow-hidden py-2 transition-colors duration-300 text-neutral-700 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-orange-500 group text-xs font-bold uppercase tracking-[0.2em]"
                      >
                        Servicios
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isScrolled ? "bg-orange-600" : "bg-orange-600"}`}></span>
                      </button>

                      {/* Dropdown Menu */}
                      {isServicesOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl overflow-hidden z-50">
                          {serviceItems.map((service, serviceIdx) => (
                            <a
                              key={service.href}
                              href={service.href}
                              onClick={() => setIsServicesOpen(false)}
                              className={`block px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 dark:text-white hover:bg-orange-600 hover:text-white transition-colors ${
                                serviceIdx !== serviceItems.length - 1 ? "border-b border-neutral-100 dark:border-neutral-800" : ""
                              }`}
                            >
                              {service.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            <div className={`h-6 w-px ${isScrolled ? "bg-neutral-200 dark:bg-white/10" : "bg-white/20"}`}></div>

            <ThemeToggle />
          </div>

          {/* MOBILE/TABLET TOGGLE - Visible en pantallas menores a LG */}
          {/* CAMBIO: md:hidden -> lg:hidden */}
          <div className="flex items-center gap-4 lg:hidden z-50">
            <ThemeToggle />
            
            <button
              className="p-2 transition-colors duration-300 text-neutral-900 dark:text-white hover:text-orange-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`
            fixed inset-0 z-40 bg-white dark:bg-neutral-950 flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"}
        `}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-600/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center gap-2">
            <span className="text-orange-600 font-mono text-xs tracking-[0.3em] uppercase mb-4">
                // Navegación
            </span>
            
            <div className="flex flex-col gap-6 text-center">
            {menuItems.map((item, idx) => (
              <Fragment key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative text-4xl md:text-5xl font-black text-neutral-900 dark:text-white transition-colors tracking-tighter"
                  style={{ transitionDelay: `${100 + idx * 50}ms` }}
                >
                  <span className="relative z-10 group-hover:text-orange-600 transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="absolute top-0 left-0 w-full text-neutral-200 dark:text-neutral-800 -z-10 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 select-none blur-sm">
                    {item.label}
                  </span>
                </a>

                {idx === 0 && (
                  <div className="pt-4">
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="group relative text-4xl md:text-5xl font-black text-neutral-900 dark:text-white transition-colors tracking-tighter flex items-center justify-center gap-2"
                    >
                      <span className="relative z-10 group-hover:text-orange-600 transition-colors duration-300">
                        Servicios
                      </span>
                      <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                      <span className="absolute top-0 left-0 w-full text-neutral-200 dark:text-neutral-800 -z-10 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 select-none blur-sm">
                        Servicios
                      </span>
                    </button>

                    {/* Submenu Mobile */}
                    {isMobileServicesOpen && (
                      <div className="mt-6 flex flex-col gap-4 px-6 py-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                        {serviceItems.map((service) => (
                          <a
                            key={service.href}
                            href={service.href}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileServicesOpen(false);
                            }}
                            className="text-lg font-bold text-neutral-900 dark:text-white hover:text-orange-600 transition-colors"
                          >
                            {service.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 opacity-70">
                <div className="w-12 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    Querétaro, México
                </p>
                <a href="mailto:ventas@thagencia.com" className="text-sm font-bold text-neutral-900 dark:text-white underline decoration-orange-500">
                    ventas@thagencia.com
                </a>
            </div>
        </div>
      </div>
    </>
  );
}