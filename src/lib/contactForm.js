/**
 * Envío del formulario de contacto.
 *
 * La lógica vive acá, separada del componente, por dos razones:
 *   1. Es lo único de la feature que se puede verificar de forma determinística sin
 *      navegador (ver tools/verify-contact.mjs). El componente es cáscara.
 *   2. El contrato con Web3Forms queda en un solo lugar, con nombres de campo que no
 *      se pueden cambiar por accidente: `email` ES el reply-to, `subject` arma el
 *      asunto del mail y `botcheck` es el honeypot.
 *
 * Contrato verificado en la documentación oficial (no inventado):
 *   POST https://api.web3forms.com/submit
 *   200 {success:true} · 400 cliente · 429 rate limit · 500 servidor
 *   Con `Accept: application/json` responde JSON; sin eso hace un redirect 303.
 */
import { CONTACT_FORM_ENDPOINT, WEB3FORMS_ACCESS_KEY } from '../data/site';

/**
 * Arma el cuerpo del POST. Función pura: recibe los valores y el token del captcha,
 * devuelve el objeto que viaja. Testeable sin red.
 */
export function buildContactPayload(values, captchaToken) {
    const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: values.name,
        // Web3Forms toma `email` como reply-to: así Daniel responde directo desde Gmail.
        email: values.email,
        subject: values.subject,
        message: values.message,
        // Honeypot: si un bot lo completa, Web3Forms descarta el envío. Vacío en humanos.
        botcheck: '',
    };

    if (captchaToken) {
        payload['h-captcha-response'] = captchaToken;
    }

    return payload;
}

/**
 * Manda el mensaje. Nunca lanza: cualquier falla (red caída, 400, quota) vuelve como
 * `{ ok: false, message }` para que la UI pueda mostrarla y ofrecer el correo como
 * salida alternativa. Un formulario de contacto que falla en silencio pierde el
 * mensaje y nadie se entera.
 */
export async function sendContactMessage(values, captchaToken, { fetchImpl = fetch } = {}) {
    try {
        const response = await fetchImpl(CONTACT_FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(buildContactPayload(values, captchaToken)),
        });

        const data = await response.json().catch(() => null);

        if (response.ok && data?.success) {
            return { ok: true, message: data?.message || '' };
        }

        return { ok: false, message: data?.message || `HTTP ${response.status}` };
    } catch {
        return { ok: false, message: 'network' };
    }
}
