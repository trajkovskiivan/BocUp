const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const uuid = require("uuid");

const app = express();
const server = http.Server(app);
const io = socketio(server)

const port = 5000;

// const io = require("socket.io")(server);

class PrivateRoom {
  constructor(roomId, users = [], messages = []) {
    this.roomId = roomId;
    this.users = users;
    this.messages = messages;
  };
};
class PrivateMessage {
  constructor(sender, message) {
    this.sender = sender;
    this.message = message
  };
};

let USER_ID = [];
let PRIVATE_CHAT_ROOMS = [];

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
    const receiver = USER_ID.find(user => user.userData.wR === data);
    const sender = USER_ID.find(user => user.socketId === socket.id);
    let twoIds = [receiver.userData.wR, sender.userData.wR].sort().join("");
    console.log(twoIds)
    checkRooms(twoIds, socket, sender, receiver);
  });


  socket.on("privateMessage", data => {
    // console.log(data);
    // socket.emit("privateMessage", data);
    let msg = {sender: data.sender, message: data.message};
    addPrivateMessage(data.room, msg);
    socket.broadcast.to(data.receiverSocket).emit("privateMessage", data)
  });



  socket.on("disconnect", () => {
    USER_ID = USER_ID.filter(user => socket.id !== user.socketId)
    socket.broadcast.emit("usersUpdated", USER_ID);
  });
});


server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
});




function checkRooms(roomId, socket, sender, receiver) {
  // console.log(roomId);
  let roomy = PRIVATE_CHAT_ROOMS.find(room => room.roomId === roomId);
  if (roomy) {
    // console.log(`Roomy found and here it's id is ${roomy.roomId} with users: ${roomy.users.map(user => user.name)}`)
    socket.broadcast.to(receiver.socketId).emit("createPrivateRoom", roomy);
    socket.emit("createPrivateRoom", roomy);
  } else {
    // console.log(`Roomy not found we should create one`)
    const newRoom = new PrivateRoom(roomId, [sender, receiver]);
    PRIVATE_CHAT_ROOMS = [...PRIVATE_CHAT_ROOMS, newRoom]
    socket.broadcast.to(receiver.socketId).emit("createPrivateRoom", newRoom);
    socket.emit("createPrivateRoom", newRoom);
  }
  console.log(PRIVATE_CHAT_ROOMS)
};

function addPrivateMessage(roomId, message) {
  // console.log(message)
  let roomy = PRIVATE_CHAT_ROOMS.find(room => room.roomId === roomId);
  roomy.messages.push(new PrivateMessage(message.sender, message.message));
  // console.log(roomy.messages);
}