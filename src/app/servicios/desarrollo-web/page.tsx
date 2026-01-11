import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TechStack } from "@/components/TechStack"; // <--- Tu componente estrella
import { 
  ArrowRight, 
  Database, 
  Lock, 
  Server, 
  CheckCircle2, 
  Zap, 
  Shield,
  Smartphone,
  Globe,
  Cpu,
  Layers,
  Code2,
  HelpCircle
} from "lucide-react";
import { getSiteInfo } from "@/lib/wordpress";

// 1. METADATA: SEO para Software
export const metadata: Metadata = {
  title: "Desarrollo de Software a la Medida y Apps en Querétaro | THagencia",
  description: "Agencia de desarrollo de software en Querétaro. Creamos ERPs, CRMs, Plataformas SaaS y Apps Móviles escalables y seguras.",
  keywords: [
    "Desarrollo de software Querétaro",
    "Programación a la medida México",
    "Desarrollo de Apps Móviles",
    "Sistemas ERP web",
    "Plataformas SaaS",
    "Agencia de software boutique"
  ],
  alternates: { canonical: "https://thagencia.com/servicios/desarrollo-web" }
};

export default async function DesarrolloMedidaPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  // 2. SCHEMA: Software + Service + FAQ
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Desarrollo de Software a la Medida",
        "provider": { "@type": "ProfessionalService", "name": "THagencia", "image": "https://thagencia.com/logo.png" },
        "areaServed": { "@type": "City", "name": "Querétaro" },
        "description": "Ingeniería de software para automatización de procesos y creación de productos digitales."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Seré el dueño del código fuente?",
            "acceptedAnswer": { "@type": "Answer", "text": "Sí. A diferencia del modelo de renta, en nuestros desarrollos a la medida tú eres el dueño del 100% de la Propiedad Intelectual y el código fuente al finalizar el pago." }
          },
          {
            "@type": "Question",
            "name": "¿Qué pasa si el sistema falla después de la entrega?",
            "acceptedAnswer": { "@type": "Answer", "text": "Ofrecemos una garantía de corrección de bugs (errores) gratuita durante los primeros 3 meses. Además, ofrecemos pólizas de mantenimiento para soporte continuo." }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto tarda en desarrollarse una App o Sistema?",
            "acceptedAnswer": { "@type": "Answer", "text": "Un MVP (Producto Mínimo Viable) suele tomar entre 6 y 10 semanas. Sistemas empresariales complejos pueden llevar de 3 a 6 meses. Trabajamos con metodología Agile para entregarte avances cada 2 semanas." }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      
      {/* Inyección Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />
      
      {/* HERO SECTION: Adaptable y High Tech */}
      <section className="relative pt-40 pb-32 px-6 md:px-16 lg:px-20 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="absolute inset-0 bg-[size:44px_44px] 
            bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] 
            dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] 
            [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        </div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-orange-600/5 via-transparent to-transparent dark:from-orange-600/20 dark:via-transparent dark:to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400 text-sm font-bold tracking-widest uppercase mb-8">
                <Code2 className="w-4 h-4" />
                Ingeniería de Software
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1] text-neutral-900 dark:text-white">
               Software que se adapta a ti, <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-600">
                 No al revés.
               </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Cuando el Excel colapsa y las herramientas genéricas (SaaS) te quedan chicas, entramos nosotros. Construimos el <strong>cerebro digital</strong> de tu operación.
            </p>
            
            <a href="/contacto" className="inline-flex items-center gap-2 bg-orange-600 text-white px-10 py-5 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-2xl hover:shadow-orange-600/40 text-lg group hover:-translate-y-1">
               Cotizar Sistema a la Medida <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
            </a>
        </div>
      </section>

      {/* TECH STACK (Tu componente importado) */}
      <section className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-10">
            <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
                Arsenal Tecnológico Enterprise
            </h2>
        </div>
        {/* Aquí renderizamos tu carrusel */}
        <TechStack /> 
      </section>

      {/* TIPOS DE PROYECTOS (SOLUCIONES) */}
      <section className="py-24 bg-white dark:bg-neutral-950 px-6 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-neutral-900 dark:text-white">¿Qué construimos?</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
               Desde la automatización de procesos internos hasta productos digitales listos para el mercado masivo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             {/* Card 1: ERP/CRM */}
             <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-orange-600 transition-all group">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                   <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Sistemas ERP & CRM</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                   Plataformas centralizadas para gestionar inventarios, ventas, recursos humanos y logística. Conectamos todas las áreas de tu empresa en tiempo real para eliminar errores humanos y hojas de cálculo.
                </p>
                <ul className="space-y-2 text-sm text-neutral-500 font-medium">
                   <li>• Dashboards de BI en tiempo real</li>
                   <li>• Facturación automática</li>
                   <li>• Control de roles y permisos</li>
                </ul>
             </div>

             {/* Card 2: SaaS */}
             <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-orange-600 transition-all group">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                   <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Plataformas SaaS</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                   Si tienes una idea de startup, desarrollamos el Producto Mínimo Viable (MVP) y lo escalamos hasta producción. Arquitectura multi-tenant lista para cobrar suscripciones a tus usuarios.
                </p>
                <ul className="space-y-2 text-sm text-neutral-500 font-medium">
                   <li>• Pasarelas de pago recurrentes (Stripe)</li>
                   <li>• Onboarding de usuarios</li>
                   <li>• Arquitectura Multi-tenant</li>
                </ul>
             </div>

             {/* Card 3: Apps */}
             <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-orange-600 transition-all group">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                   <Smartphone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Apps Móviles (iOS/Android)</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                   Aplicaciones nativas o híbridas (React Native) para poner tu negocio en el bolsillo de tus clientes o empleados. Funcionalidad offline y notificaciones push.
                </p>
                <ul className="space-y-2 text-sm text-neutral-500 font-medium">
                   <li>• Publicación en App Store y Play Store</li>
                   <li>• Geolocalización y mapas</li>
                   <li>• Uso de cámara y sensores</li>
                </ul>
             </div>

             {/* Card 4: APIs */}
             <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-orange-600 transition-all group">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform">
                   <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">APIs & Integraciones</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                   Hacemos que tus sistemas "hablen" entre sí. Conectamos tu e-commerce con tu ERP, tu CRM con WhatsApp, o desarrollamos una API pública para tus socios.
                </p>
                <ul className="space-y-2 text-sm text-neutral-500 font-medium">
                   <li>• RESTful y GraphQL</li>
                   <li>• Webhooks en tiempo real</li>
                   <li>• Documentación Swagger/OpenAPI</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* OBSESIÓN TÉCNICA (Grid 3 cols) */}
      <section className="py-20 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-neutral-900 dark:text-white">Nuestra Obsesión Técnica</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all">
            <Database className="w-10 h-10 text-orange-600 mb-4"/>
            <h4 className="font-bold text-xl mb-3 text-neutral-900 dark:text-white">Arquitectura de Datos</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Diseñamos bases de datos (PostgreSQL, MongoDB) que soportan millones de registros sin latencia. Escalable horizontalmente en la nube.
            </p>
          </div>
          <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all">
            <Shield className="w-10 h-10 text-orange-600 mb-4"/>
            <h4 className="font-bold text-xl mb-3 text-neutral-900 dark:text-white">Seguridad Blindada</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Protección contra inyecciones SQL, XSS, CSRF. Encriptación de datos sensibles en reposo y en tránsito. Cumplimiento de estándares.
            </p>
          </div>
          <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all">
            <Server className="w-10 h-10 text-orange-600 mb-4"/>
            <h4 className="font-bold text-xl mb-3 text-neutral-900 dark:text-white">Escalabilidad Cloud</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Infraestructura Serverless en AWS o Vercel que crece automáticamente según la demanda. No pagues por servidores vacíos.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 md:px-16 lg:px-20 max-w-4xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-neutral-900 dark:text-white">Preguntas Frecuentes</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Despejamos tus dudas sobre el desarrollo a la medida.</p>
        </div>
        
        <div className="space-y-6">
            {[
                { 
                    q: "¿Seré el dueño del código fuente?", 
                    a: "Sí. A diferencia de las agencias que te 'rentan' el software, con THagencia tú eres el dueño legal del 100% de la Propiedad Intelectual y el código fuente una vez liquidado el proyecto." 
                },
                { 
                    q: "¿Qué pasa si el sistema falla después de la entrega?", 
                    a: "Tu inversión está protegida. Ofrecemos una garantía de corrección de bugs (errores) gratuita durante los primeros 3 meses posteriores al lanzamiento. Además, ofrecemos planes de mantenimiento opcionales." 
                },
                { 
                    q: "¿Cuánto cuesta un desarrollo a la medida?", 
                    a: "Depende totalmente de los requerimientos. Un sistema pequeño (ej. gestor de citas) puede iniciar en los $25,000 MXN, mientras que ERPs complejos pueden superar los $100,000 MXN. Necesitamos una reunión para cotizarte con exactitud." 
                },
                { 
                    q: "¿Qué metodología de trabajo usan?", 
                    a: "Usamos SCRUM (Agile). Dividimos el proyecto en 'Sprints' de 2 semanas. Al final de cada sprint, te mostramos avances funcionales para que puedas dar feedback temprano y evitar sorpresas al final." 
                }
            ].map((faq, i) => (
                <div key={i} className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-900/30 shadow-sm">
                    <h3 className="font-bold text-lg mb-3 flex items-start gap-3 text-neutral-900 dark:text-white">
                        <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        {faq.q}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 pl-9 leading-relaxed">
                        {faq.a}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-6 md:px-16 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Automatiza tu operación hoy</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Deja de usar Excel para todo. Obtén una consulta técnica gratuita y descubre cómo un sistema a la medida puede transformar tu negocio.
          </p>
          <a href="/contacto" className="inline-flex items-center gap-3 bg-orange-600 text-white px-10 py-5 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-600/30 text-lg group">
            Agendar Consulta Técnica <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}