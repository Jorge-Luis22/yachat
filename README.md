# Yachat

Tutor conversacional con IA para postulantes de provincia que se preparan para el examen de admisión de San Marcos sin poder pagar una academia. Prototipo para **Sueñ-IA en Grande 2026** · Isla 01 Educación e Inclusión.

## Problema y usuario
Estudiantes de 5.º de secundaria y egresados de provincia que postulan a Ingeniería en San Marcos, con educación escolar de menor calidad y sin acceso a academias preuniversitarias.

## Qué hace la IA (input → output)
Recibe las respuestas y dudas del estudiante. Diagnostica su nivel, arma un plan de estudio según el peso de cada curso en el examen, explica paso a paso y corrige ejercicios tipo examen. Usa Claude (API de Anthropic) con instrucciones propias en `lib/prompt.js`. No se entrenó ningún modelo.

## Funcional vs. simulado
| Funcional hoy | Simulado o pendiente |
|---|---|
| Filtros por universidad, carrera y formato (leer, escuchar con voz del navegador, practicar). Chat con diagnóstico, plan semanal y práctica con corrección (UNMSM, Área C) | Revisión docente del contenido (pendiente) |
| Estructura del examen 2026-I por curso | Canal WhatsApp/Telegram y modo offline (ruta futura) |
| | Más universidades y búsqueda automática del temario en la fuente oficial (hoy el catálogo se carga a mano; ruta futura) |
| | Videos e infografías (ruta futura) |
| | Búsqueda de fechas, vacantes y becas (ruta futura) |
| | Otras 4 áreas, límites de uso por estudiante, medición de progreso |

El contenido de las preguntas lo genera la IA y no está verificado por docentes. Por eso la interfaz lo declara como demo.

## Ejecutar en local (VS Code, Antigravity o cualquier editor)
Requiere Node 18 o superior. No hay dependencias que instalar.

```bash
cp .env.example .env      # y pega tu ANTHROPIC_API_KEY dentro
node server.js            # abre http://localhost:3000
```

## Publicar en Vercel
1. Sube la carpeta a un repositorio de GitHub (el archivo `.env` no se sube: está en `.gitignore`).
2. En vercel.com: New Project → importa el repositorio.
3. En Settings → Environment Variables agrega `ANTHROPIC_API_KEY`.
4. Deploy. La página sale de `public/` y la función de `api/chat.js`.

## Estructura
```
public/index.html   interfaz del chat
api/chat.js         función serverless (Vercel)
lib/chat.js         llamada a la API de Claude y validaciones
lib/prompt.js       instrucciones del tutor y estructura del examen
server.js           servidor local sin dependencias
```

## Seguridad
- La clave de la API vive solo en el servidor (variable de entorno). Nunca la pongas en `public/` ni la subas a GitHub.
- El servidor limita la conversación a los últimos 20 mensajes y 1500 caracteres por mensaje.
- No se guardan conversaciones ni datos personales.
- Antes de un uso real con menores se necesita revisión legal y límites de uso por estudiante.

## Equipo
Stefano (Ingeniería Industrial), Sebastián (Bioingeniería) y Jorge (desarrollo con IA).
