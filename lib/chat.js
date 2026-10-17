// Lógica compartida: la usan la función de Vercel (api/chat.js) y el servidor local (server.js).
const { SYSTEM } = require('./prompt');
const { FORMATOS, resolver } = require('./catalogo');

const MODEL = process.env.YACHAT_MODEL || 'claude-haiku-5-5'; // modelo económico para el piloto
const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;

async function handleChat(body) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { status: 500, json: { error: 'Falta ANTHROPIC_API_KEY en el servidor.' } };

  const raw = body && Array.isArray(body.messages) ? body.messages : null;
  if (!raw || raw.length === 0) return { status: 400, json: { error: 'Escribe un mensaje.' } };

  const messages = raw
    .slice(-MAX_MESSAGES)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  // La API exige que la conversación empiece y termine con el usuario.
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return { status: 400, json: { error: 'Mensaje inválido.' } };
  }

  // Contexto elegido por el estudiante (universidad, carrera, formato). Se valida contra el catálogo.
  const sel = resolver(body && body.ctx);
  const system = sel
    ? SYSTEM +
      `\n\nCONTEXTO DEL ESTUDIANTE\nUniversidad: ${sel.u.nombre}. Carrera: ${sel.c.nombre} (Área ${sel.c.area}). Fuente de la estructura: ${sel.u.fuente}\nFormato preferido: ${FORMATOS[sel.formato]}\nPrepáralo para el examen de ADMISIÓN de esa universidad, no para los cursos de la carrera. Si te piden el plan, arma uno semanal según el peso de cada curso y avísale que debe confirmar el temario oficial en la web de admisión.`
    : SYSTEM;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 700, system, messages }),
    });
    const data = await r.json();
    if (!r.ok) {
      console.error('Error de la API:', r.status, JSON.stringify(data));
      return { status: 502, json: { error: 'El tutor no pudo responder ahora. Intenta de nuevo en un momento.' } };
    }
    const reply = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    return { status: 200, json: { reply } };
  } catch (e) {
    console.error(e);
    return { status: 502, json: { error: 'Sin conexión con el tutor. Revisa tu internet e intenta otra vez.' } };
  }
}

module.exports = { handleChat };
