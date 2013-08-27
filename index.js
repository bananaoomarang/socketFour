var express = require("express"),
    app = require("express")(),
    server = require('http').createServer(app),
    io = require("socket.io").listen(server),
    connections = 0;

server.listen(8888);

app.use(express.static(__dirname + "/public"));

io.sockets.on('connection', function (socket) {
    connections++;
    socket.emit('client connected', connections);
    
    socket.on('disconnect', function (socket) {
        connections--;
        io.sockets.emit('client disconnected', connections);
    });

    socket.on('grid hit', function(data) {
        socket.broadcast.emit('new grid hit', data);
        socket.broadcast.emit('turn ended');
    });
});
