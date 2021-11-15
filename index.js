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
  socket.join(roomName);

  socket.on('ImHere', (nick, peerId)=>{
    console.log(`I got ImHere form ${nick}`);
    socket.to(roomName).emit('ImHere', nick, peerId, socket.id);
  })
  socket.on('myName', (nick, socketId)=>{
    socket.to(socketId).emit('otherName', nick);
  })
  
});


app.get('/', (req, res)=>{
  res.send('this is MuSu Server');
});

httpServer.listen(port);