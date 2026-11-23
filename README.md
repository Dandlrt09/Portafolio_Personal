# Portafolio — Daniel De los Ríos

Portafolio profesional de Data Science & Business Intelligence. Construido con React + Vite, muestra proyectos de análisis de datos, machine learning y dashboards interactivos.

🔗 **Demo en vivo:** [portafolio-personal-sage.vercel.app](https://portafolio-personal-sage.vercel.app/) — despliega desde `main`.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 |
| Bundler | Vite 7 |
| Estilos | Tailwind CSS 3 + clsx + tailwind-merge |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Despliegue | Vercel (automatizado desde GitHub) |

## Proyectos

### Ciencia de Datos
- **Olist E-commerce** — Análisis de ventas con Python + Pandas + Streamlit
- **Mercado Interactivo (1985-2016)** — Análisis global con ML + Seaborn + Streamlit
- **Predicción de Diamantes** — Pipeline PyCaret + Streamlit
- **Titanic** — Clasificación con PyCaret + Streamlit
- **Churn Rate** — Predicción de fuga de clientes con AdaBoost + Streamlit

### Análisis de Datos / BI
- **Global Superstore** — Dashboard Power BI con análisis de ventas globales
- **Dashboard Hospitalario** — Dashboard interactivo con Chart.js
- **Datara** — Analiza datos con lenguaje natural (Streamlit + Gemini AI)
- **Dashboard RRHH** — Dashboard Power BI: resumen ejecutivo, análisis de empleados y rotación

## Funcionalidades

- 🌐 **Bilingüe** — Español e inglés con toggle en un clic
- 🌙 **Tema oscuro** — Paleta slate/violeta/cyan/rosa
- ✨ **Animaciones suaves** — Transiciones con Framer Motion
- 📱 **Responsive** — Navegación adaptativa con menú mobile
- 📄 **Reportes descargables** — Dashboards exportados a PDF

## Correr en local

```bash
git clone https://github.com/Dandlrt09/Portafolio_Personal.git
cd Portafolio_Personal
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

### Build para producción

```bash
npm run build
npm run preview
```

## Despliegue

Vercel construye **dos cosas distintas**, y confundirlas es fácil:

| Tipo | Se dispara con | URL |
|------|----------------|-----|
| **Producción** | un push a `main` | [portafolio-personal-sage.vercel.app](https://portafolio-personal-sage.vercel.app/) |
| **Preview** | un push a **cualquier otra rama** | una URL única por commit |

El dominio de producción sirve **solo lo que está en `main`**. Mientras una rama no se mergee,
ese dominio sigue mostrando la versión vieja — no es un build que falló, es que nunca apuntó a
la rama. Para ver los cambios de una rama hay que abrir su URL de preview.

**No hace falta abrir un pull request para que Vercel construya el preview**: el push a la rama
alcanza, y el preview se ve en la pestaña *Deployments* del proyecto en Vercel. El pull request
sirve para que el link quede a la vista junto a la conversación, y para que el merge actualice
producción.

La publicación anterior en **GitHub Pages** quedó retirada junto con su workflow, y su URL ya
no sirve el portafolio. **Vercel es el único destino.**
