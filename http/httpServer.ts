import http from 'http'

const server = new http.Server();
server.on('request', (req, res)=>{
    console.log(req)
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello Http Server');
    res.end();
});
server.listen(8092);