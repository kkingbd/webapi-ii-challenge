const express = require("express");
const db = require('./data/db.js');
const server = express();
const PORT = 4000;

server.use(express.json());
server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})