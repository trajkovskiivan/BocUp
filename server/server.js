const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketio(server)

const port = 5000;

// const io = require("socket.io")(server);

let USER_ID = {};
io.on("connection", socket => {
  // console.log(`New user connected`);


  socket.emit("socketConnected", {activeUsers: USER_ID, socketId: socket.id});

  socket.on("fontEndConnected", data => {
    // console.log(data);
    USER_ID = {...USER_ID, [socket.id]: data};
    // console.log(USER_ID);
    socket.broadcast.emit("usersUpdated", USER_ID);
  })


  socket.on("disconnect", () => {
    delete USER_ID[socket.id];
    console.log(USER_ID);
    socket.broadcast.emit("usersUpdated", USER_ID);
  })

  // socket.on("disconnect", (data) => {
  //   USER_ID = Object.entries(USER_ID).filter(([id, userData], index) => socket.id !== id);
  //   // socket.broadcast.emit("changedUsers", USER_ID);
  //   console.log(USER_ID)

  // delete USER_ID[socket.id]
  // });





  socket.on("message", (data) => {
    console.log(data);
    io.sockets.emit("message", data)
  });
});


// console.log(USER_ID)

server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})