var http = require('http'),  
    io = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io') 
    fs = require('fs'),
    log = require('util').log;
    
var server = http.createServer(function(req, res){ 
 // your normal server code 
 fs.readFile('socket.html', function(err, data) {
    if (err) {
        res.writeHead(404);
        res.end('404');
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    }
 }); 
});
server.listen(8080);
  
// socket.io 
var socket = io.listen(server); 
socket.on('connection', function(client){ 
  // new client is here! 
  client.on('message', function(message){
    log('Message >' + message + '< retrieved.');
    client.broadcast(message);
  }) 
  client.on('disconnect', function(){}) 
});
