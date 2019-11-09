import net from "net";

const client = net.connect(
  { host: "47.106.122.155", port: 10001, localPort: 9000 },
  function() {
    let id = 1;
    const name = "客户机2";
    client.write(JSON.stringify({ id, method: "getPeers", payload: [] }));
    id++;
    // client.end(name + " 下线了！\n");
    const sendTimer = setInterval(() => {
      client.write(JSON.stringify({ id, method: "getPeers", payload: [] }));
      id++;
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
