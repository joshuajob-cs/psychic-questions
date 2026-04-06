class NamesClient {
  observers = [];
  connected = false;

  constructor() {
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    this.socket.onopen = () => {
      this.notifyObservers("system", "websocket", "connected");
      this.connected = true;
    };

    // Display messages we receive from elsewhere to the client
    this.socket.onmessage = async (event) => {
      const text = await event.data.text();
      const chat = JSON.parse(text);
      this.notifyObservers("received", chat.name, chat.msg);
    };

    // If the webSocket is closed then disable the interface
    this.socket.onclose = () => {
      this.notifyObservers("system", "websocket", "disconnected");
      this.connected = false;
    };
  }

  // Send a message over the webSocket
  sendMessage(name, msg) {
    this.notifyObservers("sent", "me", msg);
    this.socket.send(JSON.stringify({ name, msg }));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, from, msg) {
    this.observers.forEach((h) => h({ event, from, msg }));
  }
}

export const namesClient = new NamesClient();
