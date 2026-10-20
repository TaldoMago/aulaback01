const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  res.on('finish', () => {
   console.log(`${req.method} ${req.url} - Status: ${res.statusCode}`);
});

  if (req.url === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Bem-vindo ao servidor HTTP!' }));} 
    else if (req.url === '/status') {
    res.statusCode = 200;

    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));} 
  else if (req.url === '/hora') {
      res.statusCode = 200;
      const agora = new Date();
      res.end(JSON.stringify({
         data: agora.toLocaleDateString('pt-PT'),
         hora: agora.toLocaleTimeString('pt-PT')
      }));
        }
  else if(req.method === "POST" && req.url === "/eco"){
    res.writeHead(201);
    req.on("data", (pedaco) => console.log(pedaco.toString()));
    return res.end(JSON.stringify({status: res.statusCode}))
   }
  else if (req.method === "POST" && req.url === "/status") {
      res.writeHead(405);
      res.end(JSON.stringify({ message: 'NOT ALLOWED' }));
   }
    
    else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    
  }
});
    

server.listen(3000, () => {
  console.log('Servidor a rodar em http://localhost:3000/');
});