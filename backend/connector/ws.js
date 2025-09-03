// Lightweight WebSocket hub (heartbeat + broadcast + per-client send)
const WebSocket = require('ws');

function createWSHub(server, path = '/stream') {
  const wss = new WebSocket.Server({ noServer: true });
  const HEARTBEAT_MS = 20000;

  // Upgrade only for our path
  server.on('upgrade', (req, socket, head) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      if (url.pathname !== path) return socket.destroy();
      wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
    } catch { socket.destroy(); }
  });

  // Heartbeat
  function heartbeat() { this.isAlive = true; }
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      try { ws.ping(); } catch {}
    });
  }, HEARTBEAT_MS);

  wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
  });

  wss.broadcast = (obj) => {
    const msg = JSON.stringify(obj);
    wss.clients.forEach((ws) => { if (ws.readyState === WebSocket.OPEN) ws.send(msg); });
  };

  wss.sendTo = (ws, obj) => { if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj)); };

  wss.closeGracefully = () => { clearInterval(interval); wss.clients.forEach(ws => ws.close()); };

  return wss;
}

module.exports = { createWSHub };