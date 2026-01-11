"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useReCaptcha } from "@/hooks/useReCaptcha";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const executeRecaptcha = useReCaptcha({ action: "CONTACT_FORM" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha();
      
      if (!recaptchaToken) {
        throw new Error("Error de verificación reCAPTCHA");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al enviar el mensaje"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* NOMBRE */}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
          Nombre Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300"
        />
      </div>

      {/* TELÉFONO */}
      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+52 1 969 697 6675"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300"
        />
      </div>

      {/* EMPRESA */}
      <div>
        <label htmlFor="company" className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
          Empresa (Opcional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nombre de tu empresa"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300"
        />
      </div>

      {/* MENSAJE */}
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Cuéntanos sobre tu proyecto o necesidad..."
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300 resize-none"
        />
      </div>

      {/* ESTADO MENSAJES */}
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            ¡Mensaje enviado exitosamente! Te contactaremos pronto.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium text-red-800 dark:text-red-300">
            {errorMessage}
          </p>
        </div>
      )}

      {/* BOTÓN ENVIAR */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {status === "loading" ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Enviar Mensaje
          </>
        )}
      </button>

      {/* PRIVACIDAD */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
        Al enviar este formulario, aceptas nuestra{" "}
        <a href="/aviso-de-privacidad" className="underline hover:text-orange-600 transition-colors">
          política de privacidad
        </a>
        .
      </p>
    </form>
  );
}
