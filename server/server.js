const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketio(server)

const port = 5000;

// const io = require("socket.io")(server);

let USER_ID = [];
io.on("connection", socket => {
  // console.log(`New user connected`);


  socket.emit("socketConnected", {activeUsers: USER_ID, socketId: socket.id});

  socket.on("fontEndConnected", data => {
    // console.log(data);
    USER_ID = [...USER_ID, data];
    // console.log(USER_ID);
    socket.broadcast.emit("usersUpdated", USER_ID);
  });

  socket.on("message", (data) => {
    console.log(data);
    io.sockets.emit("message", data)
  });

  socket.on("disconnect", () => {
    // delete USER_ID[socket.id];
    USER_ID = USER_ID.filter(user => socket.id !== user.socketId)
    // console.log(USER_ID);
    socket.broadcast.emit("usersUpdated", USER_ID);
  });
});


server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})