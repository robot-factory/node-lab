import net from "net";

const log = console.log;

import { BaseServer } from "./tcp_base_server";

const server = new BaseServer("test1");

const connectionHandler = (socket: net.Socket) => {
  const connInfo = `${socket.remoteAddress}:${socket.remotePort}`;
  log(`(${connInfo}) connect`);

  socket.on("data", (data: Buffer) => {
    log(data.toString());
  });

  socket.on("close", () => {
    log(`(${connInfo}) close`);
  });

  socket.on("error", (err: Error) => {
    log(err.message);
  });
};

server.setHandler(connectionHandler);

server.listen({ port: 9090, host: '0.0.0.0', exclusive: false }, () => {
  log("9090");
});

// const localPort = 9090;
// const client = net.connect(
//   { host: "47.106.122.155", port: 10001, localPort },
//   function() {
//     let id = 1;
//     client.write(JSON.stringify({ id, method: "getPeers", payload: [] }));
//     id++;
//     // client.end(name + " 下线了！\n");
//     const sendTimer = setInterval(() => {
//       client.write(JSON.stringify({ id, method: "getPeers", payload: [] }));
//       id++;
//       if (id > 3) {
//         client.end();
//       }
//     }, 20000);

//     client.on("data", function(data) {
//       console.log(data.toString());
//     });
//     client.on("close", () => {
//       console.log("连接关闭");
//       clearInterval(sendTimer);
//     });
//     client.on("error", (err: Error) => {
//       console.log(err);
//     });
//   }
// );
