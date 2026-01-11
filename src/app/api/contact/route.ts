import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

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
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 8px;">
          <h2 style="color: #ff6b35; margin-bottom: 20px;">Nuevo Mensaje de Contacto</h2>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0 0 15px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 0 0 15px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 0 0 15px 0;"><strong>Teléfono:</strong> ${phone}</p>` : ""}
            ${company ? `<p style="margin: 0 0 15px 0;"><strong>Empresa:</strong> ${company}</p>` : ""}
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            
            <h3 style="color: #1f2937; margin: 15px 0 10px 0;">Mensaje:</h3>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; font-size: 12px; color: #6b7280;">
            <p style="margin: 0;">Responder a: <a href="mailto:${email}" style="color: #ff6b35;">${email}</a></p>
            <p style="margin: 5px 0 0 0;">Enviado desde: THagencia - Sistema de Contacto</p>
          </div>
        </div>
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
    console.error("Error al enviar email:", error);
    return NextResponse.json(
      { error: "Error al procesar el formulario" },
      { status: 500 }
    );
  }
}
