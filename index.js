const express = require('express');

const app = express();

app.get('/', (req, res)=>{
  res.send('this is MuSu Server');
});

app.listen(3001);