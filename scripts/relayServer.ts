import net from "net";

const server = new net.Server();
const log = console.log

server.on("connection", (socket: net.Socket) => {
  socket.on("data", (data: Buffer) => {
    log(data.toString());
  });
});

server.on('close', ()=>{
  log('The tcp server is closed!')
})

server.on('error',(err: Error)=>{
  log('The server meet some mistakes:',err.message)
})

server.on('listening',()=>{
  log('The server is listening')
})

server.listen(10001,()=>{
  log('The server now is listening 10001')
})

const connectionHandler = (socket: net.Socket) => {
  socket.on("data", (data: Buffer) => {
    log(data.toString());
  });

  socket.on("close",()=>{
    
  })
}