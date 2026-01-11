import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteInfo } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Política de Cookies | THagencia",
  description:
    "Información completa sobre las cookies que utilizamos en THagencia.com: técnicas, análisis, funcionalidad y publicitarias.",
  alternates: {
    canonical: "https://thagencia.com/aviso-de-cookies",
  },
  openGraph: {
    title: "Política de Cookies | THagencia",
    description:
      "Conoce qué cookies usamos y cómo administrarlas en tu navegador.",
    url: "https://thagencia.com/aviso-de-cookies",
    type: "article",
  },
};

export default async function AvisoDeCookiesPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      <main className="pt-28 md:pt-32 pb-20 px-6 md:px-16 lg:px-20 max-w-5xl mx-auto">
        <header className="mb-10">
          <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase block mb-3">// Legal</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Política de Cookies</h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Última actualización: 11 de enero de 2026
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed text-neutral-900 dark:text-neutral-200">
          <p>
            En <strong>THagencia.com</strong>, utilizamos cookies para facilitar el uso de nuestra página web y adaptar su contenido 
            para que te resulte más útil. A continuación, te informamos qué son las cookies, qué tipos utilizamos y cómo puedes configurarlas.
          </p>

          <h2>1. ¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, tablet o móvil) cuando los visitas. 
            No son virus ni programas maliciosos; su función es "recordar" tus acciones y preferencias (como inicio de sesión, idioma, tamaño de letra 
            y otras preferencias de visualización) durante un período de tiempo, para que no tengas que volver a configurarlas cada vez que regresas al sitio.
          </p>

          <h2>2. ¿Qué tipos de cookies utilizamos?</h2>
          <p>En este sitio web utilizamos los siguientes tipos de cookies:</p>

          <h3>Cookies Técnicas (Necesarias)</h3>
          <p>
            Son aquellas imprescindibles para que la web funcione correctamente. Incluyen, por ejemplo, cookies que permiten iniciar sesión en áreas seguras, 
            recordar los artículos en un carrito de compras o gestionar la seguridad del sitio. Sin estas cookies, el sitio web no puede funcionar adecuadamente.
          </p>

          <h3>Cookies de Análisis o Medición</h3>
          <p>
            Nos permiten entender cómo interactúan los visitantes con nuestro sitio web (cuántas personas nos visitan, qué páginas son las más populares, etc.). 
            Esta información es anónima y nos ayuda a mejorar continuamente nuestra estructura y contenido. (Ej. Google Analytics).
          </p>

          <h3>Cookies de Funcionalidad</h3>
          <p>
            Permiten recordar información para que accedas al servicio con determinadas características que pueden diferenciar tu experiencia de la de otros usuarios, 
            como el idioma o el número de resultados a mostrar.
          </p>

          <h3>Cookies Publicitarias (Marketing)</h3>
          <p>
            Son aquellas que almacenan información del comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, 
            lo que permite desarrollar un perfil específico para mostrar publicidad en función del mismo (Ej. Píxel de Meta/Facebook).
          </p>

          <h2>3. Relación de Cookies de Terceros</h2>
          <p>
            Este sitio web puede utilizar servicios de terceros que recopilan información con fines estadísticos y de uso de la web. En concreto, usamos servicios de:
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Para analizar el tráfico web.</li>
            <li><strong>Chat en vivo/WhatsApp:</strong> Para mantener la funcionalidad del chat de soporte.</li>
            <li><strong>Google Maps:</strong> Para mostrar nuestra ubicación.</li>
          </ul>

          <h2>4. ¿Cómo administrar o desactivar las cookies?</h2>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador:
          </p>
          <ul>
            <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
            <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y seguridad &gt; Cookies y datos del sitio.</li>
            <li><strong>Safari:</strong> Preferencias &gt; Privacidad.</li>
            <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio.</li>
          </ul>
          <p>
            <strong>Ten en cuenta</strong> que si desactivas las cookies, algunas funcionalidades del sitio web podrían quedar deshabilitadas 
            o no funcionar correctamente.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
