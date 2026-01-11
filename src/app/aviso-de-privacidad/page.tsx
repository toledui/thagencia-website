import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteInfo } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | THagencia",
  description:
    "Conoce cómo THagencia recolecta, usa y protege tus datos personales. Derechos ARCO, cookies, transferencias y contacto.",
  alternates: {
    canonical: "https://thagencia.com/aviso-de-privacidad",
  },
  openGraph: {
    title: "Aviso de Privacidad | THagencia",
    description:
      "Detalles sobre el uso y protección de datos personales por THagencia, incluyendo derechos ARCO y tecnologías de rastreo.",
    url: "https://thagencia.com/aviso-de-privacidad",
    type: "article",
  },
};

export default async function AvisoDePrivacidadPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      <main className="pt-28 md:pt-32 pb-20 px-6 md:px-16 lg:px-20 max-w-5xl mx-auto">
        <header className="mb-10">
          <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase block mb-3">// Legal</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Aviso de Privacidad Integral</h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Última actualización: 11 de enero de 2026
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed text-neutral-900 dark:text-neutral-200">
          <p>
            THagencia, mejor conocido comercialmente como <strong>THagencia</strong>, con domicilio fiscal en Villas la Piedad,
            El Marqués, Qro., C.P. 76246, y portal de internet <a href="https://www.thagencia.com">www.thagencia.com</a>,
            es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:
          </p>

          <h2>1. ¿Para qué fines utilizaremos sus datos personales?</h2>
          <p>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades:</p>
          <h3>A) Finalidades Primarias (Necesarias para el servicio):</h3>
          <ul>
            <li>Respuesta a mensajes recibidos a través del formulario de contacto.</li>
            <li>Prestación de cualquier servicio de desarrollo, diseño o consultoría solicitado.</li>
            <li>Procesamiento, seguimiento y envío de productos adquiridos en nuestra tienda en línea.</li>
            <li>Facturación y cobro.</li>
          </ul>

          <h3>B) Finalidades Secundarias (No necesarias, pero útiles para mejorar su experiencia):</h3>
          <ul>
            <li>Para mejorar la experiencia de compra en el futuro.</li>
            <li>Envío de promociones, boletines informativos y contenido de valor a su correo electrónico.</li>
            <li>Análisis demográfico para mejorar nuestra propuesta de valor.</li>
          </ul>
          <p>
            En caso de que no desee que sus datos personales sean tratados para estos fines secundarios, usted puede presentar
            desde este momento un escrito vía correo electrónico manifestando lo anterior. La negativa para el uso de sus datos
            personales para estas finalidades no podrá ser un motivo para que le neguemos los servicios y productos que solicita
            o contrata con nosotros.
          </p>

          <h2>2. ¿Qué datos personales utilizaremos para estos fines?</h2>
          <p>
            Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:
          </p>
          <ul>
            <li>Datos de identificación y contacto (Nombre, dirección, teléfono, correo electrónico).</li>
            <li>Datos académicos.</li>
            <li>Datos migratorios.</li>
          </ul>

          <h2>3. Transferencia de Datos Personales</h2>
          <p>Le informamos que sus datos personales son compartidos dentro y fuera del país con las siguientes entidades:</p>
          <ul>
            <li>
              <strong>Empresas de Paquetería y Logística:</strong> Con la finalidad de realizar el envío y entrega de los productos adquiridos en nuestra tienda en línea.
            </li>
            <li>
              <strong>Autoridades Fiscales:</strong> Para el cumplimiento de las obligaciones fiscales (facturación).
            </li>
          </ul>
          <p>
            Si usted no manifiesta su negativa para dichas transferencias, entenderemos que nos lo ha otorgado.
          </p>

          <h2>4. ¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso? (Derechos ARCO)</h2>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).
          </p>
          <p>Para ejercer sus derechos ARCO, envíe un correo a <a href="mailto:ventas@thagencia.com">ventas@thagencia.com</a> con:</p>
          <ul>
            <li>Nombre completo del titular.</li>
            <li>Domicilio.</li>
            <li>Teléfono.</li>
            <li>Correo electrónico usado en este sitio web.</li>
            <li>Copia de una identificación oficial adjunta (INE, Pasaporte, Cédula).</li>
            <li>Asunto del correo: «Derechos ARCO».</li>
            <li>
              Descripción clara del objeto del escrito (Revocación del consentimiento, Notificación de uso indebido, o ejercicio específico de Acceso, Rectificación, Cancelación u Oposición).
            </li>
            <li>
              En caso de Rectificación de datos personales, indique la modificación exacta y anexe la documentación soporte.
            </li>
          </ul>
          <p>
            <strong>Plazo de respuesta:</strong> hasta 5 días hábiles. <strong>Medio de comunicación:</strong> respuesta al mismo correo electrónico desde el cual se envió la petición.
          </p>
          <p>
            Nota: Para ciertos fines, la revocación de su consentimiento puede implicar que no podamos seguir prestando el servicio solicitado o concluir la relación.
          </p>

          <h2>5. El uso de tecnologías de rastreo en nuestro portal de internet</h2>
          <p>
            En nuestra página utilizamos cookies, web beacons u otras tecnologías para monitorear su comportamiento como usuario y brindarle una mejor experiencia. Los datos que obtenemos incluyen:
          </p>
          <ul>
            <li>Identificadores, nombre de usuario y contraseñas de sesión.</li>
            <li>Idioma preferido.</li>
            <li>Región de acceso.</li>
            <li>Tipo de navegador y sistema operativo.</li>
            <li>Fecha y hora de inicio y fin de sesión.</li>
            <li>Páginas visitadas y búsquedas realizadas.</li>
            <li>Listas y hábitos de consumo en sitios de compras.</li>
          </ul>
          <p>
            Puede deshabilitar estas tecnologías desde la configuración de su navegador. Si lo hace, algunas funciones personalizadas podrían no estar disponibles.
          </p>

          <h2>6. ¿Cómo puede conocer los cambios en este aviso de privacidad?</h2>
          <p>
            Este aviso puede sufrir modificaciones derivadas de cambios legales, necesidades internas, prácticas de privacidad o ajustes en nuestro modelo de negocio. Publicaremos cualquier actualización en <a href="https://www.thagencia.com">www.thagencia.com</a>.
          </p>

          <h2>7. Autoridad</h2>
          <p>
            Si usted considera que su derecho a la protección de datos personales ha sido vulnerado por alguna conducta u omisión de nuestra parte, puede interponer una inconformidad o denuncia ante el <strong>INAI</strong>.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
