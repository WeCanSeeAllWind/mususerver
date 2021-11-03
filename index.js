const express = require('express');
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3001;

app.use(cors());


const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket);

});


app.get('/', (req, res)=>{
  res.send('this is MuSu Server');
});

httpServer.listen(port);