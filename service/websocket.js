import { WebSocketServer } from "ws";

export function startWebSocket(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", (ws) => {
    ws.on("message", (data) => {
      console.log("received: %s", data);
    });
  });
}
