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
  socket.on('GoodMorning', (nick, peerId, streamId)=>{
    socket.join(roomName);
    socket.to(roomName).emit('GoodMorning', nick, peerId, streamId);
  });
  
});


app.get('/', (req, res)=>{
  res.send('this is MuSu Server');
});

httpServer.listen(port);