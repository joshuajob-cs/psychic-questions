import { WebSocketServer } from "ws";

export function startWebSocket(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url, "http://localhost");
    ws.gameCode = url.searchParams.get("gameCode");

    ws.on("message", (data) => {
      const text = data.toString();
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN && client.gameCode === ws.gameCode) {
          client.send(text);
        }
      });
    });
  });
}
