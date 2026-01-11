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
 * @param expectedAction - Acción esperada (ej: "CONTACT_FORM", "PRICING_INQUIRY")
 * @returns true si el token es válido y pasa el threshold de puntuación
 */
async function verifyRecaptchaToken(token: string, expectedAction: string = ""): Promise<boolean> {
  try {
    if (!token) {
      console.warn("No reCAPTCHA token provided");
      return false;
    }

    const apiKey = process.env.RECAPTCHA_ENTERPRISE_API_KEY;
    const projectId = process.env.RECAPTCHA_ENTERPRISE_PROJECT_ID;

    if (!apiKey || !projectId) {
      console.error("reCAPTCHA API key or project ID not configured");
      // En desarrollo sin configurar, aceptamos el token
      return process.env.NODE_ENV !== "production";
    }

    // Payload para Google reCAPTCHA Enterprise API
    const assessmentPayload = {
      event: {
        token: token,
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_KEY,
        expectedAction: expectedAction,
      },
    };

    // Llamada a Google reCAPTCHA Enterprise API
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assessmentPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("reCAPTCHA verification error:", errorData);
      return false;
    }

    const assessment = await response.json();

    // Verificar si el token es válido
    if (!assessment.tokenProperties?.valid) {
      console.warn("reCAPTCHA token validation failed:", assessment.tokenProperties);
      return false;
    }

    // Verificar que la acción coincide (si se especificó)
    if (expectedAction && assessment.tokenProperties.action !== expectedAction) {
      console.warn("reCAPTCHA action mismatch. Expected:", expectedAction, "Got:", assessment.tokenProperties.action);
      // En desarrollo, podemos ser más permisivos
      if (process.env.NODE_ENV === "production") {
        return false;
      }
    }

    // Verificar el score de riesgo (0.0 = bot seguro, 1.0 = interacción legítima)
    const riskScore = assessment.riskAnalysis?.score || 0;
    const riskReason = assessment.riskAnalysis?.reasons || [];
    
    console.log(`reCAPTCHA assessment - Score: ${riskScore}, Reasons: ${riskReason.join(", ")}`);

    // Threshold: aceptar si el score es >= 0.5 (50% legítimo)
    // Ajusta este valor según tu necesidad de seguridad
    const threshold = 0.5;
    if (riskScore < threshold) {
      console.warn(`reCAPTCHA risk score too low: ${riskScore} < ${threshold}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    // En desarrollo, aceptamos si no está configurado
    return process.env.NODE_ENV !== "production";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, recaptchaToken } = body;

    // Validar reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Token de verificación reCAPTCHA faltante" },
        { status: 400 }
      );
    }

    // Verificar el token con acción esperada CONTACT_FORM
    const isValidToken = await verifyRecaptchaToken(recaptchaToken, "CONTACT_FORM");
    if (!isValidToken) {
      return NextResponse.json(
        { error: "Verificación reCAPTCHA falló" },
        { status: 403 }
      );
    }

    // Validaciones básicas
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Email para THagencia (recepción)
    const mailToTHagencia = {
      from: process.env.SMTP_FROM || "noreply@thagencia.com",
      to: "ventas@thagencia.com",
      subject: `🔔 Nuevo contacto: ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo Mensaje de Contacto</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Encabezado -->
            <div style="background: white; border-radius: 12px 12px 0 0; padding: 40px 30px; text-align: center; border-bottom: 4px solid #ff6b35;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800;">
                <span style="color: #ff6b35;">TH</span><span style="color: #1f2937;">agencia</span>
              </h1>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">🎯 Nuevo Mensaje de Contacto</p>
            </div>

            <!-- Contenido Principal -->
            <div style="background: white; padding: 30px; border-bottom: 1px solid #e5e7eb;">
              <!-- Información del Contacto -->
              <div style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #ff6b35;">
                <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">👤 Información del Cliente</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Nombre</span>
                      <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 16px; font-weight: 600;">${name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">📧 Email</span>
                      <p style="margin: 5px 0 0 0;">
                        <a href="mailto:${email}" style="color: #ff6b35; text-decoration: none; font-weight: 600; font-size: 15px;">${email}</a>
                      </p>
                    </td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">📱 Teléfono</span>
                      <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 15px; font-weight: 600;">${phone}</p>
                    </td>
                  </tr>
                  ` : ""}
                  ${company ? `
                  <tr>
                    <td style="padding: 10px 0;">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">🏢 Empresa</span>
                      <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 15px; font-weight: 600;">${company}</p>
                    </td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <!-- Mensaje -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">💬 Mensaje</h2>
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="color: #1f2937; margin: 0; line-height: 1.8; font-size: 15px; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- CTA Responder -->
              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re: Tu mensaje en THagencia" style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;">
                  ↩️ Responder al Cliente
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #1f2937; color: white; padding: 25px 30px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 15px 0; font-size: 13px; opacity: 0.8;">
                <strong style="color: #ff6b35;">Recibido desde:</strong> Sistema de Contacto Web
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.6;">
                © ${new Date().getFullYear()} THagencia | Desarrollo Web & SEO en Querétaro
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: email,
    };

    // Email de confirmación para el cliente
    const mailToClient = {
      from: process.env.SMTP_FROM || "noreply@thagencia.com",
      to: email,
      subject: "Hemos recibido tu mensaje - THagencia",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 8px;">
          <div style="margin-bottom: 30px;">
            <h1 style="color: #ff6b35; font-size: 28px; margin: 0;">THagencia</h1>
          </div>
          
          <h2 style="color: #1f2937; margin-bottom: 15px;">¡Gracias por contactarnos!</h2>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; line-height: 1.6;">
            <p>Hola ${name},</p>
            <p>Hemos recibido tu mensaje exitosamente. Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo pronto.</p>
            <p>Si tu consulta es urgente, también puedes contactarnos a través de WhatsApp:</p>
            <p style="text-align: center; margin: 20px 0;">
              <a href="https://wa.me/5219656976675" style="display: inline-block; background: #25d366; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">Contactar por WhatsApp</a>
            </p>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 14px;">Nuestros datos:</h3>
            <p style="margin: 5px 0; font-size: 13px; color: #4b5563;">📧 ventas@thagencia.com</p>
            <p style="margin: 5px 0; font-size: 13px; color: #4b5563;">📱 +52 1 965 697 6675</p>
            <p style="margin: 5px 0; font-size: 13px; color: #4b5563;">📍 El Marqués, Querétaro, México</p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              © ${new Date().getFullYear()} THagencia. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `,
    };

    // Enviar ambos emails
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
    console.error("Error detallado al enviar email:", errorMessage);
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
