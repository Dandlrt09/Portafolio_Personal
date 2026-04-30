import olistImg from '../assets/projects/olist.png';
import gamesImg from '../assets/projects/games.png';
import diamondsImg from '../assets/projects/diamonds.png';
import titanicImg from '../assets/projects/titanic.png';
import churnImg from '../assets/projects/churn.png';
import globalSuperstoreImg from '../assets/projects/global_superstore.png';
import hospitalDashboardImg from '../assets/projects/hospital_dashboard.png';
import hrDashboardImg from '../assets/projects/hr_dashboard.png';

export const projects = [
    {
        id: 1,
        category: "data-science",
        title: "Análisis de Ventas - E-commerce Olist",
        description: {
            es: "Análisis del conjunto de datos de Olist para explorar y visualizar patrones de ventas, identificando categorías rentables y comportamiento de precios.",
            en: "Analysis of the Olist dataset to explore and visualize sales patterns, identifying profitable categories and pricing behavior."
        },
        tech: ["Python", "Pandas", "Matplotlib", "NumPy"],
        image: olistImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%201/Main.ipynb",
        stars: 3,
        topics: ["Data Analysis", "E-commerce"]
    },
    {
        id: 2,
        category: "data-science",
        title: "Análisis de Ventas de Videojuegos (2000-2016)",
        description: {
            es: "Análisis global de ventas de videojuegos utilizando técnicas de ML. Dataset de +16,000 juegos, explorando variables como plataforma, género y ventas regionales.",
            en: "Global video game sales analysis using ML techniques. Dataset of +16,000 games, exploring platform, genre, and regional sales variables."
        },
        tech: ["Python", "Pandas", "Seaborn", "Scikit-learn"],
        image: gamesImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%202/Main.ipynb",
        stars: 2,
        topics: ["Machine Learning", "Gaming"]
    },
    {
        id: 3,
        category: "data-science",
        title: "Predicción de Precios de Diamantes",
        description: {
            es: "Pipeline de Machine Learning con PyCaret para predecir precios de diamantes basado en características físicas. Demostración de herramientas low-code.",
            en: "Machine Learning pipeline with PyCaret to predict diamond prices based on physical characteristics. Demonstration of low-code tools."
        },
        tech: ["PyCaret", "Python", "Pandas", "Jupyter"],
        image: diamondsImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%203/Pycaret%20y%20Entrenamiento.ipynb",
        stars: 4,
        topics: ["PyCaret", "Prediction"]
    },
    {
        id: 4,
        category: "data-science",
        title: "Predicción de Supervivencia Titanic",
        description: {
            es: "Estudio del clásico dataset del Titanic utilizando PyCaret para explorar capacidades de machine learning de bajo código.",
            en: "Study of the classic Titanic dataset using PyCaret to explore low-code machine learning capabilities."
        },
        tech: ["PyCaret", "Pandas", "NumPy"],
        image: titanicImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%204/Main.ipynb",
        stars: 5,
        topics: ["PyCaret", "Classification"]
    },
    {
        id: 5,
        category: "data-science",
        title: "Predicción de Fuga de Clientes (Churn Rate)",
        description: {
            es: "Análisis y predicción de fuga de clientes en telecomunicaciones usando PyCaret y AdaBoost Classifier. Modelo optimizado para Recall que identifica clientes con alta probabilidad de cancelar servicios.",
            en: "Customer churn analysis and prediction in telecommunications using PyCaret and AdaBoost Classifier. Recall-optimized model that identifies customers with high probability of canceling services."
        },
        tech: ["PyCaret", "Python", "Pandas", "AdaBoost"],
        image: churnImg,
        link: "https://github.com/Dandlrt09/Proyecto_Analisis-y-Prediccion-de-Fuga-de-Clientes",
        streamlit: "https://simulador-churn.streamlit.app",
        stars: 4,
        topics: ["Machine Learning", "Classification", "Churn"]
    }
];

// Proyectos de Análisis de Datos (Power BI, Tableau, Looker, etc.)
// Agrega aquí tus proyectos de BI cuando estén listos.
// Ejemplo de estructura:
// {
//     id: 1,
//     category: "data-analysis",
//     title: "Dashboard de Ventas - Power BI",
//     description: { es: "...", en: "..." },
//     tool: "Power BI",
//     image: someImg,
//     link: "https://...",
//     topics: ["Sales", "Dashboard"]
// }
export const biProjects = [
    {
        id: 1,
        category: "data-analysis",
        title: "Global Superstore Project",
        description: {
            es: "Dashboard interactivo de Power BI que analiza las ventas globales del dataset Global Superstore. Explora métricas clave como ingresos, márgenes de ganancia y tendencias de ventas por región, categoría de producto y segmento de cliente.",
            en: "Interactive Power BI dashboard analyzing global sales from the Global Superstore dataset. Explores key metrics including revenue, profit margins, and sales trends by region, product category, and customer segment."
        },
        context: {
            es: {
                problem: "Una empresa con operaciones globales necesita entender de un vistazo qué regiones, categorías y segmentos generan ganancias reales versus cuáles están drenando recursos.",
                approach: "Dashboard con filtros por región, categoría y segmento para identificar rápidamente dónde están las oportunidades y los problemas de rentabilidad.",
                insight: "Las ventas altas no significan ganancias altas. Algunas regiones con mayor facturación tienen márgenes negativos — la decisión correcta es mirar rentabilidad, no solo volumen."
            },
            en: {
                problem: "A company with global operations needs to understand at a glance which regions, categories and segments generate real profit versus which are draining resources.",
                approach: "Dashboard with filters by region, category and segment to quickly identify where opportunities and profitability issues lie.",
                insight: "High sales don't mean high profits. Some regions with the highest revenue have negative margins — the right decision is to look at profitability, not just volume."
            }
        },
        tool: "Power BI",
        image: globalSuperstoreImg,
        link: "https://app.powerbi.com/view?r=eyJrIjoiNTJmNWM1OGYtZTRjNC00NmVjLTk3OGItMDI2NzgwNmYzMTdlIiwidCI6IjM0MzAzNTQxLTc0ZWMtNGQ0YS04YzVhLTgwNDlkMmZkNmNlNiIsImMiOjR9",
        topics: ["Sales Analytics", "Power BI", "Global"]
    },
    {
        id: 2,
        category: "data-analysis",
        title: "Dashboard Hospitalario",
        description: {
            es: "Dashboard interactivo de análisis hospitalario con datos de 984 pacientes. Visualiza KPIs clave como costo promedio, tasa de readmisión y satisfacción del paciente. Incluye filtros dinámicos por género, resultado clínico y readmisión, con gráficos de condiciones frecuentes, distribución por edad, procedimientos y más.",
            en: "Interactive hospital analytics dashboard with data from 984 patients. Visualizes key KPIs such as average cost, readmission rate, and patient satisfaction. Includes dynamic filters by gender, clinical outcome and readmission, with charts for frequent conditions, age distribution, procedures, and more."
        },
        context: {
            es: {
                problem: "Un hospital necesita responder 4 preguntas clave: ¿qué enfermedades son más frecuentes?, ¿cuáles generan más costos?, ¿qué pacientes tienen mayor riesgo de urgencias?, y ¿qué procedimientos se usan más?",
                approach: "Proyecto de exploración: construido con Claude AI usando Chart.js para comparar cómo se siente crear dashboards interactivos fuera de Power BI. El valor está en validar si las respuestas son correctas y entender la experiencia del usuario final.",
                insight: "Las 4 preguntas se responden con solo 4 gráficos bien elegidos. Esto demuestra que no necesitás 20 visuales para un dashboard útil — necesitás las preguntas correctas primero."
            },
            en: {
                problem: "A hospital needs to answer 4 key questions: what conditions are most frequent?, which generate the highest costs?, which patients have the highest emergency risk?, and which procedures are most used?",
                approach: "Exploration project: built with Claude AI using Chart.js to compare the experience of creating interactive dashboards outside Power BI. The value is in validating whether the answers are correct and understanding the end-user experience.",
                insight: "All 4 questions are answered with just 4 well-chosen charts. This proves you don't need 20 visuals for a useful dashboard — you need the right questions first."
            }
        },
        tool: "Chart.js",
        image: hospitalDashboardImg,
        link: "/hospital_dashboard.html",
        localFile: true,
        topics: ["Healthcare", "Dashboard", "Chart.js"]
    },
    {
        id: 3,
        category: "data-analysis",
        title: "Dashboard de Recursos Humanos",
        description: {
            es: "Dashboard de Recursos Humanos desarrollado en Power BI con 3 páginas interactivas: Resumen Ejecutivo, Análisis de Empleados y Rotación. Visualiza KPIs clave como 311 empleados totales, salario promedio de $69K, tasa de rotación del 33% y promedio de ausencias. Incluye gráficos de contrataciones por año, distribución por género, headcount por departamento y filtros interactivos.",
            en: "Human Resources dashboard built in Power BI with 3 interactive pages: Executive Summary, Employee Analysis, and Turnover. Visualizes key KPIs including 311 total employees, $69K average salary, 33% turnover rate and average absences. Features charts for hires by year, gender distribution, headcount by department, and interactive filters."
        },
        context: {
            es: {
                problem: "Una organización necesita monitorear la salud de su capital humano: quién se va, por qué, y qué patrones aparecen en el desempeño y la rotación. Sin datos claros, las decisiones de retención son reactivas en lugar de preventivas.",
                approach: "Tres vistas jerárquicas: un resumen ejecutivo para visión general en 30 segundos, un análisis personal para detalle individual por manager, y una vista de desempeño y rotación para responder a la pregunta crítica: ¿se van los mejores o los peores?",
                insight: "La rotación del 33% no es un número abstracto — cada salida tiene un perfil. Identificar patrones por departamento, antigüedad y desempeño permite actuar antes de que se vayan los perfiles clave."
            },
            en: {
                problem: "An organization needs to monitor the health of its human capital: who is leaving, why, and what patterns emerge in performance and turnover. Without clear data, retention decisions are reactive rather than preventive.",
                approach: "Three hierarchical views: an executive summary for a 30-second overview, a personal analysis for individual detail per manager, and a performance & turnover view to answer the critical question: are the best or the worst leaving?",
                insight: "A 33% turnover rate is not an abstract number — each departure has a profile. Identifying patterns by department, tenure, and performance enables action before key profiles leave."
            }
        },
        tool: "Power BI",
        image: hrDashboardImg,
        link: "https://app.powerbi.com/view?r=eyJrIjoiNDkzMzYwZWItZDU0YS00Y2M5LTkxYTEtZjIzNDQ1NmQzYzUwIiwidCI6IjM0MzAzNTQxLTc0ZWMtNGQ0YS04YzVhLTgwNDlkMmZkNmNlNiIsImMiOjR9",
        topics: ["Human Resources", "Power BI", "HR Analytics"]
    }
];
