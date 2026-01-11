import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteInfo } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Términos y Condiciones | THagencia",
  description:
    "Términos y condiciones de servicio de THagencia. Cotizaciones, pagos, propiedad intelectual, garantía y soporte.",
  alternates: {
    canonical: "https://thagencia.com/terminos-y-condiciones",
  },
  openGraph: {
    title: "Términos y Condiciones | THagencia",
    description:
      "Conoce los términos y condiciones de contratación de servicios con THagencia.",
    url: "https://thagencia.com/terminos-y-condiciones",
    type: "article",
  },
};

export default async function TerminosYCondicionesPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      <main className="pt-28 md:pt-32 pb-20 px-6 md:px-16 lg:px-20 max-w-5xl mx-auto">
        <header className="mb-10">
          <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase block mb-3">
            // Legal
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            Términos y Condiciones de Servicio
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Última actualización: 11 de enero de 2026
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed text-neutral-900 dark:text-neutral-200">
          <p>
            Para efectos de contratación de cualquiera de los servicios prestados por THagencia, el cliente acepta
            plenamente los siguientes términos y condiciones desde el momento en que aprueba una cotización o realiza
            el pago de un anticipo.
          </p>

          <h2>1. Cotizaciones y Alcance del Proyecto</h2>

          <h3>Vigencia</h3>
          <p>
            El costo del proyecto es el especificado en la cotización formal enviada al cliente. La vigencia de dicha
            oferta se detalla en el documento; transcurrido ese plazo, los precios están sujetos a cambios.
          </p>

          <h3>Alcance</h3>
          <p>
            El costo no incluye implementaciones especiales, funcionalidades extra o secciones no mencionadas
            explícitamente en la cotización.
          </p>

          <h3>Paquetes</h3>
          <p>
            Al contratar un precio por "Paquete", el costo es fijo. No se aplicarán descuentos si el cliente decide
            no utilizar alguno de los elementos incluidos (ej. no requerir hosting o dominio). Si se solicitan
            elementos por separado, se cotizarán a su precio de lista individual.
          </p>

          <h3>Cambios en Requerimientos</h3>
          <p>
            Secciones o requerimientos adicionales solicitados una vez iniciado el proyecto serán cotizados por
            separado de acuerdo con su complejidad y tiempo de desarrollo.
          </p>

          <h2>2. Pagos y Cancelaciones</h2>

          <h3>Inicio del Proyecto</h3>
          <p>
            El trabajo comienza una vez aprobada la cotización, entregada la información necesaria por parte del
            cliente y confirmado el pago del anticipo.
          </p>

          <h3>Política de Reembolso</h3>
          <p>
            En caso de que el proyecto sea cancelado o abandonado por el cliente, los pagos realizados con
            anterioridad (anticipos) no son reembolsables, ya que cubren el tiempo de consultoría, apartado de
            recursos y configuración inicial.
          </p>

          <h3>Reactivación</h3>
          <p>
            Si el cliente desea retomar un proyecto cancelado o pausado fuera del tiempo estipulado, este deberá ser
            cotizado nuevamente o sujetarse a las tarifas vigentes.
          </p>

          <h2>3. Tiempos de Entrega, Feedback y Abandono de Proyecto</h2>

          <h3>Retroalimentación</h3>
          <p>
            Una vez enviados los avances o propuestas, el cliente cuenta con un máximo de 1 semana (7 días naturales)
            para enviar su retroalimentación.
          </p>

          <h3>Ausencia de respuesta</h3>
          <p>
            Si no se recibe respuesta en este lapso, se dará por aceptado el avance y se continuará con la siguiente
            etapa para cumplir con los tiempos de entrega.
          </p>

          <h3>Suspensión por falta de seguimiento</h3>
          <p>
            Si el proyecto se extiende fuera del tiempo acordado debido a la falta de respuesta del cliente, el
            proyecto quedará suspendido automáticamente.
          </p>

          <h3>Abandono y Penalización</h3>
          <ul>
            <li>Normalmente, un proyecto web estándar tiene una duración estimada de 2 a 3 semanas.</li>
            <li>
              Si el cliente deja de dar seguimiento por 1 mes, el proyecto se considera abandonado y cancelado.
            </li>
            <li>
              En este caso, THagencia conservará los derechos sobre el dominio (si fue contratado por nosotros) como
              compensación por los recursos asignados. Si el cliente desea recuperar el dominio o los archivos,
              deberá negociar su liberación directamente con THagencia.
            </li>
            <li>
              Dentro del mes siguiente a la suspensión, el cliente podrá reactivar el proyecto cubriendo una
              penalización del 10% extra sobre el costo total del proyecto.
            </li>
          </ul>

          <h2>4. Propiedad Intelectual y Entregables</h2>

          <h3>Transferencia de Derechos</h3>
          <p>
            Los derechos de autor, propiedad intelectual, códigos fuente y diseños desarrollados por THagencia serán
            transferidos al cliente únicamente una vez liquidado el 100% del costo del proyecto. Hasta ese momento,
            THagencia retiene la propiedad total.
          </p>

          <h3>Hosting y Dominio</h3>
          <p>
            Si el servicio incluye hosting y dominio, estos son propiedad del cliente, siempre y cuando se haya
            cubierto el costo total del proyecto.
          </p>

          <h2>5. Hosting, Dominios y Servicios de Terceros</h2>

          <h3>Responsabilidad en Hosting Externo</h3>
          <p>
            Si el cliente provee su propio hosting y dominio, THagencia no se hace responsable del rendimiento,
            velocidad o caídas del servidor. Garantizamos buenas prácticas de código, pero la infraestructura es
            responsabilidad del proveedor externo.
          </p>

          <h3>Correos Electrónicos</h3>
          <p>
            El servicio de email corporativo depende del proveedor de hosting. THagencia no es responsable de la
            estabilidad, entrega o filtros de spam de dicho servicio, aunque brindaremos recomendaciones de los
            mejores proveedores.
          </p>

          <h3>Copias de Seguridad (Backups)</h3>
          <p>
            THagencia no incluye un servicio de respaldos automáticos o recurrentes ni se hace responsable por pérdida
            de información debida a fallas del hosting. Al finalizar el proyecto, entregamos un respaldo (backup) del
            sitio funcional. Si el cliente requiere un plan de respaldos automáticos, este se cotizará como un
            servicio adicional.
          </p>

          <h3>Licencias y Plugins</h3>
          <p>
            Si el proyecto requiere software de pago (plugins, temas, APIs), la adquisición de la licencia es
            responsabilidad del cliente, a menos que se especifique lo contrario (uso de licencias GPL o compartidas).
          </p>

          <h2>6. Garantía, Soporte y Mantenimiento</h2>

          <h3>Periodo de Garantía</h3>
          <p>
            Se incluye soporte técnico durante 1 año exclusivamente para la solución de fallas ("bugs") o errores
            imputables al desarrollo original.
          </p>

          <h3>Exclusiones de Garantía</h3>
          <ul>
            <li>
              El mantenimiento (actualización de contenidos, cambio de imágenes, textos nuevos) no está incluido y se
              cotiza por separado.
            </li>
            <li>
              Pérdida de Garantía: Si el cliente o un tercero ajeno a THagencia realiza modificaciones en el código,
              estructura o instala plugins que generen conflictos, la garantía y el soporte quedan anulados
              automáticamente.
            </li>
            <li>Cualquier reparación requerida por manipulación de terceros tendrá un costo adicional.</li>
          </ul>

          <h2>7. Términos Específicos para Servicios Mensuales (SEO, ADS, Marketing)</h2>
          <p>Para servicios de pago recurrente (SEO, Google/Meta Ads), aplican las siguientes condiciones:</p>

          <h3>Pagos</h3>
          <p>Los servicios se pagan 100% por anticipado mes a mes.</p>

          <h3>Inversión Publicitaria</h3>
          <p>
            El costo de nuestros servicios (honorarios de gestión) no incluye el presupuesto a invertir en las
            plataformas (saldo para Google o Facebook), salvo que la cotización indique explícitamente lo contrario.
          </p>

          <h3>Renovación</h3>
          <p>
            Es responsabilidad del cliente solicitar y pagar la renovación del servicio. Si no se recibe el pago,
            THagencia dará por terminada la gestión.
          </p>

          <h3>Tiempos</h3>
          <ul>
            <li>La primera semana de una campaña nueva se dedica a análisis, configuración y diseño.</li>
            <li>Los reportes de resultados se envían 2 días hábiles después del cierre de mes.</li>
          </ul>

          <h3>Garantías de Resultados</h3>
          <ul>
            <li>
              <strong>SEO:</strong> Garantizamos trabajar para posicionar palabras clave en el TOP 10, pero no podemos
              garantizar un número específico de visitas o ventas, ya que esto depende de factores externos y del
              mercado.
            </li>
            <li>
              <strong>Conversión:</strong> No garantizamos un número específico de "leads" o cierres de venta, ya que
              esto depende de la oferta comercial del cliente y su equipo de ventas. Nuestras proyecciones se basan en
              datos históricos y experiencia, pero son estimaciones.
            </li>
            <li>
              <strong>Garantía de Satisfacción:</strong> Si no está satisfecho con el trabajo realizado (entregables y
              gestión), ofrecemos una devolución del 50% del costo mensual de nuestros honorarios (no aplica sobre el
              saldo gastado en publicidad).
            </li>
          </ul>

          <h2>8. Limitación de Responsabilidad</h2>
          <p>
            THagencia no será responsable por daños indirectos, incidentales o consecuenciales, incluyendo pérdida de
            datos, lucro cesante o pérdida de ingresos relacionados con el uso de nuestros servicios o fallas en
            servicios de terceros (hosting, pasarelas de pago, etc.). Nuestra responsabilidad financiera se limita
            únicamente al monto pagado por el cliente por los servicios contratados.
          </p>

          <h2>9. Privacidad</h2>
          <p>
            THagencia recopila, almacena y utiliza datos personales conforme a nuestra Política de Privacidad,
            garantizando la confidencialidad y seguridad de la información.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
