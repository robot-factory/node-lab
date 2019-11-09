import net from "net";

interface RpcCall {
  id: number;
  method: string;
  payload: any[];
}
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

const connectionHandler = (socket: net.Socket) => {
  const connInfo = `${socket.remoteAddress}:${socket.remotePort}`;
  log(`(${connInfo}) connect`);

  socket.on("data", (data: Buffer) => {
    log(data.toString());
  });

  socket.on("close", () => {
    log(`ID:${connInfo} close`);
  });

  socket.on("error", (err: Error) => {
    log(err.message);
  });
};

server.setHandler(connectionHandler);

const localPort = 9001;
const client = net.connect(
  { host: "47.106.122.155", port: 10001, localPort },
  function() {
    let id = 1;
    const name = "客户机2";
    client.write(JSON.stringify({ id, method: "getPeers", payload: [] }));
    id++;
    // client.end(name + " 下线了！\n");
    const sendTimer = setInterval(() => {
      client.write(JSON.stringify({ id, method: "getPeers", payload: [] }));
      id++;
    }, 20000);
    client.write(
      JSON.stringify({ id, method: "requestConnect", payload: [7] })
    );

    client.on("data", function(data) {
      console.log(data.toString());
      try {
        const rpc = JSON.parse(data.toString()) as RpcCall;
        switch (rpc.method) {
          case "postRequestConnect":
            const targetHost = rpc.payload[0].split(":")[0];
            const targetPort = Number(rpc.payload[0].split(":")[1]);
            const socket = net.connect(
              { host: targetHost, port: targetPort, localPort },
              function() {
                socket.write("hello world");
                socket.end();
                server.listen(localPort, () => {
                  log("The server now is listening 9001");
                });
              }
            );
            break;
          default:
            console.log(rpc.method);
        }
      } catch (e) {
        log(e.message);
      }
    });
    client.on("close", () => {
      console.log("连接关闭");
      clearInterval(sendTimer);
    });
    client.on("error", (err: Error) => {
      console.log(err);
    });
  }
);

server.listen(localPort, () => {
  log("The server now is listening 9001");
});
