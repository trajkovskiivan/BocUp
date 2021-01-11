const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketio(server)

const port = 5000;

// const io = require("socket.io")(server);


io.on("connection", socket => {
  // console.log(`New user connected`);

  socket.on("newUser", (data) => {
    console.log(`User ${data.Ed} connected`)
    socket.broadcast.emit("welcome", data);
  });

  socket.on("message", (data) => {
    console.log(data);
    // socket.emit("message", data);
    io.sockets.emit("message", data)
  })
});



server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})