// import { connect } from "net";

// const conn = connect(
//   { port: 8090 },
//   () => {
//     conn.on("data", data => {
//       console.log(data.toString());
//     });
//     conn.write("abcdefg");
//     const timer = setInterval(()=>{
//       conn.write('aaabbbcccddd')
//       conn.write(Buffer.alloc(5000,'a'))
//     },1000)
//     setTimeout(()=>{
//       clearInterval(timer)
//       conn.end("hijklmn");
//     },5000)

//   }
// );

import net from "net";

const client = net.connect({host: '47.106.122.155', port: 10001 ,localPort:9000}, function() {
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
});


// const client2 = net.connect({host:'192.168.1.1',port: 10403},function(){
//   const name = '客户机2';
//   client2.write(name + ' 上线了！\n');
//   client2.end(name + ' 下线了！\n');
//   client2.on("data", function(data) {
//       console.log(data.toString());
//   });
// });

// const client2 = net.connect({host:'239.255.255.250',port: 1900},function(){
//   // const name = '客户机2';
//   client2.write('M-SEARCH * HTTP/1.1\r\n');
//   client2.write('S:uuid:ijklmnop-7dec-11d0-a765-00a0c91e6bf6\r\n');
//   client2.write('Man:"ssdp:discover"ST:ge:fridge')
//   client2.write('MX:3')
//   client2.on("data", function(data) {
//       console.log(data.toString());
//   });
// });
