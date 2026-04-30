import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        hero: {
            title: "Daniel Josué De los Ríos Trespalacios",
            subtitle: "Ingeniero Multimedia | Python | Ciencia de Datos",
            cta: "Ver Proyectos",
            resume: "Ver CV"
        },
        nav: {
            projects: "Proyectos",
            about: "Sobre Mí",
            contact: "Contacto",
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
            comingSoonDesc: "Aquí publicaré dashboards e informes interactivos desarrollados con Power BI y otras herramientas de visualización de datos."
        },
        about: {
            title: "Sobre Mí",
            description: "Ingeniero Multimedia con experiencia en diseño gráfico, animación y edición de video, complementada con formación en desarrollo en Python y ciencia de datos. Manejo herramientas creativas como Adobe Creative Suite, Figma, CapCut y Unreal Engine 5, junto con entornos de desarrollo como Visual Studio Code. Capaz de integrar programación, análisis de datos y visualización para crear soluciones interactivas, funcionales y orientadas a una comunicación visual efectiva."
        },
        skills: {
            python: "Programación en Python",
            dataviz: "Análisis y visualización de datos",
            design: "Diseño y comunicación visual",
            automation: "Automatización de procesos creativos"
        },
        footer: {
            rights: "Todos los derechos reservados."
        }
    },
    en: {
        hero: {
            title: "Daniel Josué De los Ríos Trespalacios",
            subtitle: "Multimedia Engineer | Python | Data Science",
            cta: "View Projects",
            resume: "View CV"
        },
        nav: {
            projects: "Projects",
            about: "About Me",
            contact: "Contact",
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
            comingSoonDesc: "Here I will publish interactive dashboards and reports built with Power BI and other data visualization tools."
        },
        about: {
            title: "About Me",
            description: "Multimedia Engineer with experience in graphic design, animation, and video editing, complemented by training in Python development and data science. Proficient in creative tools like Adobe Creative Suite, Figma, CapCut, and Unreal Engine 5, along with development environments like Visual Studio Code. Capable of integrating programming, data analysis, and visualization to create interactive, functional solutions oriented towards effective visual communication."
        },
        skills: {
            python: "Python Programming",
            dataviz: "Data Analysis & Visualization",
            design: "Visual Design & Communication",
            automation: "Creative Process Automation"
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
