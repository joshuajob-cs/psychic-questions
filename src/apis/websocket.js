class NamesClient {
  observers = [];
  connected = false;

  constructor() {
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    this.socket.onopen = () => {
      this.notifyObservers("system", "connected");
      this.connected = true;
    };

    // Display messages we receive from elsewhere to the client
    this.socket.onmessage = (event) => {
      const { name } = JSON.parse(event.data);
      this.notifyObservers("received", name);
    };

    // If the webSocket is closed then disable the interface
    this.socket.onclose = () => {
      this.notifyObservers("system", "disconnected");
      this.connected = false;
    };
  }

  sendName(name) {
    this.socket.send(JSON.stringify({ name }));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, name) {
    this.observers.forEach((h) => h({ event, name }));
  }
}

export const namesClient = new NamesClient();
