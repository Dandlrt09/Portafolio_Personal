import React, { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_EMAIL, HCAPTCHA_FREE_SITEKEY } from '../data/site';
import { sendContactMessage, buildSuccessMessage } from '../lib/contactForm';

const EMPTY = { name: '', email: '', subject: '', message: '' };

/**
 * Valida en el cliente. Devuelve un mapa campo → mensaje; vacío = todo bien.
 * Se valida acá y no con la validación nativa del navegador para poder traducir los
 * mensajes y anclarlos al mismo sistema visual que el resto del sitio.
 */
const validate = (values, t) => {
    const errors = {};

    for (const field of ['name', 'email', 'subject', 'message']) {
        if (!values[field].trim()) errors[field] = t.contact.form.required;
    }

    if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = t.contact.form.invalidEmail;
    }

    if (!errors.message && values.message.trim().length < 10) {
        errors.message = t.contact.form.shortMessage;
    }

    return errors;
};

const FIELD_CLASS =
    'w-full rounded-lg border bg-background/60 px-4 py-3 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40';

/**
 * Error de un campo. Vive a nivel de módulo a propósito: definir un componente dentro
 * del render lo recrea en cada pasada y le borra el estado (react-hooks/static-components).
 */
const FieldError = ({ field, error }) =>
    error ? (
        <p id={`contact-${field}-error`} className="mt-1.5 text-xs text-accent">
            {error}
        </p>
    ) : null;

const ContactForm = () => {
    const { t } = useLanguage();
    const copy = t.contact.form;

    const [values, setValues] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMessage, setErrorMessage] = useState('');
    // El correo del visitante se guarda aparte porque `values` se limpia al enviar, y el
    // mensaje de éxito tiene que poder nombrar a qué dirección va a llegar la respuesta.
    const [sentTo, setSentTo] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const captchaRef = useRef(null);

    const setField = (field) => (event) => {
        setValues((prev) => ({ ...prev, [field]: event.target.value }));
        setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = validate(values, t);
        if (!captchaToken) nextErrors.captcha = copy.captchaRequired;

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setStatus('idle');
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        const result = await sendContactMessage(values, captchaToken);

        if (result.ok) {
            setSentTo(values.email);
            setValues(EMPTY);
            setErrors({});
            setCaptchaToken('');
            captchaRef.current?.resetCaptcha();
            setStatus('success');
            return;
        }

        setErrorMessage(result.message);
        setStatus('error');
    };

    const fieldProps = (field) => ({
        id: `contact-${field}`,
        name: field,
        value: values[field],
        onChange: setField(field),
        'aria-invalid': errors[field] ? 'true' : undefined,
        'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
    });

    const fieldClass = (field) =>
        `${FIELD_CLASS} ${errors[field] ? 'border-accent/60' : 'border-white/10 focus:border-primary/50'}`;

    return (
        <form onSubmit={handleSubmit} noValidate className="text-left">
            <h3 className="mb-5 text-lg font-semibold text-text">{copy.title}</h3>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-text-muted">
                        {copy.name}
                    </label>
                    <input type="text" autoComplete="name" placeholder={copy.namePlaceholder} className={fieldClass('name')} {...fieldProps('name')} />
                    <FieldError field="name" error={errors.name} />
                </div>

                <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-text-muted">
                        {copy.email}
                    </label>
                    <input type="email" autoComplete="email" placeholder={copy.emailPlaceholder} className={fieldClass('email')} {...fieldProps('email')} />
                    <FieldError field="email" error={errors.email} />
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium text-text-muted">
                    {copy.subject}
                </label>
                <input type="text" placeholder={copy.subjectPlaceholder} className={fieldClass('subject')} {...fieldProps('subject')} />
                <FieldError field="subject" error={errors.subject} />
            </div>

            <div className="mt-4">
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-text-muted">
                    {copy.message}
                </label>
                <textarea rows={5} placeholder={copy.messagePlaceholder} className={`${fieldClass('message')} resize-y`} {...fieldProps('message')} />
                <FieldError field="message" error={errors.message} />
            </div>

            {/* Honeypot de Web3Forms: un humano no lo ve ni lo puede tabular. */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <div className="mt-5">
                <HCaptcha
                    ref={captchaRef}
                    sitekey={HCAPTCHA_FREE_SITEKEY}
                    reCaptchaCompat={false}
                    theme="dark"
                    onVerify={setCaptchaToken}
                    onExpire={() => setCaptchaToken('')}
                />
                {errors.captcha && <p className="mt-1.5 text-xs text-accent">{errors.captcha}</p>}
            </div>

            <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Send size={16} />
                {status === 'sending' ? copy.sending : copy.submit}
            </button>

            {/* Estado del envío. aria-live para que un lector de pantalla lo anuncie. */}
            <div role="status" aria-live="polite" className="mt-4">
                {status === 'success' && (
                    <p className="flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-text">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-secondary" />
                        <span>
                            <strong className="font-semibold">{copy.successTitle}</strong>{' '}
                            {buildSuccessMessage(copy.successBody, sentTo)}
                        </span>
                    </p>
                )}

                {status === 'error' && (
                    <p className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-text">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-accent" />
                        <span>
                            <strong className="font-semibold">{copy.errorTitle}.</strong> {copy.errorBody}{' '}
                            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline underline-offset-2">
                                {CONTACT_EMAIL}
                            </a>
                            {errorMessage ? <span className="sr-only"> ({errorMessage})</span> : null}
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default ContactForm;
