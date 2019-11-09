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
    this._server.listen(port, "0.0.0.0", () => {
      if (cb) {
        cb();
      } else {
        log(`The ${this.name} is listening...`);
      }
    });
  };
}

const server = new BaseServer("base Server");

class Store {
  conns: Map<number, net.Socket>;
  nextId: number = 0;

  constructor() {
    this.conns = new Map()
  }

  getConns = (id: number) => {
    return this.conns.get(id);
  };

  appendConn = (socket: net.Socket) => {
    this.conns.set(this.nextId, socket);
    this.nextId += 1;
    return this.nextId - 1;
  };

  removeConn = (id: number) => {
    this.conns.delete(id);
  };
}

const store = new Store();
// class BaseHandler {
//   private _store: any;
//   private _socket: net.Socket

//   constructor(socket: net.Socket, stateStore: any) {
//     this._store = stateStore;
//     this._socket = socket
//   }

//   initConnection = () => {
//     const conId = `${this._socket.remoteFamily}/${this._socket.remoteAddress}/${this._socket.remotePort}`;
//     log(`${conId} connect`);
//   };

//   onMessage = () => (data: Buffer) => {
//     log(data.toString());
//   };

//   onClose = () => {
//     log("close");
//   };

//   onError = (err: Error) => {
//     log(err.message);
//   };

// }

interface RpcCall {
  id: number;
  method: string;
  payload: any[];
}

const connectionHandler = (socket: net.Socket) => {
  const connInfo = `${socket.remoteAddress}:${socket.remotePort}`;
  const connId = store.appendConn(socket);
  log(`ID:${connId}(${connInfo}) connect`);

  socket.on("data", (data: Buffer) => {
    log(data.toString());
    try {
      const rpc = JSON.parse(data.toString()) as RpcCall;
      switch (rpc.method) {
        case "requestConnect":
          const targetId = rpc.payload[0] as number;
          const target = store.getConns(targetId);
          if (!target) {
            socket.write(JSON.stringify({ id: rpc.id, result: "" }));
          } else {
            socket.write(
              JSON.stringify({
                id: rpc.id,
                result: `${target.remoteAddress}:${target.remotePort}`
              })
            );
          }
          target.write(
            JSON.stringify({
              id: 0,
              method: "postRequestConnect",
              payload: [`${socket.remoteAddress}:${socket.remotePort}`]
            })
          );
          break;
        case "getPeers":
          const peersArray:string[] = []
          for(const [key,value] of store.conns.entries()) {
            peersArray.push(`${key}:${value.remoteAddress}:${value.remotePort}`)
          }
          socket.write(JSON.stringify({id:rpc.id, result: peersArray}))
          break
        default:
          socket.write(JSON.stringify({id:rpc.id, result: []}))

      }
    } catch (e) {
      socket.end(JSON.stringify({ error: { message: e.message } }));
    }
  });

  socket.on("close", () => {
    log(`ID:${connId} close`);
    store.removeConn(connId);
  });

  socket.on("error", (err: Error) => {
    log(`ID:${connId} error:`, err.message);
    store.removeConn(connId);
  });
};

server.setHandler(connectionHandler);

server.listen(10001, () => {
  log("The server now is listening 10001");
});
