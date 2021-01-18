const express = require("express");
const http = require("http");
const {pid, send} = require("process");
const socketio = require("socket.io");
const uuid = require("uuid");

const app = express();
const server = http.Server(app);
const io = socketio(server)

const port = 5000;

// const io = require("socket.io")(server);

class PrivateRoom {
  constructor(users = [], roomId, messages = []) {
    this.users = users;
    this.roomId = roomId;
    this.messages = messages;
  }
}

let USER_ID = [];
let PRIVATE_CHAT_ROOMS = {};

io.on("connection", socket => {


  socket.emit("socketConnected", {activeUsers: USER_ID, socketId: socket.id});

  socket.on("fontEndConnected", data => {
    USER_ID = [...USER_ID, data];
    socket.broadcast.emit("usersUpdated", USER_ID);
    // console.log(USER_ID)
    // console.log("")
    // console.log("")
  });

  socket.on("mainMessage", (data) => {
    console.log(data.message);
    io.sockets.emit("mainMessage", data);
  });

  socket.on('requestPrivateRoom', data => {
    let chatRoomId = uuid.v4();
    const receiver = USER_ID.find(user => user.userData.OU === data);
    const sender = USER_ID.find(user => user.socketId === socket.id)
    console.log(receiver.socketId)
    console.log(sender.socketId)
    const newRoom = new PrivateRoom([sender, receiver], chatRoomId);
    socket.broadcast.to(receiver.socketId).emit("createPrivateRoom", newRoom);
    socket.emit("createPrivateRoom", newRoom);
  });


  socket.on("privateMessage", data => {
    console.log(data);
    // socket.emit("privateMessage", data);
    socket.broadcast.to(data.receiverSocket).emit("privateMessage", data)
  });


  socket.on("disconnect", () => {
    USER_ID = USER_ID.filter(user => socket.id !== user.socketId)
    socket.broadcast.emit("usersUpdated", USER_ID);
  });
});


server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})