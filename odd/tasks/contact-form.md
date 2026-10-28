# Contacto: formulario que llega al Gmail sin abrir otra página

Feature: reemplazar el CTA `mailto:` de la sección Contacto por un formulario real, al lado
del correo visible. El sitio es estático (GitHub Pages, sin backend), así que el envío pasa
por un **relay de formularios**: Web3Forms. Estado: en implementación; falta la access key.

## Specs

S1. El botón "Enviar correo" (el CTA grande `mailto:`) **se elimina** de la sección Contacto.
S2. El correo se muestra como **texto normal** (`danieldlrt.jobs@gmail.com`), sin botón grande.
    Clickeable con `mailto:`, que es el mismo efecto sin el peso visual.
S3. En escritorio el formulario va **al lado** del bloque de correo y redes: info a la
    izquierda, formulario a la derecha. En mobile, apilado (una columna).
S4. El formulario tiene **exactamente cuatro campos**: nombre, correo de quien escribe, asunto
    y mensaje.
S5. El envío llega **directo al Gmail de Daniel sin abrir otra página**: `POST` por AJAX
    (`fetch`) a `https://api.web3forms.com/submit` con `Accept: application/json`, para que
    Web3Forms devuelva JSON en vez de redirigir (303).
S6. Daniel puede **responder directo desde Gmail**: el `email` del visitante viaja como
    `replyto` (contrato de Web3Forms para el campo `email`).
S7. Anti-spam: **hCaptcha** (sitekey pública de Web3Forms para plan free
    `50b2fe65-b00b-4b9e-ad62-3ba471098be2`, `reCaptchaCompat={false}`) más un **honeypot**
    oculto (`botcheck`, `display:none`).
S8. Estados explícitos: envío en curso, éxito (con reset del formulario) y error. En error se
    muestran el motivo y el correo como salida alternativa. **Nunca falla en silencio.**
S9. Validación en el cliente: los cuatro campos requeridos, formato de correo, y captcha
    resuelto cuando hCaptcha está activo.
S10. Accesibilidad: cada campo con `<label>` asociado, errores enlazados por
     `aria-describedby` y `aria-invalid`, el estado anunciado con `aria-live`, foco visible.
S11. Copy en `es` y `en`, sin strings sueltos en el componente.
S12. No romper la regla tonal de `design/system.md`: el H2 violeta se mantiene y no se agrega
     un segundo acento compitiendo en el bloque.

## Restricción de credenciales

La `access_key` **la tiene que crear Daniel con su Gmail** (`danieldlrt.jobs@gmail.com`) en
web3forms.com. Sin eso los mensajes no llegan. La clave es **pública por diseño** (va en el JS
del sitio: solo autoriza "mandá un mensaje al inbox de Daniel", no da acceso a leer el correo),
así que puede vivir en el repo público. Vive en `src/data/site.js` con ese comentario.

En el mismo panel hay un segundo paso obligatorio: **activar hCaptcha** como captcha del
formulario. No es opcional si el formulario manda `h-captcha-response`.

## Tasks

| ID | Tarea | Spec | Ruta | Commit |
| -- | ----- | ---- | ---- | ------ |
| T1 | Documento de feature, espejo Engram y `todo` | — | inline | `docs` |
| T2 | Arnés de verificación SSR en RED (el formulario todavía no existe) | S1-S4 | inline | `6c4e686` |
| T3 | `site.js`: endpoint, `WEB3FORMS_ACCESS_KEY` y `CONTACT_EMAIL` | S5, S7 | inline | `fbedfdf` |
| T4 | Copy del formulario en es/en (`LanguageContext.jsx`) | S11 | inline | `fbedfdf` |
| T5 | `ContactForm.jsx`: campos, validación, estados, submit AJAX, captcha, honeypot | S4-S10 | inline | `6c4e686` |
| T6 | `Contact.jsx`: dos columnas, fuera el CTA, correo como texto | S1-S3, S12 | inline | `6c4e686` |
| T7 | Dependencia `@hcaptcha/react-hcaptcha` | S7 | inline | `6c4e686` |
| T8 | Verificación: lint, build, SSR en GREEN y captura real | S1-S12 | delegada a `gentle-ai-verify` | `6c4e686` |
| T9 | `design/system.md`: registrar el patrón de formulario | S12 | inline | `docs` |
| T10 | Commits por rodaja en `feat/portfolio-revamp` | — | inline | `fbedfdf`, `6c4e686`, `docs` |
| T11 | Activar hCaptcha en el panel de Web3Forms + prueba de envío real desde el navegador | S5, S7 | **bloqueada: paso manual de Daniel** | — |

## Commits

| Commit | Qué contiene |
| --- | --- |
| `fbedfdf` | `feat(contact)`: la capa de envío (endpoint, access key, correo único, lib y copy) |
| `6c4e686` | `feat(contact)`: la UI (formulario + dos columnas), el arnés de verificación y la dependencia de hCaptcha |
| `docs` | `docs(contact)`: este documento y el patrón de formulario en `design/system.md` |

**Frontera de rodaja.** La rama `feat/portfolio-revamp` acumula ~5400 líneas desde `origin/main`
(9 commits) contando las features anteriores (hero, skills, proyectos). Este commit de UI
(~570 líneas) es el más grande de la feature; la dependencia nueva viaja sola acá para que la
revisión nativa pueda tomarla como candidato propio.

**Estrategia de entrega pendiente de decisión de Daniel** (ver skill `chained-pr`): un PR único
de ~5400 líneas no es revisable. El `design/` y los assets binarios son ~60% del volumen, y el
hero no pertenece a ninguna de las features de estas sesiones. Conviene separarlo en PRs
encadenados por feature, con `design/` y los assets fuera del PR de producto.

**Verificación independiente.** `gentle-ai-verify` corrió sobre el árbol sin commitear, en una
copia de scratch aislada, y devolvió **12/12 specs PASS** con probes propios (no los del autor):
`lint` exit 0, `npm run verify:contact` 24/24, `npm run build` exit 0. Dos avisos suyos se
resolvieron antes de commitear: la contradicción en `design/system.md` (decía que `accent` estaba
sin uso) y cuatro casos de S8 que faltaba pinnear (500 con JSON, cuerpo no-JSON, `success:false`
con 200, y el conjunto exacto de claves del payload). El total del arnés pasó de 24 a 28 checks.

## Log

L1 (pedido original, literal):
> "Hoy vamos a agregar un formulario al lado de contactame al final, actualmente hay un boton
> de enviar correo, eso se va a quitar y se ma a mostrar mi correo normal y al lado vamos a
> crear un formulario donde la persona escribe su nombre, correo de esa persona, asunto y
> mensaje para que sea un mensaje directo a mi gmail sin que le tenga que abrir una pagina
> aparte"

L2 (decisiones tomadas por Daniel, con las opciones sobre la mesa):
> Servicio: Web3Forms — "250/mes, sin panel, captcha cero-config. Mi recomendación"
> Anti-spam: hCaptcha — "Configuración cero, no necesita claves extra. Un click para el visitante"
> Layout: "Info a la izquierda, form a la derecha"

L3 (contexto técnico verificado, no supuesto):
- El sitio se publica a GitHub Pages con `.github/workflows/deploy.yml` → **no ejecuta código**,
  así que no hay backend y el relay es la única vía sin abrir otra página.
- Contrato de Web3Forms leído en la documentación oficial: `access_key` requerido; el campo
  `email` **es** el reply-to; `subject` arma el asunto; `botcheck` es el honeypot; `200` con
  `{success:true}`, `400` cliente, `429` rate limit, `500` servidor.
- hCaptcha con Web3Forms pide el script `https://web3forms.com/client/script.js` y un
  `<div class="h-captcha" data-captcha="true">` en HTML plano; en React la vía documentada es
  el paquete `@hcaptcha/react-hcaptcha` (v2.2.0, sin peer deps → compatible con React 19).
- `npm run lint` y `npm run build` son los únicos scripts del repo. No hay runner de tests: la
  verificación del proyecto es un chequeo SSR con esbuild.

L4 (resuelto): Daniel creó la access key en web3forms.com con su Gmail. Quedó en
`src/data/site.js` como `WEB3FORMS_ACCESS_KEY`, comentada como pública por diseño.

L5 (hallazgo del arnés, verificado, no supuesto): **Web3Forms bloquea por User-Agent.** Desde
`curl/8.x` y desde `HeadlessChrome/x.y` la API responde 403 "This method is not allowed. Use our
API in client side…", y ese 403 **no trae `Access-Control-Allow-Origin`**, así que el navegador lo
reporta como un error de CORS ("Failed to fetch") que parece de red y no lo es. Con un UA de
navegador real, tanto el POST JSON (con preflight) como el multipart devuelven `200
{"success":true}`. Consecuencias: (a) la implementación con JSON es correcta, el preflight pasa;
(b) el envío **no se puede verificar desde curl ni desde Chrome headless sin falsear el UA**; (c)
si un visitante llegara con un UA raro, vería el error genérico con el correo como salida.

L6 (verificado con el relay real): el correo de prueba llegó — 4 envíos de prueba durante el
diagnóstico (el usuario debe ignorarlos o borrarlos).

L7 (pendiente de Daniel, cierra T11): **activar hCaptcha en el panel** del formulario en
web3forms.com. Sin eso el token del captcha no se valida. Y la prueba de envío real desde el
navegador: requiere resolver el captcha a mano, así que no es automatizable desde acá.
