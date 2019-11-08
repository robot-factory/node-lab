import net from "net";

const log = console.log;

class BaseServer {
  private _server: net.Server;
  name: string;

  constructor(serverName: string = "base server") {
    this._server = new net.Server();
    this.name = serverName;
    this._server.on("close", () => {
      log(`The ${this.name} is closed!`);
    });
    this._server.on("error", (err: Error) => {
      log(`The ${this.name} meet some mistakes:`, err.message);
    });
  }

  setHandler = (conHandler: (s: net.Socket) => void) => {
    this._server.on("connection", conHandler);
  };

  listen = (port: number, cb?: () => void) => {
    this._server.listen(port, () => {
      if (cb) {
        cb();
      } else {
        log(`The ${this.name} is listening...`);
      }
    });
  };
}

const server = new BaseServer("base Server");

const connectionHandler = (socket: net.Socket) => {
  socket.on("data", (data: Buffer) => {
    log(data.toString());
  });

  socket.on("close", () => {});
};

server.setHandler(connectionHandler);

server.listen(10001, () => {
  log("The server now is listening 10001");
});
