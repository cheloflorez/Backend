// Express
const express = require("express");
const app = express();
app.use(express.json());



// Server Init
const port = 3000
app.listen(port, () => {
  console.log(`BackEnd Coder - Server Started on port ${port}`);
});

// Routes

app.use('/', require('./routes/index.js'))