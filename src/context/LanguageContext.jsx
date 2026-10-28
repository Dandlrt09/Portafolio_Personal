/* eslint-disable react-refresh/only-export-components -- el provider y el hook viven
   juntos a propósito: son la misma API pública y separarlos obligaría a tocar cada import. */
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        hero: {
            badge: "Desarrollador de Soluciones de Datos e IA",
            title: "Daniel De los Ríos",
            subtitle: "Ingeniero Multimedia que construye aplicaciones de datos e IA de punta a punta — backend, frontend y el modelo en el medio. Del problema a la app que lo resuelve.",
            stackLabel: "Tecnologías principales",
            cta: "Ver proyectos",
            resume: "Ver CV"
        },
        nav: {
            projects: "Proyectos",
            about: "Sobre mí",
            contact: "Contacto",
            cv: "CV",
            switchTo: "English"
        },
        projects: {
            title: "Proyectos",
            featuredTitle: "Aplicaciones de datos e IA",
            featuredIntro: "Proyectos que construí de punta a punta: el problema, el stack y la decisión técnica detrás de cada uno.",
            analyticsTitle: "Analítica y BI",
            analyticsIntro: "Cuadros de mando y modelos predictivos sobre datos reales.",
            archiveTitle: "Análisis y resultados de proyectos",
            archiveNote: "Ejercicios individuales sobre datasets públicos, hechos para practicar el método completo: pregunta, limpieza, modelo o tablero, y una conclusión que se pueda defender. Sin cliente y sin equipo.",
            archiveShow: "Mostrar",
            archiveHide: "Ocultar",
            labels: {
                role: "Mi rol",
                decision: "Lo que hice",
                problem: "El problema",
                complexity: "Complejidad",
                stack: "Stack",
                approach: "Enfoque",
                insight: "Insight",
                close: "Cerrar",
                page: "Página",
                previous: "Anterior",
                next: "Siguiente"
            },
            viewRepo: "Ver código",
            viewDemo: "Ver demo",
            viewDashboard: "Ver dashboard",
            viewPdf: "Descargar PDF",
            viewReport: "Ver reporte",
            showMore: "Ver más",
            showLess: "Ver menos"
        },
        about: {
            title: "Sobre mí",
            description: "Vengo de Ingeniería Multimedia y eso define cómo trabajo: no me quedo en el modelo ni en la query. Pienso la arquitectura, escribo el backend, armo el frontend y me aseguro de que alguien que no sabe de datos pueda decidir con lo que ve.\n\nHoy construyo aplicaciones de datos e IA de punta a punta. En Datara el reto no fue la IA — fue el sandbox donde corre el código que la IA genera. En ANV·BAR fue llevar un catálogo real a producción con autenticación y políticas de acceso. Lo técnico y lo visual no son dos sombreros: son la misma conversación."
        },
        // The skill list, its groups and its levels live in src/data/skills.js:
        // a level is not language, and the ids must not change with the language.
        // Everything here is only the copy the section cannot derive.
        skills: {
            title: "Habilidades",
            lead: "Mi nivel real en cada habilidad, del 1 al 5, y el proyecto donde se puso a prueba.",
            railLabel: "Proyectos",
            minLevel: "Nivel mínimo",
            onlyHigh: "Sólo 4–5",
            idle: "Pasa el mouse por una habilidad para ver en qué proyectos vive, o por un proyecto para ver su stack completo.",
            levelLabel: (level) => `nivel ${level}/5`,
            inProjects: (count) => `${count} ${count > 1 ? 'proyectos' : 'proyecto'}:`,
            projectStack: (count) => `${count} tecnologías:`,
            noProject: "todavía sin proyecto que la respalde.",
            legend: "Cada segmento es un nivel, de 1 a 5. El círculo ◦ marca una habilidad que todavía no tiene proyecto que la respalde.",
            ariaLevel: (name, level) => `${name}, nivel ${level} de 5`,
            ariaProject: (name, count) => `${name}, ${count} tecnologías`
        },
        contact: {
            title: "Contacto",
            description: "¿Tienes un proyecto en mente, o buscas a alguien que construya la aplicación y no solo el modelo? Escríbeme.",
            cv: "Descargar CV",
            directTitle: "Escríbeme directo",
            form: {
                title: "Mándame un mensaje",
                name: "Nombre",
                namePlaceholder: "Tu nombre",
                email: "Tu correo",
                emailPlaceholder: "tu@ejemplo.com",
                subject: "Asunto",
                subjectPlaceholder: "¿De qué quieres hablar?",
                message: "Mensaje",
                messagePlaceholder: "Cuéntame en qué estás trabajando…",
                submit: "Enviar mensaje",
                sending: "Enviando…",
                successTitle: "¡Mensaje enviado!",
                successBody: "Me llegó tu mensaje. Te voy a responder a {email}. Gracias por escribir.",
                errorTitle: "No se pudo enviar",
                errorBody: "Algo falló del otro lado. Prueba de nuevo, o escríbeme directo a",
                required: "Este campo es obligatorio.",
                invalidEmail: "Escribe un correo válido.",
                shortMessage: "Cuéntame un poco más (mínimo 10 caracteres).",
                captchaRequired: "Confirma el captcha para enviar."
            }
        },
        footer: {
            rights: "Todos los derechos reservados."
        }
    },
    en: {
        hero: {
            badge: "Data & AI Solutions Developer",
            title: "Daniel De los Ríos",
            subtitle: "Multimedia Engineer building end-to-end data and AI applications — backend, frontend, and the model in between. From the problem to the app that solves it.",
            stackLabel: "Core technologies",
            cta: "View projects",
            resume: "View CV"
        },
        nav: {
            projects: "Projects",
            about: "About",
            contact: "Contact",
            cv: "CV",
            switchTo: "Español"
        },
        projects: {
            title: "Projects",
            featuredTitle: "Data & AI applications",
            featuredIntro: "Projects I built end to end: the problem, the stack, and the technical decision behind each one.",
            analyticsTitle: "Analytics & BI",
            analyticsIntro: "Dashboards and predictive models on real data.",
            archiveTitle: "Project analysis and results",
            archiveNote: "Individual exercises on public datasets, built to practise the whole method: question, cleaning, model or dashboard, and a conclusion that can be defended. No client and no team.",
            archiveShow: "Show",
            archiveHide: "Hide",
            labels: {
                role: "My role",
                decision: "What I did",
                problem: "The problem",
                complexity: "Complexity",
                stack: "Stack",
                approach: "Approach",
                insight: "Insight",
                close: "Close",
                page: "Page",
                previous: "Previous",
                next: "Next"
            },
            viewRepo: "View code",
            viewDemo: "View demo",
            viewDashboard: "View dashboard",
            viewPdf: "Download PDF",
            viewReport: "View report",
            showMore: "Show more",
            showLess: "Show less"
        },
        about: {
            title: "About",
            description: "I come from Multimedia Engineering, and that defines how I work: I don't stop at the model or the query. I design the architecture, write the backend, build the frontend, and make sure someone who doesn't know data can decide with what they see.\n\nToday I build end-to-end data and AI applications. At Datara the challenge wasn't the AI — it was the sandbox where the AI-generated code runs. At ANV·BAR it was taking a real catalogue to production with authentication and access policies. The technical and the visual aren't two hats: they're the same conversation."
        },
        // See the Spanish branch: the skill data lives in src/data/skills.js.
        skills: {
            title: "Skills",
            lead: "My real level in each skill, 1 to 5, and the project where it was tested.",
            railLabel: "Projects",
            minLevel: "Minimum level",
            onlyHigh: "Only 4–5",
            idle: "Hover a skill to see which projects it lives in, or a project to see its whole stack.",
            levelLabel: (level) => `level ${level}/5`,
            inProjects: (count) => `${count} ${count > 1 ? 'projects' : 'project'}:`,
            projectStack: (count) => `${count} technologies:`,
            noProject: "no project backs it yet.",
            legend: "Each segment is one level, 1 to 5. The ◦ mark flags a skill no project backs yet.",
            ariaLevel: (name, level) => `${name}, level ${level} of 5`,
            ariaProject: (name, count) => `${name}, ${count} technologies`
        },
        contact: {
            title: "Get in touch",
            description: "Have a project in mind, or looking for someone who builds the application and not just the model? Get in touch.",
            cv: "Download CV",
            directTitle: "Write me directly",
            form: {
                title: "Send me a message",
                name: "Name",
                namePlaceholder: "Your name",
                email: "Your email",
                emailPlaceholder: "you@example.com",
                subject: "Subject",
                subjectPlaceholder: "What is this about?",
                message: "Message",
                messagePlaceholder: "Tell me what you are working on…",
                submit: "Send message",
                sending: "Sending…",
                successTitle: "Message sent!",
                successBody: "Your message reached me. I will reply to {email}. Thanks for writing.",
                errorTitle: "Could not send it",
                errorBody: "Something failed on the other end. Try again, or write me directly at",
                required: "This field is required.",
                invalidEmail: "Enter a valid email address.",
                shortMessage: "Tell me a bit more (at least 10 characters).",
                captchaRequired: "Complete the captcha to send."
            }
        },
        footer: {
            rights: "All rights reserved."
        }
    }
};

export const LanguageProvider = ({ children, initialLanguage = 'es' }) => {
    const [language, setLanguage] = useState(initialLanguage);

    const t = translations[language];

    // El atributo lang del <html> sigue al idioma activo: sin esto, todo el sitio
    // queda declarado como español para lectores de pantalla y traductores.
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
