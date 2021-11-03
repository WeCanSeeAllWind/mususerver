const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res)=>{
  res.send('this is MuSu Server');
});

app.listen(port);