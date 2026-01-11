import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Validar que las variables de entorno existan
const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Variable de entorno faltante: ${envVar}`);
  }
}

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_SECURE === "true", // true para 465, false para 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  logger: true, // Muestra logs
  debug: true,  // Modo debug activado
});

/**
 * Verifica el token de reCAPTCHA Enterprise contra Google
 * @param token - Token generado por grecaptcha.enterprise.execute()
 * @param expectedAction - AcciÃ³n esperada (ej: "CONTACT_FORM", "PRICING_INQUIRY")
 * @returns true si el token es vÃ¡lido y pasa el threshold de puntuaciÃ³n
 */
async function verifyRecaptchaToken(token: string, expectedAction: string = ""): Promise<boolean> {
  try {
    if (!token) return false;

    const apiKey = process.env.RECAPTCHA_ENTERPRISE_API_KEY;
    const projectId = process.env.RECAPTCHA_ENTERPRISE_PROJECT_ID;

    if (!apiKey || !projectId) {
      console.log("[reCAPTCHA] Credentials not set - dev mode");
      return process.env.NODE_ENV !== "production";
    }

    console.log("[reCAPTCHA] Calling Google API...");
    
    const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: { token, siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_KEY, expectedAction },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`[reCAPTCHA] API error ${response.status}: ${err.substring(0, 200)}`);
      return false;
    }

    const assessment = await response.json();
    if (!assessment.tokenProperties?.valid) {
      console.warn("[reCAPTCHA] Invalid token");
      return false;
    }

    const score = assessment.riskAnalysis?.score ?? 1.0;
    console.log(`[reCAPTCHA] Score: ${score}`);
    return score >= 0.5;
  } catch (err) {
    console.error("[reCAPTCHA] Error:", err);
    return process.env.NODE_ENV !== "production";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name,Correo, phone, company, message, recaptchaToken } = body;

    // Validar reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Token de verificaciÃ³n reCAPTCHA faltante" },
        { status: 400 }
      );
    }

    // Verificar el token con acciÃ³n esperada CONTACT_FORM
    const isValidToken = await verifyRecaptchaToken(recaptchaToken, "CONTACT_FORM");
    if (!isValidToken) {
      return NextResponse.json(
        { error: "VerificaciÃ³n reCAPTCHA fallÃ³" },
        { status: 403 }
      );
    }

    // Validaciones bÃ¡sicas
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // ValidarCorreo
    constCorreoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invÃ¡lido" },
        { status: 400 }
      );
    }

    //Correo para THagencia (recepciÃ³n)
    const mailToTHagencia = {
      from: process.env.SMTP_FROM || "noreply@thagencia.com",
      to: "ventas@thagencia.com",
      subject: ` Nuevo contacto: ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>NuevoMensaje de Contacto</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Encabezado -->
            <div style="background: white; border-radius: 12px 12px 0 0; padding: 40px 30px; text-align: center; border-bottom: 4px solid #ff6b35;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800;">
                <span style="color: #ff6b35;">TH</span><span style="color: #1f2937;">agencia</span>
              </h1>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">ðŸŽ¯NuevoMensaje de Contacto</p>
            </div>

            <!-- Contenido Principal -->
            <div style="background: white; padding: 30px; border-bottom: 1px solid #e5e7eb;">
              <!-- InformaciÃ³n del Contacto -->
              <div style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #ff6b35;">
                <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">ðŸ‘¤ InformaciÃ³n del Cliente</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Nombre</span>
                      <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 16px; font-weight: 600;">${name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">ðŸ“§Correo</span>
                      <p style="margin: 5px 0 0 0;">
                        <a href="mailto:${email}" style="color: #ff6b35; text-decoration: none; font-weight: 600; font-size: 15px;">${email}</a>
                      </p>
                    </td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">ðŸ“± TelÃ©fono</span>
                      <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 15px; font-weight: 600;">${phone}</p>
                    </td>
                  </tr>
                  ` : ""}
                  ${company ? `
                  <tr>
                    <td style="padding: 10px 0;">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">ðŸ¢Empresa</span>
                      <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 15px; font-weight: 600;">${company}</p>
                    </td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <!--Mensaje -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">ðŸ’¬Mensaje</h2>
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="color: #1f2937; margin: 0; line-height: 1.8; font-size: 15px; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- CTAResponder -->
              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re: TuMensaje en THagencia" style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;">
                  â†©ï¸Responder al Cliente
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #1f2937; color: white; padding: 25px 30px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 15px 0; font-size: 13px; opacity: 0.8;">
                <strong style="color: #ff6b35;">Recibido desde:</strong> Sistema de Contacto Web
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.6;">
                Â© ${new Date().getFullYear()} THagencia | Desarrollo Web & SEO en QuerÃ©taro
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo:Correo,
    };

    //Correo de confirmaciÃ³n para el cliente
    const mailToClient = {
      from: process.env.SMTP_FROM || "noreply@thagencia.com",
      to:Correo,
      subject: "Hemos recibido tuMensaje - THagencia",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 8px;">
          <div style="margin-bottom: 30px;">
            <h1 style="color: #ff6b35; font-size: 28px; margin: 0;">THagencia</h1>
          </div>
          
          <h2 style="color: #1f2937; margin-bottom: 15px;">Â¡Gracias por contactarnos!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; line-height: 1.6;">
            <p>Hola ${name},</p>
            <p>Hemos recibido tuMensaje exitosamente. Nuestro equipo revisarÃ¡ tu solicitud y se pondrÃ¡ en contacto contigo pronto.</p>
            <p>Si tu consulta es urgente, tambiÃ©n puedes contactarnos a travÃ©s de WhatsApp:</p>
            <p style="text-align: center; margin: 20px 0;">
              <a href="https://wa.me/5219656976675" style="display: inline-block; background: #25d366; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">Contactar por WhatsApp</a>
            </p>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 14px;">Nuestros datos:</h3>
            <p style="margin: 5px 0; font-size: 13px; color: #4b5563;">ðŸ“§ ventas@thagencia.com</p>
            <p style="margin: 5px 0; font-size: 13px; color: #4b5563;">ðŸ“± +52 1 965 697 6675</p>
            <p style="margin: 5px 0; font-size: 13px; color: #4b5563;">ðŸ“ El MarquÃ©s, QuerÃ©taro, MÃ©xico</p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              Â© ${new Date().getFullYear()} THagencia. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `,
    };

    // Enviar ambosCorreos
    await Promise.all([
      transporter.sendMail(mailToTHagencia),
      transporter.sendMail(mailToClient),
    ]);

    return NextResponse.json(
      { message: "Mensaje enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error detallado al enviarCorreo:", errorMessage);
    console.error("Stack:", error instanceof Error ? error.stack : "N/A");
    
    return NextResponse.json(
      { 
        error: "Error al procesar el formulario",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

