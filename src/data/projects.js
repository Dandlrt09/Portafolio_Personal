import dataraBrand from '../assets/projects/datara.webp';
import anvbarHero from '../assets/projects/anvbar.webp';
import olistImg from '../assets/projects/olist_app.png';
import churnImg from '../assets/projects/churn_app.png';
import globalSuperstoreImg from '../assets/projects/global_superstore.png';
import globalResumen from '../assets/projects/global_resumen.png';
import globalGeografico from '../assets/projects/global_geografico.png';
import globalProductos from '../assets/projects/global_productos.png';
import hrDashboardImg from '../assets/projects/hr_dashboard.png';
import hrResumen from '../assets/projects/hr_resumen.png';
import hrEmpleados from '../assets/projects/hr_empleados.png';
import hrRotacion from '../assets/projects/hr_rotacion.png';

/**
 * Featured projects — end-to-end data and AI applications.
 * Every card answers: what problem, what stack, what technical decision, where to see it.
 */
export const featuredProjects = [
    {
        id: 'datara',
        category: 'ai',
        status: { es: 'En desarrollo activo', en: 'Active development' },
        title: { es: 'Datara', en: 'Datara' },
        tagline: {
            es: 'Análisis de datos con chat en lenguaje natural',
            en: 'Data analysis through a natural-language chat'
        },
        problem: {
            es: 'Para analizar datos con IA hay que saber programar o usar herramientas en inglés. No existía una opción simple: subir un archivo, preguntar en español y obtener el resultado con gráficos y tablas, sin configurar nada.',
            en: 'Analyzing data with AI requires knowing how to code or using English-only tools. No simple option existed: upload a file, ask in Spanish, and get results with charts and tables — without configuring anything.'
        },
        decision: {
            es: 'El reto no fue la IA, fue el sandbox. El código que genera el modelo puede tener loops infinitos, imports peligrosos o errores de sintaxis, así que construí un entorno de ejecución aislado y a la vez potente como para que pandas y Plotly funcionen. La arquitectura está separada en tres capas — core, server y web — con proveedores de LLM intercambiables, para no quedar atado a uno solo.',
            en: 'The challenge was not the AI — it was the sandbox. Model-generated code can contain infinite loops, dangerous imports, or syntax errors, so I built an isolated execution environment that is still powerful enough for pandas and Plotly to run. The architecture is split into three layers — core, server, and web — with interchangeable LLM providers so the project is not tied to a single one.'
        },
        stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLite', 'Gemini API'],
        image: dataraBrand,
        imageAlt: {
            es: 'Wordmark de Datara sobre el fondo oscuro de su design system',
            en: 'Datara wordmark on its dark design system background'
        },
        repo: 'https://github.com/Dandlrt09/Datara-2',
        meta: { es: 'Open source (MIT) · pytest · CI', en: 'Open source (MIT) · pytest · CI' }
    },
    {
        id: 'anvbar',
        category: 'client',
        status: { es: 'Proyecto para cliente', en: 'Client project' },
        title: { es: 'ANV·BAR Web', en: 'ANV·BAR Web' },
        tagline: {
            es: 'Tienda y panel de administración para una marca de moda',
            en: 'Storefront and admin panel for a fashion brand'
        },
        problem: {
            es: 'Una marca de moda femenina hecha a mano necesitaba vender sin carrito ni pasarela de pago: catálogo en vivo, pedidos por WhatsApp y un panel propio para gestionar productos y testimonios sin depender de un desarrollador para cada cambio.',
            en: 'A handmade women\'s fashion brand needed to sell without a shopping cart or payment gateway: a live catalogue, WhatsApp orders, and its own panel to manage products and testimonials without a developer for every change.'
        },
        decision: {
            es: 'El catálogo se lee en vivo desde Supabase con un gate de pantalla completa que bloquea el render hasta que la carga termina, así nadie ve un catálogo a medias. La seguridad la resolví con Supabase Auth, políticas RLS y una lista de administradores autorizados, en lugar de manejar permisos en el frontend. El código está organizado por dominio de negocio — catalog, favorites, reviews, admin — no por tipo de archivo.',
            en: 'The catalogue is read live from Supabase behind a full-screen gate that blocks rendering until loading finishes, so nobody ever sees a half-loaded catalogue. Security is handled with Supabase Auth, RLS policies, and an allowlist of administrators instead of frontend-side permission checks. The code is organized by business domain — catalog, favorites, reviews, admin — not by file type.'
        },
        stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Postgres', 'RLS'],
        image: anvbarHero,
        imageAlt: {
            es: 'Página de inicio de la tienda ANV·BAR con una prenda bordó sobre fondo floral',
            en: 'ANV·BAR storefront home page with a burgundy garment on a floral background'
        },
        repo: 'https://github.com/Dandlrt09/P-gina-Web-ANV-BAR',
        meta: { es: 'Cliente real · catálogo en vivo', en: 'Real client · live catalogue' }
    },
    {
        id: 'aipdf',
        category: 'ai',
        status: null,
        title: { es: 'AI PDF Generator', en: 'AI PDF Generator' },
        tagline: {
            es: 'Documentos generados con IA, con formato determinista',
            en: 'AI-generated documents with deterministic formatting'
        },
        problem: {
            es: 'Generar documentos con IA suele terminar en layouts inconsistentes: el modelo también decide el formato y cada corrida sale distinta. Un mismo pedido debería producir siempre el mismo documento.',
            en: 'Generating documents with AI usually ends in inconsistent layouts: the model also decides the formatting, so every run looks different. The same request should always produce the same document.'
        },
        decision: {
            es: 'Separé responsabilidades en lugar de dejar todo al modelo: el LLM redacta el contenido y Python determinista (ReportLab) renderiza el layout. Cinco tipos de documento — factura, propuesta, informe, carta y resumen — comparten un mismo motor, y la CLI y la app de Streamlit son envoltorios finos sobre la misma función. Un test verifica que ambos caminos producen PDFs byte-idénticos.',
            en: 'I separated responsibilities instead of leaving everything to the model: the LLM writes the content and deterministic Python (ReportLab) renders the layout. Five document types — invoice, proposal, report, letter, and summary — share one engine, and the CLI and the Streamlit app are thin wrappers over the same function. A test asserts that both paths produce byte-identical PDFs.'
        },
        stack: ['Python', 'Streamlit', 'ReportLab', 'Gemini', 'OpenAI', 'pytest'],
        image: null,
        imageAlt: null,
        repo: 'https://github.com/Dandlrt09/Freelancer_Proyects/tree/main/ai-pdf-generator',
        meta: { es: 'CI · CLI + web sobre un mismo core', en: 'CI · CLI + web over a single core' }
    }
];

/**
 * Analytics work — dashboards and predictive models.
 * `kind` selects the card component: 'bi' renders the report gallery, 'ds' links the notebook and demo.
 */
export const analyticsProjects = [
    {
        id: 'churn',
        kind: 'ds',
        category: 'data-science',
        title: { es: 'Predicción de fuga de clientes (Churn)', en: 'Customer Churn Prediction' },
        description: {
            es: 'Pipeline en PyCaret que cubre EDA, ingeniería de características y balanceo de clases, con un clasificador AdaBoost que alcanza un Recall del 64% sobre clientes con alta probabilidad de cancelar. Publicado como simulador interactivo.',
            en: 'PyCaret pipeline covering EDA, feature engineering, and class balancing, with an AdaBoost classifier reaching 64% Recall on customers likely to cancel. Published as an interactive simulator.'
        },
        tech: ['PyCaret', 'Python', 'Pandas', 'AdaBoost'],
        image: churnImg,
        link: 'https://github.com/Dandlrt09/Proyecto_Analisis-y-Prediccion-de-Fuga-de-Clientes',
        streamlit: 'https://simulador-churn.streamlit.app',
        topics: ['Machine Learning', 'Classification', 'Churn']
    },
    {
        id: 'olist',
        kind: 'ds',
        category: 'data-science',
        title: { es: 'Análisis de ventas — E-commerce Olist', en: 'Sales Analysis — Olist E-commerce' },
        description: {
            es: 'Análisis del dataset de Olist para explorar patrones de ventas e identificar las categorías realmente rentables, separando volumen de margen.',
            en: 'Analysis of the Olist dataset to explore sales patterns and identify genuinely profitable categories, separating volume from margin.'
        },
        tech: ['Python', 'Pandas', 'Matplotlib', 'NumPy'],
        image: olistImg,
        link: 'https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%201/Main.ipynb',
        streamlit: 'https://e-commerce-app-project.streamlit.app',
        topics: ['Data Analysis', 'E-commerce']
    },
    {
        id: 'superstore',
        kind: 'bi',
        category: 'data-analysis',
        title: { es: 'Global Superstore', en: 'Global Superstore' },
        description: {
            es: 'Cuadro de mando en Power BI con KPIs de ingresos, márgenes y distribución por categorías, aplicando data storytelling para una audiencia no técnica.',
            en: 'Power BI dashboard with revenue, margin, and category-distribution KPIs, applying data storytelling for a non-technical audience.'
        },
        context: {
            es: {
                problem: 'Una empresa con operaciones globales necesita ver de un vistazo qué regiones, categorías y segmentos generan ganancias reales y cuáles están drenando recursos.',
                approach: 'Dashboard con filtros por región, categoría y segmento para ubicar rápido las oportunidades y los problemas de rentabilidad.',
                insight: 'Vender mucho no es ganar mucho. Algunas regiones con la facturación más alta tienen márgenes negativos: la decisión correcta es mirar rentabilidad, no volumen.'
            },
            en: {
                problem: 'A company with global operations needs to see at a glance which regions, categories, and segments generate real profit and which are draining resources.',
                approach: 'Dashboard with filters by region, category, and segment to quickly locate opportunities and profitability problems.',
                insight: 'High sales do not mean high profit. Some regions with the highest revenue have negative margins: the right decision is to look at profitability, not volume.'
            }
        },
        tool: 'Power BI',
        image: globalSuperstoreImg,
        pages: [globalResumen, globalGeografico, globalProductos],
        pageLabels: { es: ['Resumen', 'Análisis geográfico', 'Análisis de productos'], en: ['Overview', 'Geographic analysis', 'Product analysis'] },
        pdfPath: '/Global Superstore Proyect.pdf',
        topics: ['Sales Analytics', 'Power BI', 'Global']
    },
    {
        id: 'hr',
        kind: 'bi',
        category: 'data-analysis',
        title: { es: 'Dashboard de Recursos Humanos', en: 'Human Resources Dashboard' },
        description: {
            es: 'Dashboard en Power BI con tres vistas jerárquicas: resumen ejecutivo para una lectura de 30 segundos, análisis de empleados y rotación. Parte de 311 empleados, $69K de salario promedio y 33% de rotación.',
            en: 'Power BI dashboard with three hierarchical views: an executive summary readable in 30 seconds, employee analysis, and turnover. Built on 311 employees, $69K average salary, and 33% turnover.'
        },
        context: {
            es: {
                problem: 'La organización necesita monitorear la salud de su capital humano: quién se va, por qué y qué patrones aparecen en desempeño y rotación. Sin datos claros, las decisiones de retención son reactivas.',
                approach: 'Tres vistas jerárquicas: resumen ejecutivo, detalle por manager y una vista de desempeño y rotación para responder la pregunta crítica: ¿se van los mejores o los peores?',
                insight: 'Una rotación del 33% no es un número abstracto: cada salida tiene un perfil. Identificar patrones por departamento, antigüedad y desempeño permite actuar antes de perder los perfiles clave.'
            },
            en: {
                problem: 'The organization needs to monitor the health of its human capital: who is leaving, why, and what patterns emerge in performance and turnover. Without clear data, retention decisions are reactive.',
                approach: 'Three hierarchical views: an executive summary, per-manager detail, and a performance and turnover view to answer the critical question: are the best or the worst leaving?',
                insight: 'A 33% turnover rate is not an abstract number: every departure has a profile. Identifying patterns by department, tenure, and performance enables action before key profiles are lost.'
            }
        },
        tool: 'Power BI',
        image: hrDashboardImg,
        pages: [hrResumen, hrEmpleados, hrRotacion],
        pageLabels: { es: ['Resumen ejecutivo', 'Análisis de empleados', 'Rotación'], en: ['Executive summary', 'Employee analysis', 'Turnover'] },
        pdfPath: '/Recursos Humanos.pdf',
        topics: ['Human Resources', 'Power BI', 'HR Analytics']
    }
];

/**
 * Archive — practice and course work, kept for completeness but out of the main path.
 * Compact list, no cards.
 */
export const archivedProjects = [
    {
        id: 'games',
        title: { es: 'Análisis de ventas globales — Videojuegos (1985-2016)', en: 'Global Sales Analysis — Video Games (1985-2016)' },
        detail: { es: 'Dataset de +16.000 lanzamientos · Python, Seaborn', en: 'Dataset of +16,000 releases · Python, Seaborn' },
        link: 'https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%202/Main.ipynb',
        demo: 'https://videogames-analysis.streamlit.app'
    },
    {
        id: 'diamonds',
        title: { es: 'Predicción de precios de diamantes', en: 'Diamond Price Prediction' },
        detail: { es: 'Dataset de práctica · PyCaret', en: 'Practice dataset · PyCaret' },
        link: 'https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%203/Pycaret%20y%20Entrenamiento.ipynb',
        demo: 'https://diamond-price-app.streamlit.app'
    },
    {
        id: 'titanic',
        title: { es: 'Predicción de supervivencia Titanic', en: 'Titanic Survival Prediction' },
        detail: { es: 'Dataset de práctica · PyCaret', en: 'Practice dataset · PyCaret' },
        link: 'https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%204/Main.ipynb',
        demo: 'https://supervivencia-titanic.streamlit.app'
    },
    {
        id: 'hospital',
        title: { es: 'Dashboard hospitalario', en: 'Hospital Dashboard' },
        detail: { es: 'Exploración con Chart.js fuera de Power BI', en: 'Exploration with Chart.js outside Power BI' },
        link: '/hospital_dashboard.html',
        local: true
    }
];
