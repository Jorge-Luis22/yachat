// Función serverless de Vercel: POST /api/chat
const { handleChat } = require('../lib/chat');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify({ error: 'Método no permitido' }));
  }
  const { status, json } = await handleChat(req.body);
  res.statusCode = status;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(json));
};
