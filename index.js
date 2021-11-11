const express = require('express');
const cors = require('cors');
const { createServer } = require("http");
const app = express();
app.use(cors());

const port = process.env.PORT || 3001;
const clientDomain = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

const httpServer = createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: clientDomain,
    methods: ["GET", "POST"]
  }
});



io.on("connection", (socket) => {
  const roomName = 'eliceClone';
  console.log(socket);
  socket.on('welcome', (nick, done)=>{
    socket.join(roomName);
    done(nick);
    socket.to(roomName).emit('welcome', socket.id, nick);
  });
  socket.on('niceToSeeYou', (peerId, nick, socketId)=>{
    socket.to(socketId).emit('niceToSeeYou', peerId, nick, socket.id);
  });
  socket.on('meToo', (peerId, nick, socketId)=>{
    socket.to(socketId).emit('meToo', peerId, nick, socket.id)
  });
});


app.get('/', (req, res)=>{
  res.send('this is MuSu Server');
});

httpServer.listen(port);