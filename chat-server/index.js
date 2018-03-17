const io = require("socket.io")(3001);

const log = console.log;
const userHash = [];
const users = {};

io.on("connection", function (socket) {
  
  // user sent the nickname
  socket.on("USER_REGISTER", function (nickname) {
    // send all existing, connected users to the new user
    userHash.forEach(hash => {
      socket.emit("CHAT_ADD", { chatID: hash, nickname: users[hash].nickname})
    });
    
    // add the new user to the array
    users[socket.id] = {socket, nickname};
    userHash.push(socket.id);
    
    // send confirmation about successful registration to the user
    socket.emit("USER_REGISTER", socket.id);
    
    // send the new user to all the existing users
    socket.broadcast.emit("CHAT_ADD", { chatID: socket.id, nickname: users[socket.id].nickname });
    log("New user joined chat: " + socket.id + " => " + users[socket.id].nickname);
  });

  socket.on("MESSAGE_ADD", function(message) {
    log("source: ", socket.id, "destination: ", message.chatID);
    // replace source and destionation
    const destination = message.chatID;
    message.chatID = socket.id;
    message.clientOrigin = false;
    users[destination].socket.emit("MESSAGE_ADD", message);
    // send message to the origin socket - this way unrecieved messages are not displayed
    message.chatID = destination;
    message.clientOrigin = true;
    socket.emit("MESSAGE_ADD", message);
  });

  socket.on("disconnect", function () {
    // check if user is registered since not all connected sockets register
    if(users[socket.id] !== undefined){
      socket.broadcast.emit("CHAT_END", socket.id);
      log(users[socket.id].nickname + " left the chat");
      userHash.splice(userHash.indexOf(socket.id));
      delete users[socket.id];
    }
  });

});

log("Server started!");