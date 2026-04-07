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
      const msg = JSON.parse(event.data);
      if (msg.type === "name") {
        this.notifyObservers("new_name", msg.name);
      } else if (msg.type === "phase_change") {
        this.notifyObservers("phase_change", msg.phase);
      }
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
    this.socket.send(JSON.stringify({ type: "name", name }));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, name) {
    this.observers.forEach((h) => h({ event, name }));
  }
}

export const namesClient = new NamesClient();
