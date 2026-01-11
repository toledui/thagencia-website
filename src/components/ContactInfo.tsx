import { Mail, Phone, MapPin, Facebook, Youtube, Music4 } from "lucide-react";

export function ContactInfo() {
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "ventas@thagencia.com",
      href: "mailto:ventas@thagencia.com",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+52 1 965 697 6675",
      href: "https://wa.me/5219656976675?text=Hola%20THagencia%2C%20me%20gustaría%20conocer%20más%20sobre%20vuestros%20servicios",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "El Marqués, Querétaro, México",
      href: "https://maps.google.com/?q=El+Marqués,Querétaro",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/thagencia.qro",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://www.youtube.com/@WebDevLuis",
    },
    {
      icon: Music4,
      label: "TikTok",
      href: "https://www.tiktok.com/@thagencia",
    },
  ];

  return (
    <div className="space-y-12">
      {/* INFORMACIÓN DE CONTACTO */}
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
          Formas de contacto
        </h3>
        <div className="grid gap-6">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Ubicación" ? "_blank" : undefined}
                rel={item.label === "Ubicación" ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* HORARIO */}
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
          Horario de atención
        </h3>
        <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold text-neutral-900 dark:text-white">Lunes - Viernes</span>
              <span className="text-neutral-600 dark:text-neutral-400">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-neutral-900 dark:text-white">Sábado - Domingo</span>
              <span className="text-neutral-600 dark:text-neutral-400">Cerrado</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
              Respondemos durante el horario de negocio. Para consultas urgentes, usa WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* REDES SOCIALES */}
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
          Síguenos en redes
        </h3>
        <div className="flex gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="w-12 h-12 rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white hover:border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
