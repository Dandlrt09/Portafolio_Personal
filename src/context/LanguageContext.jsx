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
            archiveTitle: "Archivo",
            archiveNote: "Ejercicios de práctica y trabajo de curso. Los dejo acá por completitud, no porque sean mi mejor trabajo.",
            archiveShow: "Mostrar archivo",
            archiveHide: "Ocultar archivo",
            labels: {
                problem: "Problema",
                decision: "Decisión técnica",
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
            viewReport: "Ver reporte"
        },
        about: {
            title: "Sobre mí",
            description: "Vengo de Ingeniería Multimedia y eso define cómo trabajo: no me quedo en el modelo ni en la query. Pienso la arquitectura, escribo el backend, armo el frontend y me aseguro de que alguien que no sabe de datos pueda decidir con lo que ve.\n\nHoy construyo aplicaciones de datos e IA de punta a punta. En Datara el reto no fue la IA — fue el sandbox donde corre el código que la IA genera. En ANV·BAR fue llevar un catálogo real a producción con autenticación y políticas de acceso. Lo técnico y lo visual no son dos sombreros: son la misma conversación."
        },
        skills: {
            title: "Habilidades",
            groups: [
                {
                    label: "Desarrollo",
                    items: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "SQL", "Postgres", "SQLite", "Supabase", "Git", "pytest", "GitHub Actions"]
                },
                {
                    label: "Datos & ML",
                    items: ["Pandas", "NumPy", "Scikit-learn", "PyCaret", "EDA", "Ingeniería de características", "Modelado predictivo", "Series temporales", "Jupyter"]
                },
                {
                    label: "IA aplicada",
                    items: ["Gemini API", "Integración de LLM", "Streamlit", "Desarrollo asistido por agentes"]
                },
                {
                    label: "BI & visualización",
                    items: ["Power BI", "Matplotlib", "Seaborn", "Data storytelling"]
                },
                {
                    label: "Diseño",
                    items: ["Adobe Creative Suite", "UX/UI"]
                }
            ]
        },
        contact: {
            title: "Contacto",
            description: "¿Tenés un proyecto en mente, o buscás a alguien que construya la aplicación y no solo el modelo? Escribime.",
            cta: "Enviar correo",
            email: "danieldlrt.jobs@gmail.com",
            cv: "Descargar CV"
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
            archiveTitle: "Archive",
            archiveNote: "Practice exercises and coursework. Kept here for completeness, not because they are my best work.",
            archiveShow: "Show archive",
            archiveHide: "Hide archive",
            labels: {
                problem: "Problem",
                decision: "Technical decision",
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
            viewReport: "View report"
        },
        about: {
            title: "About",
            description: "I come from Multimedia Engineering, and that defines how I work: I don't stop at the model or the query. I design the architecture, write the backend, build the frontend, and make sure someone who doesn't know data can decide with what they see.\n\nToday I build end-to-end data and AI applications. At Datara the challenge wasn't the AI — it was the sandbox where the AI-generated code runs. At ANV·BAR it was taking a real catalogue to production with authentication and access policies. The technical and the visual aren't two hats: they're the same conversation."
        },
        skills: {
            title: "Skills",
            groups: [
                {
                    label: "Development",
                    items: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "SQL", "Postgres", "SQLite", "Supabase", "Git", "pytest", "GitHub Actions"]
                },
                {
                    label: "Data & ML",
                    items: ["Pandas", "NumPy", "Scikit-learn", "PyCaret", "EDA", "Feature engineering", "Predictive modeling", "Time series", "Jupyter"]
                },
                {
                    label: "Applied AI",
                    items: ["Gemini API", "LLM integration", "Streamlit", "Agent-assisted development"]
                },
                {
                    label: "BI & visualization",
                    items: ["Power BI", "Matplotlib", "Seaborn", "Data storytelling"]
                },
                {
                    label: "Design",
                    items: ["Adobe Creative Suite", "UX/UI"]
                }
            ]
        },
        contact: {
            title: "Get in touch",
            description: "Have a project in mind, or looking for someone who builds the application and not just the model? Get in touch.",
            cta: "Send an email",
            email: "danieldlrt.jobs@gmail.com",
            cv: "Download CV"
        },
        footer: {
            rights: "All rights reserved."
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es');

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
