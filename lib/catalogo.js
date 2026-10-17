// Catálogo curado a mano para el prototipo. Cada universidad nueva es una carga de datos, no código nuevo.
// "activa: false" = ruta futura: la IA buscaría y verificaría el temario en la fuente oficial.
const UNIVERSIDADES = [
  {
    id: 'unmsm',
    nombre: 'UNMSM (San Marcos)',
    activa: true,
    fuente: 'Estructura del examen 2026-I, Área C (Ingeniería). Confirmar en la web de la Oficina Central de Admisión.',
    carreras: [
      { id: 'industrial', nombre: 'Ingeniería Industrial', area: 'C' },
      { id: 'sistemas', nombre: 'Ingeniería de Sistemas', area: 'C' },
      { id: 'software', nombre: 'Ingeniería de Software', area: 'C' },
      { id: 'civil', nombre: 'Ingeniería Civil', area: 'C' },
      { id: 'mecatronica', nombre: 'Ingeniería Mecatrónica', area: 'C' },
    ],
  },
  { id: 'unh', nombre: 'Universidad Nacional de Huancavelica (próximamente)', activa: false, carreras: [] },
  { id: 'unat', nombre: 'UNAT Tayacaja (próximamente)', activa: false, carreras: [] },
  { id: 'uni', nombre: 'UNI (próximamente)', activa: false, carreras: [] },
];

const FORMATOS = {
  leer: 'LEER: explica por escrito, con pasos numerados y un ejemplo con números.',
  escuchar:
    'ESCUCHAR: escribe como si lo dijeras en voz alta. Frases cortas, sin tablas, sin símbolos raros y sin listas con viñetas. Las fórmulas se dicen con palabras ("velocidad es igual a distancia entre tiempo").',
  practicar:
    'PRACTICAR: da un ejercicio tipo examen con alternativas A–E y espera la respuesta antes de explicar.',
};

function resolver(ctx) {
  if (!ctx || typeof ctx !== 'object') return null;
  const u = UNIVERSIDADES.find((x) => x.id === ctx.universidad && x.activa);
  if (!u) return null;
  const c = u.carreras.find((x) => x.id === ctx.carrera);
  if (!c) return null;
  const formato = FORMATOS[ctx.formato] ? ctx.formato : 'leer';
  return { u, c, formato };
}

module.exports = { UNIVERSIDADES, FORMATOS, resolver };
