var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , game =require('./game')

io.sockets.on('connection', function (socket) {
  game.start(function (paddle1, paddle2, ball, lastTick) {
    socket.emit('update', {
      paddle1: paddle1,
      paddle2: paddle2,
      ball: ball,
      lastTick: lastTick
    });   
  });
});

app.configure(function () {
  app.use(express.static(__dirname + '/../public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

exports.app = app;