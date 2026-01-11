"use client";

import { RefObject } from "react";

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[]; // Características principales (beneficios)
  tags: string[];     // Tipos de proyectos (palabras clave SEO)
  link: string;       // Para el futuro enlace individual
}

export interface PortfolioProject {
  id: string;
  client: string;
  category: string;
  image: string;
  size: "small" | "large" | "wide";
}

export interface FAQItem {
  q: string;
  a: string;
}

export const services: ServiceItem[] = [
  {
    id: "01",
    title: "Diseño de Páginas Web",
    subtitle: "Experiencias Digitales que Venden",
    desc: "Más que estética, diseñamos herramientas de conversión. Desde una Landing Page para campañas agresivas hasta plataformas educativas complejas. Todo optimizado para Core Web Vitals.",
    features: [
      "Diseño UX/UI centrado en el usuario",
      "Velocidad de carga < 1s (Google PageSpeed)",
      "Arquitectura de información persuasiva",
    ],
    tags: [
      "Landing Pages",
      "E-commerce (Shopify/Woo)",
      "Sitios Corporativos",
      "Academias Online (LMS)",
      "Directorios Web",
      "Blogs de Alto Tráfico"
    ],
    link: "/servicios/diseno-web"
  },
  {
    id: "02",
    title: "Desarrollo Web a la Medida",
    subtitle: "Desarrollamos sistemas que impulsan tu negocio",
    desc: "Digitalizamos la operación de tu empresa. Desarrollamos el cerebro digital que tu negocio necesita para escalar, conectar áreas y eliminar el trabajo manual repetitivo.",
    features: [
      "Arquitectura Escalable en la Nube (AWS/Vercel/VPS)",
      "Seguridad de datos",
      "Integración total con tus herramientas actuales",
    ],
    tags: [
      "Sistemas ERP a la medida",
      "CRM Personalizados",
      "Plataformas SaaS",
      "Integración de APIs",
      "Sistemas de Facturación CFDI",
      "Apps Progresivas (PWA)"
    ],
    link: "/servicios/desarrollo-web"
  },
  {
    id: "03",
    title: "Posicionamiento SEO",
    subtitle: "Dominio y Autoridad en Google",
    desc: "El tráfico orgánico es el activo más valioso. Implementamos estrategias holísticas que combinan la parte técnica, la semántica y la autoridad de dominio para superar a tu competencia.",
    features: [
      "Auditoría Técnica Forense",
      "Estrategia de Contenidos (Cluster temático)",
      "Reportes de rendimiento en tiempo real",
    ],
    tags: [
      "SEO On-Page Técnico",
      "SEO Off-Page (Linkbuilding)",
      "SEO Local (Google Maps)",
      "AEO (Optiminización para IA)",
      "Redacción SEO Semántica",
      "Recuperación de Penalizaciones"
    ],
    link: "/servicios/posicionamiento-seo"
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    client: "Kada Construction",
    category: "Sitio Web Corporativo",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop",
    size: "large",
  },
  {
    id: "2",
    client: "Voyage",
    category: "E-commerce Experience",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop",
    size: "small",
  },
  {
    id: "3",
    client: "TKM Contact Center",
    category: "Optimización SEO & Rediseño",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    size: "small",
  },
  {
    id: "4",
    client: "Sistema ERP Industrial",
    category: "Desarrollo de Software",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
    size: "wide",
  },
];

export const faqs: FAQItem[] = [
  {
    q: "¿Por qué elegir una agencia local en Querétaro como THagencia?",
    a: "Porque entendemos el mercado local del Bajío. No somos una plantilla genérica; somos partners tecnológicos que conocemos la competencia, la industria local y las oportunidades de crecimiento en la región.",
  },
  {
    q: "¿Qué diferencia hay entre una Página Web y Desarrollo de Sistemas?",
    a: "Una Página Web es principalmente informativa o de marketing (tu escaparate digital). El Desarrollo Web implica crear sistemas funcionales (software) que resuelven problemas operativos de tu negocio, como un sistema de inventarios, un portal de clientes o un CRM.",
  },
  {
    q: "¿Cuánto tiempo tarda en posicionar mi sitio con SEO?",
    a: "El SEO es una carrera de resistencia, no de velocidad. Típicamente, los resultados tangibles comienzan a verse entre el mes 3 y 6, consolidándose como un activo digital de alto valor a largo plazo que reduce tu dependencia de la publicidad pagada.",
  },
];
