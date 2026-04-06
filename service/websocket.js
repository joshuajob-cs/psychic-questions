import { WebSocketServer } from "ws";

export function startWebSocket(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", (ws) => {
    ws.on("message", (data) => {
      const text = data.toString();
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN) {
          client.send(text);
        }
      });
    });
  });
}
