const protocol = window.location.protocol === "http:" ? "ws" : "wss";
export const socket = new WebSocket(`${protocol}://${window.location.host}`);
