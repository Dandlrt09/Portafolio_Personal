import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        hero: {
            badge: "DATA SCIENCE & BI",
            title: "Daniel De los Ríos",
            subtitle: "Convierto datos complejos en decisiones claras — dashboards, modelos predictivos y aplicaciones analíticas con IA.",
            cta: "Ver Proyectos",
            resume: "Ver CV"
        },
        nav: {
            projects: "Proyectos",
            about: "Sobre Mí",
            contact: "Contacto",
            cv: "CV",
        },
        projects: {
            title: "Mis Proyectos",
            dsTitle: "Ciencia de Datos",
            biTitle: "Análisis de Datos",
            viewCode: "Ver Código",
            viewReport: "Ver Reporte",
            viewHere: "Ver aquí",
            viewStreamlit: "Ver en Streamlit",
            stars: "Estrellas",
            comingSoon: "Próximamente…",
            comingSoonDesc: "Aquí publicaré dashboards e informes interactivos desarrollados con Power BI y otras herramientas de visualización de datos.",
            viewPdf: "Descargar PDF",
            contextLabels: {
                problem: "Problema",
                approach: "Enfoque",
                insight: "Insight"
            }
        },
        about: {
            title: "Sobre Mí",
            description: "Vengo de Ingeniería Multimedia, y eso cambia cómo veo los datos. Mientras otros se enfocan solo en el modelo o la query, yo pienso en cómo se va a ver, cómo se va a entender, y — sobre todo — si alguien que no sabe de datos va a poder tomar una decisión con lo que está viendo.\n\nMi approach mezcla lo técnico (Python, Scikit-learn, Power BI) con lo visual que traigo de formación: sé que un dashboard no es bueno porque tenga muchos gráficos, sino porque responde las preguntas correctas en el orden correcto. Eso es lo que me gusta hacer: encontrar la historia que los datos están contando y asegurarme de que se entienda."
        },
        skills: {
            python: "Python — limpio, analizo y modelo datos con Pandas, NumPy y Scikit-learn",
            ml: "Machine Learning aplicado — clasificación, predicción y pipelines con PyCaret",
            bi: "Power BI & Storytelling visual — dashboards que responden preguntas, no solo muestran números",
            storytelling: "Comunicación multicanal — vengo del diseño y la animación, sé cómo hacer que un dato se recuerde"
        },
        contact: {
            title: "Contacto",
            description: "¿Tienes un proyecto en mente o simplemente quieres conectar?",
            cta: "Enviar Correo",
            email: "danieldelosriost@gmail.com",
            cv: "Descargar CV"
        },
        footer: {
            rights: "Todos los derechos reservados."
        }
    },
    en: {
        hero: {
            badge: "DATA SCIENCE & BI",
            title: "Daniel De los Ríos",
            subtitle: "Turning complex data into clear decisions — dashboards, predictive models, and AI-powered analytics.",
            cta: "View Projects",
            resume: "View CV"
        },
        nav: {
            projects: "Projects",
            about: "About Me",
            contact: "Contact",
            cv: "CV",
        },
        projects: {
            title: "My Projects",
            dsTitle: "Data Science",
            biTitle: "Data Analysis",
            viewCode: "View Code",
            viewReport: "View Report",
            viewHere: "View here",
            viewStreamlit: "View in Streamlit",
            stars: "Stars",
            comingSoon: "Coming soon…",
            comingSoonDesc: "Here I will publish interactive dashboards and reports built with Power BI and other data visualization tools.",
            viewPdf: "Download PDF",
            contextLabels: {
                problem: "Problem",
                approach: "Approach",
                insight: "Insight"
            }
        },
        about: {
            title: "About Me",
            description: "I come from Multimedia Engineering, and that changes how I look at data. While others focus only on the model or the query, I think about how it will look, how it will be understood, and — most importantly — whether someone who doesn't know data will be able to make a decision with what they're seeing.\n\nMy approach blends the technical (Python, Scikit-learn, Power BI) with the visual background I bring: I know a dashboard isn't good because it has many charts, but because it answers the right questions in the right order. That's what I enjoy doing — finding the story the data is telling and making sure it's understood."
        },
        skills: {
            python: "Python — clean, analyze, and model data with Pandas, NumPy, and Scikit-learn",
            ml: "Applied ML — classification, prediction, and pipelines with PyCaret",
            bi: "Power BI & Visual Storytelling — dashboards that answer questions, not just show numbers",
            storytelling: "Multichannel communication — from design and animation, I know how to make data stick"
        },
        contact: {
            title: "Get in Touch",
            description: "Have a project in mind or just want to connect?",
            cta: "Send an Email",
            email: "danieldelosriost@gmail.com",
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
