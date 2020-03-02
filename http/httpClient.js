const http = require("http");

const options = {
  host: "127.0.0.1",
  method: "CONNECT",
  path: "ip6-localhost:80"
};

const req = http.request(options);
req.end();

req.on("connect", (res, socket, head) => {
  console.log("已连接");

  // 通过 HTTP 隧道发出请求。
  socket.write(
    "POST / HTTP/1.1\r\n" + "\r\n" + `{"userName":"aaa1","password":"aaa1"}`
  );
  socket.on("data", chunk => {
    console.log(chunk.toString());
  });
});

const axios = require("axios");

axios
  .post("http://ip6-localhost/ic/court/api/v1/session", {
    userName: "aaa1",
    password: "aaa1"
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
