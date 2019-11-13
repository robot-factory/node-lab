import net from "net";
const log = console.log
const client = net.connect(
  {
    host: "localhost",
    port: 9090
    // localPort: 9000
  },
  function() {
    const name = "客户机2";
    client.write(name + " 上线了！\n");
    // client.end(name + " 下线了！\n");
    const sendTimer = setInterval(() => {
      client.write(name + ":" + new Date().valueOf().toString() + "\n");
    }, 3000);
    client.on("data", function(data) {
      console.log(data.toString());
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

const server = new net.Server();
server.on('connection',(socket:net.Socket) => {
  log(socket.remoteAddress,socket.remotePort)
  socket.on('data',(data)=>{
    log(data.toString())
  })
})
server.listen(9091,'0.0.0.0')
