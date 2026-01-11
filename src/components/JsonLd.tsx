const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://thagencia.com/#organization",
    name: "THagencia",
    url: "https://thagencia.com",
    logo: "https://thagencia.com/wp-content/uploads/2023/09/logo-THagencia2.png",
    image: "https://thagencia.com/wp-content/uploads/2023/07/logo-THagencia-new-one.png",
    description:
      "Agencia de desarrollo web y posicionamiento SEO en Querétaro. Expertos en Sistemas a la Medida y Marketing Digital.",
    telephone: "+529656976675",
    address: {
      "@type": "PostalAddress",
      addressLocality: "El Marqués",
      addressRegion: "Querétaro",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.588793",
      longitude: "-100.389888",
    },
    areaServed: ["Querétaro", "El Marqués", "México"],
    priceRange: "$$",
    sameAs: [
      "https://facebook.com/thagenciaqro",
      "https://instagram.com/thagenciaqro",
    ],
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd;
