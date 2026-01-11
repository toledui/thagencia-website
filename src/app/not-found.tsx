import Link from "next/link";
import { ArrowRight, Home, MessageCircle, Compass } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteInfo } from "@/lib/wordpress";

export default async function NotFound() {
  const siteInfo = await getSiteInfo().catch(() => null);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300 flex flex-col">
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-2xl text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[180px] font-black bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent leading-none animate-pulse">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase block mb-4">
              // Error
            </span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
              Página No Encontrada
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl leading-relaxed">
              Lo sentimos, la página que buscas no existe o ha sido movida. Pero no te preocupes, 
              aquí te dejamos algunas opciones para continuar.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-600/30 group"
            >
              <Home className="w-5 h-5" />
              <span>Ir al Inicio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold rounded-xl transition-all"
            >
              <Compass className="w-5 h-5" />
              <span>Nuestros Servicios</span>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-600"></span>
              Páginas Útiles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog"
                className="flex items-center justify-between p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors group"
              >
                <span className="font-semibold">Blog & Recursos</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/proyectos"
                className="flex items-center justify-between p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors group"
              >
                <span className="font-semibold">Portafolio</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/agencia"
                className="flex items-center justify-between p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors group"
              >
                <span className="font-semibold">Sobre Nosotros</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/contacto"
                className="flex items-center justify-between p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors group"
              >
                <span className="font-semibold">Contacto</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              ¿Necesitas ayuda directa?
            </p>
            <a
              href="https://wa.me/5219656976675?text=Hola,%20tengo%20una%20pregunta%20sobre%20THagencia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#25D366] hover:bg-[#20BA58] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-[#25D366]/30 group"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contáctanos por WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
