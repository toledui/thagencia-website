"use client";

import { useState } from "react";
import { Check, X, ArrowRight, X as CloseIcon } from "lucide-react";

// --- DATOS DE LOS PLANES ---
const plans = [
  {
    name: "Básico",
    price: "5,800",
    description: "Ideal para validar tu negocio o presencia personal.",
    features: [
      "Diseño One Page (Landing Page)",
      "3 Secciones Informativas",
      "Diseño Responsivo (Móvil/PC)",
      "Formulario de Contacto",
      "Botones a Redes Sociales",
      "Mapa de Ubicación",
      "Optimización de Imágenes",
      "1 Ronda de Revisiones",
      "Entrega en 10-15 días hábiles",
    ],
    notIncluded: ["Blog / Noticias", "Chat Automatizado", "SEO Avanzado"],
    recommended: false,
  },
  {
    name: "Emprendedor",
    price: "14,900",
    description: "El estándar para negocios que buscan crecer en serio.",
    features: [
      "Todo lo del plan Básico +",
      "Sitio Multi-página (hasta 5)",
      "Blog Autoadministrable (CMS)",
      "Optimización SEO On-Page",
      "Chat Flotante de WhatsApp",
      "Google Analytics & Pixel Meta",
      "Seguridad SSL & Anti-Spam",
      "Integración con CRM básico",
      "2 Rondas de Revisiones",
      "Entrega en 3-4 semanas",
    ],
    notIncluded: ["Estrategia SEO Mensual", "Auditoría de Competencia"],
    recommended: true, 
  },
  {
    name: "Empresarial",
    price: "25,900",
    description: "Dominio total de tu nicho con estrategia SEO agresiva.",
    features: [
      "Todo lo del plan Emprendedor +",
      "Hasta 10 Páginas Internas",
      "Auditoría Técnica SEO Forense",
      "Análisis de Competencia (SemRush)",
      "Optimización de Velocidad (99%)",
      "Estrategia de Palabras Clave",
      "Registro en Google My Business",
      "Soporte Prioritario 24/7",
      "3 Rondas de Revisiones",
      "Entrega en 4-6 semanas",
    ],
    notIncluded: [],
    recommended: false,
  },
];

// --- COMPONENTE DEL MODAL (FORMULARIO) ---
function LeadFormModal({ planName, isOpen, onClose }: { planName: string, isOpen: boolean, onClose: () => void }) {
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
        // Construimos el mensaje de WhatsApp (usar \n y codificar el texto)
        const whatsappMessage = `Hola THagencia, me interesa el *Paquete ${planName}*.\n\n📝 *Mis Datos:*\n👤 Nombre: ${name}\n📧 Correo: ${email}\n💬 Mensaje: ${message}`;
        
        // Redirigimos a WhatsApp con encodeURIComponent para preservar emojis y formato
        const whatsappUrl = `https://wa.me/5219656976675?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Opcional: Aquí podrías agregar una llamada a una API para guardar el lead en base de datos antes de redirigir.
        onClose();
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        alert("Error al procesar tu solicitud. Por favor intenta de nuevo.");
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 border border-neutral-200 dark:border-neutral-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Paso Final</span>
          <h3 className="text-2xl font-black text-neutral-900 dark:text-white mt-2">
            Interés en Paquete {planName}
          </h3>
          <p className="text-neutral-500 text-sm mt-2">
            Completa tus datos para iniciar la conversación por WhatsApp con un asesor experto.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">Nombre Completo</label>
            <input required type="text" name="name" placeholder="Ej. Juan Pérez" className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-neutral-900 focus:ring-0 transition-all outline-none text-neutral-900 dark:text-white" />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">Correo Electrónico</label>
            <input required type="email" name="email" placeholder="tu@correo.com" className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-neutral-900 focus:ring-0 transition-all outline-none text-neutral-900 dark:text-white" />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">Cuéntanos de tu proyecto</label>
            <textarea required name="message" rows={3} placeholder="Ej. Necesito una tienda para vender ropa..." className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-neutral-900 focus:ring-0 transition-all outline-none text-neutral-900 dark:text-white resize-none"></textarea>
          </div>

          <button type="submit" className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-600/30 flex items-center justify-center gap-2">
            Continuar a WhatsApp <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export function PricingTable() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 md:px-16 lg:px-20 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
      
      {/* Renderizado del Modal */}
      <LeadFormModal 
        planName={selectedPlan || ""} 
        isOpen={!!selectedPlan} 
        onClose={() => setSelectedPlan(null)} 
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-neutral-900 dark:text-white">
            Inversión Transparente
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Sin costos ocultos. Elige el paquete que mejor se adapte a la etapa actual de tu negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                plan.recommended
                  ? "bg-white dark:bg-neutral-900 border-orange-500 shadow-2xl shadow-orange-500/10 scale-100 lg:scale-105 z-10"
                  : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-orange-500/50"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg">
                  Más Vendido
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 h-10">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-neutral-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-neutral-500 font-medium">MXN</span>
              </div>

              <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all mb-8 ${
                  plan.recommended
                    ? "bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-orange-600/25"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                Elegir {plan.name} <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-4 flex-1">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Incluye:
                </p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-300 leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}

                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-50">
                    <div className="mt-1 w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-neutral-400" />
                    </div>
                    <span className="text-sm text-neutral-500 line-through leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 text-center">
                 <p className="text-xs text-neutral-400">
                    * Primer año de hosting gratis
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}