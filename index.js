const express = require('express');
const cors = require('cors');
const { createServer } = require("http");
const app = express();
app.use(cors());

const port = process.env.PORT || 3001;
const clientDomain = process.env.CLIENT_ORIGIN || 'http://localhost:3001';

const httpServer = createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: clientDomain,
    methods: ["GET", "POST"]
  }
});



io.on("connection", (socket) => {
  console.log(socket);
  socket.on('welcome', (done)=>{
    done('musu is forever');
  })

});


app.get('/', (req, res)=>{
  res.send('this is MuSu Server');
});

httpServer.listen(port);