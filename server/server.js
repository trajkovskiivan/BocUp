const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const io = socketio(http)

const server = http.createServer(app)

const PORT = process.env.PORT || 80;


app.get('/', (req, res) => {
  res.send("Hello Kate");
})

io.on("connection", socket => {
  console.log('User connected')
})



server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})