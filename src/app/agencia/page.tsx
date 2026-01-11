import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgencyContent } from "@/components/AgencyContent";
import { getSiteInfo } from "@/lib/wordpress";
import { AgencyFAQ } from "@/components/AgencyFAQ";

export const metadata: Metadata = {
  title: "Agencia | Sobre nosotros - THagencia",
  description:
    "Conoce a THagencia: ingeniería digital con visión de negocio. Liderado por Luis Toledo, Full Stack Developer con más de 8 años de experiencia.",
  keywords: [
    "Agencia desarrollo web Querétaro",
    "Sobre THagencia",
    "Luis Toledo Full Stack",
    "Ingeniería de software",
  ],
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luis Toledo",
  jobTitle: "Fundador & Lead Full Stack Developer",
  url: "https://thagencia.com/agencia",
  image: "https://thagencia.com/uploads/images/luistoledo.jpg",
  sameAs: [
    "https://www.linkedin.com/in/luis-antonio-t-98693998",
    "https://github.com/toledui",
  ],
  worksFor: {
    "@type": "Organization",
    name: "THagencia",
  },
  description:
    "Desarrollador Full Stack y emprendedor con más de 8 años de experiencia en arquitectura de software y sistemas ERP/CRM.",
};

export default async function AgencyPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen text-neutral-900 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />
      <AgencyContent />
      <div className="mt-24">
            <AgencyFAQ />
        </div>
      <Footer />
    </div>
  );
}
