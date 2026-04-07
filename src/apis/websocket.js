class NamesClient {
  observers = [];
  connected = false;
  socket = null;

  connect(gameCode) {
    if (this.socket) this.socket.close();

    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(
      `${protocol}://${window.location.host}/ws?gameCode=${gameCode}`,
    );

    this.socket.onmessage = (event) => {
      const { name } = JSON.parse(event.data);
      this.notifyObservers("received", name);
    };

    this.socket.onclose = () => {
      this.notifyObservers("system", "disconnected");
      this.connected = false;
    };

    return new Promise((resolve) => {
      this.socket.onopen = () => {
        this.notifyObservers("system", "connected");
        this.connected = true;
        resolve();
      };
    });
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
