# Proyectos: que el protagonista sea Daniel

Feature: reescribir la sección Proyectos para que la información ponga a Daniel en el
centro. Es un problema de **contenido**, no de CSS: hoy el sujeto de cada frase es el
proyecto, no la persona. Toca `src/data/projects.js`, las tres tarjetas y los textos de
`LanguageContext.jsx`. Estado: **esperando datos** (ver preguntas abiertas en el Log).

## Specs

S1. La sección Proyectos se corrige **en su información**, no en su estética. El feedback
    recibido fue que no se entiende qué hizo Daniel.
S2. Cada ficha invierte el orden actual (`Problema → Decisión → Stack`) a:
    **Mi rol → Lo que hice → El problema → Stack**.
S3. `projects.js` incorpora `role` y `timeline` por proyecto, en `{ es, en }`.
    El bloque `decision` se reescribe en primera persona.
S4. **Datara** — "sigue en construcción", en desarrollo activo.
S5. **ANV·BAR Web** — "ya fue terminado como en 4 semanas". Cliente real.
S6. **AI PDF Generator** — brief real tomado de Workana; "el cliente no me respondio";
    se tomó "con el objetivo de agregarlo a portafolio". NO es un trabajo entregado.
S7. **Churn, Olist, Global Superstore, RRHH Dashboard** — práctica "en base a mi estudio"
    pero "un poco mas serias a comparación de los ultimos donde dice Archivos".
S8. **Archivo** (Videojuegos, Diamantes, Titanic, Hospital) — ejercicio individual de curso.
S9. El rating `stars` deja de leerse como nivel de habilidad de Daniel y pasa a leerse como
    **complejidad del proyecto**.
S10. El rating se etiqueta explícitamente ("Complejidad") y se ancla con una línea que
     justifique el número. Confirmado por Daniel.
S11. **ANV·BAR es el único proyecto con cliente real.** Ninguna otra ficha puede sugerir
     cliente, empresa ni organización. Las que hoy lo hacían (Superstore, RRHH) se
     reescriben como escenario de análisis declarado.
S12. **ANV·BAR no está publicada.** Terminada y entregada, pero la marca todavía no cargó
     productos, así que no tiene uso por ahora y por eso no se compró dominio. La ficha NO
     puede afirmar que está en producción.
S13. **Datara es Daniel + agentes de IA**, no un equipo humano. La asistencia de agentes se
     declara, no se esconde: es coherente con la habilidad "Desarrollo asistido por agentes"
     ya listada en nivel 3.
S14. Duraciones reales: Datara en desarrollo desde septiembre del año en curso (activo);
     ANV·BAR 4 semanas; AI PDF Generator 2 días; Churn, Olist, Superstore y RRHH 1 día cada
     uno, usando IA como guía en la parte pesada de código.
S15. **AI PDF Generator** es un brief real de Workana resuelto por iniciativa propia, sin
     cliente. Eso va al frente de la ficha: la iniciativa es el activo, no algo que esconder.

## Tasks

| ID | Tarea | Spec | Ruta | Commit |
| -- | ----- | ---- | ---- | ------ |
| T1 | Confirmar el modelo de información (rol, timeline, contribución, complejidad) | S1-S3, S9-S10 | inline | — |
| T2 | Reescribir los contenidos de las 9 fichas en es/en con los hechos del Log | S4-S8 | por definir | — |
| T3 | Actualizar `src/data/projects.js` con `role`, `timeline` y `contribution` | S3 | inline | — |
| T4 | Reordenar las tres tarjetas al nuevo orden de bloques | S2 | por definir | — |
| T5 | Convertir `stars` en complejidad etiquetada y anclada | S9, S10 | inline | — |
| T6 | Verificar que las 9 fichas renderizan en es/en con el orden nuevo | S1-S10 | inline | — |

## Commits

Rama `feat/portfolio-revamp`; `main` queda intacto. Seis rodajas, cada una coherente y
construible en el orden en que se apilaron:

| Commit | Que contiene | Relacion con esta feature |
| --- | --- | --- |
| `35bf674` | `chore(hero)`: orbit field, portrait, Inter self-hosted | Trabajo previo a esta sesion, ajeno a la feature |
| `efa8459` | `fix(dev)`: polling para WSL | Ajeno a la feature |
| `8f6a536` | `docs`: snapshot del design system + este documento | Sin tareas |
| `051e15e` | `feat(skills)`: constelacion + separacion de About | Ajeno a la feature |
| `a9a055c` | `feat(projects)`: rol, tiempo y complejidad | **Evidencia de T2, T3, T4, T5 y T7** |
| `c7021c9` | `style(sections)`: H2 unificado, grilla 2x2 y CTA | **Evidencia de T6** y de los ajustes de seccion |

**Frontera de rodaja.** 4392 inserciones en total, pero **2659 son artboards de `design/` y
assets binarios** (60%). El codigo propio de `src/` son 1608 lineas en 16 archivos. El commit
de codigo mas grande es `a9a055c` con ~268 lineas, dentro del limite de ~400. Las rodajas que
superan ese numero lo hacen por artboards de diseno o documentacion, no por codigo de producto.

**Antes del proximo commit hay que decidir la estrategia de entrega.** Un PR unico seria de
~4400 lineas. Recomendacion (ver skill `chained-pr`): dejar `design/` y los assets fuera del PR
de producto, o sacar el hero a su propio PR, porque no pertenece a ninguna de las features de
esta sesion.

**Estado: sin push.** Daniel pidio pushear recien cuando esten cerrados todos los puntos.

## Log

L1 (pedido original, literal):
> "Ok, dejalo así. El siguiente punto son los proyectos, según el feedback tengo que mostrar
> lo que hice, tengo que resaltarme, hacerme brillar y ser el centro de atención. Eso es lo
> que tienen que reflejar en su información."

L2 (respuestas a la consulta de alcance):
> "Al contenido: no se entiende qué hice yo"
> "Mi rol: si fue solo o en equipo, y cuánto tardé"

L3 (contexto, literal):
> "Te doy mas contexto, Todo lo hice yo como tal, datara sigue en construcción y lo estamos
> haciendo, ANV-BAR ya fue terminado como en 4 semanas pero el cliente no tiene stack
> todavia, AI PDF fue un proyecto tambien hecho contigo sacado de workana (el cliente no me
> respondio así que tomamos el proyecto con el objetivo de agregarlo a portafolio). Los demas
> como tal fueron mas enfocado en practicas en base a mi estudio pero un poco mas serias a
> comparación de los ultimos donde dice Archivos. Sigamos lo que dices de quitar las
> estrellas aunque podemos enfocarlas mas en complejidad del proyecto que en mi nivel de
> habilidad con esas tecnologias, que opinas?"

L4 (hallazgo del asistente, requiere decisión de Daniel):
Hallazgo: las fichas de Global Superstore y RRHH Dashboard usan `context.problem` con
encuadre de cliente real ("Una empresa con operaciones globales necesita…", "La
organización necesita monitorear…") aunque son datasets públicos de práctica. Riesgo de
credibilidad: si un lector pregunta por la empresa, se cae la ficha. Propuesta: reescribir
como escenario de análisis declarado. NO se reescribe sin el OK de Daniel.

L5 (preguntas abiertas, sin respuesta todavía):
1. Datara: ¿"lo estamos haciendo" es Daniel + asistencia de agentes, o Daniel + otra
   persona? Define si la ficha dice "lo construí yo de punta a punta" o "lo construimos".
2. ANV·BAR: ¿qué significa "el cliente no tiene stack todavía"? ¿Sin dominio ni hosting?
   ¿El sitio no está publicado? Hoy la ficha afirma producción con catálogo en vivo y una
   demo en Cloudflare.
3. Duraciones faltantes: Datara, AI PDF, Churn, Olist, Global Superstore, RRHH. (RESUELTO en L6)

L8 (voz aprobada por Daniel y ajuste de Datara):
> "De datara me suena bien el rol, la parte de lo que hice pues lo ultimo es lo que mas me
> suena ya que es lo que mas recuerdo de settings, podemos agregar en problemas es que busco
> con Datara un programa local para que a la hora de subir archivos o data privada tengas mas
> seguridad sin miedo a subirlas a paginas en internet, siempre es bueno desconfiar.
> De las complejidades no me quejo y la c pues esta bien dejarlas como trabajo de analisis."

Aplicado: (a) el bloque `decision` de Datara se conserva tal cual, con la arquitectura de tres
capas y proveedores intercambiables al final, que es la parte que Daniel recuerda mejor;
(b) el `problem` de Datara suma la motivacion de privacidad — programa local para datos
privados, y la frase "Siempre es bueno desconfiar"; (c) complejidades aprobadas; (d) las
cuatro practicas se miden como trabajo de analisis, no por horas.

L9 (RESUELTO en L10): el `problem` de Datara se escribe como INTENCION ("busco que sea un
programa local"), no como hecho, mientras no se confirme si el dataset se envia al proveedor
de LLM. Afirmar "tus datos nunca salen" seria falso si el modelo corre en la nube.

L10 (respuesta de Daniel, literal):
> "el dataset no se manda al LLM. Al modelo le llega esquema, metadata y estadísticas, más una
> muestra mínima de filas. Los datos reales los lee el sandbox desde disco."

Aplicado: se agrego al bloque `decision` de Datara, que es donde vive el diseno tecnico, y se
sumo a su `complexity.reason`. **NO se escribe "tus datos no salen de tu maquina":** una
muestra minima de filas SI llega al modelo, asi que la afirmacion absoluta seria falsa y
alguien que lea el codigo la detecta. La version precisa (dataset no subido, al modelo solo
llegan esquema/metadata/estadisticas/muestra minima, los datos reales los lee el sandbox desde
disco) es mas fuerte porque demuestra que Daniel penso la frontera.

## Modelo de datos acordado

Se conserva el nombre `decision` en `projects.js` (ya esta en primera persona y renombrarlo
rompe las tarjetas sin ganar nada). Lo que cambia es la etiqueta visible, que pasa de
"Decision tecnica" a "Lo que hice". Campos nuevos por proyecto:

```js
role:     { es: '...', en: '...' },          // quien lo hizo y en que condiciones
 timeline: { es: '...', en: '...' },          // duracion o estado
 complexity: { level: 4, reason: { es: '...', en: '...' } },   // reemplaza a `stars`
```

Orden de bloques en la ficha: **Mi rol → Lo que hice → El problema → Stack → Complejidad.**

## Voz aprobada (usar como referencia)

**Datara**
- rol es: "Lo construyo yo, de punta a punta: arquitectura, backend y frontend. Los agentes de
  IA son mi equipo de ejecucion, no el criterio."
- rol en: "I build it end to end: architecture, backend, and frontend. AI agents are my
  execution team, not the judgement."

**ANV·BAR Web**
- rol es: "Unico proyecto con cliente real. Lo disene y lo construi solo, de la primera reunion
  a la entrega."
- rol en: "The only project with a real client. I designed and built it alone, from the first
  meeting to delivery."

Regla de voz: primera persona, frases cortas, cero adjetivos de marketing, cero superlativos.
Solo hechos verificables. Si un dato no esta en este documento, no se escribe.

L6 (respuestas de Daniel, literales):
> "1) Yo y gentleman 2) el cliente no tiene productos que agregar a la página por lo tanto la
> página no tiene uso por ahora (Por esto no se ha comprado dominio) 3) Datara 2 que es el
> rework lo inicie en septiembre, estamos ya a 27 de octubre, Ai pdf se hizo en 2 días, los
> demas en uno ya que use la IA como guia para toda esa parte de codigo pesado 4) Si, como
> tal solo ANV BAR es el unico proyecto donde de verdad fue con cliente de verdad"

Lectura aplicada de L6: (1) Datara = Daniel + agentes de IA, sin equipo humano. (2) ANV·BAR:
entregada, sin publicar: el cliente no tiene productos que cargar, por eso no hay dominio.
(3) Duraciones en S14. (4) Reencuadre de Superstore y RRHH aprobado; ANV·BAR es el único
cliente real del portafolio.

L7 (riesgo de encuadre que Daniel debe decidir): publicar "1 día" en las cuatro prácticas
puede leerse como poco profundo si no se explica de dónde viene la velocidad. Propuesta:
medir esas fichas como trabajo de análisis y dejar que el criterio y la complejidad lleven el
peso, no las horas. Decisión pendiente.
