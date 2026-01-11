import { useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

interface UseReCaptchaOptions {
  action?: string;
}

/**
 * Hook para ejecutar reCAPTCHA Enterprise
 * @param action - Acción identificadora (ej: "CONTACT_FORM", "PRICING_INQUIRY")
 * @returns Función que ejecuta reCAPTCHA y retorna el token
 */
export function useReCaptcha({ action = 'form_submission' }: UseReCaptchaOptions = {}) {
  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_KEY;
      
      if (!siteKey) {
        console.error('reCAPTCHA Enterprise key is not configured');
        return null;
      }

      if (!window.grecaptcha?.enterprise?.execute) {
        console.error('reCAPTCHA Enterprise script not loaded');
        return null;
      }

      const token = await window.grecaptcha.enterprise.execute(siteKey, {
        action,
      });

      return token;
    } catch (error) {
      console.error('Error executing reCAPTCHA:', error);
      return null;
    }
  }, [action]);

  return executeRecaptcha;
}
