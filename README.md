# React Socket Chat


Chat built with React with Redux and Bootstrap on the front-end and Node and Socket.io on the back-end


![Alt Text](https://media.giphy.com/media/LZ4Bns56kUk5xCrqNW/giphy.gif)

## Installing and Running Locally  

1. Navigate to project root directory

```

cd react-socket-chat

```
2. Install the Dependencies

```

npm install

```
3. Start Server first

```

npm run start-server

```

4. Start Client App in a separate Process

Open a new terminal/shell/console window in the same root directory and Start Client:

```
cd react-socket-chat // if you aren't already in the Project root

npm run start-client

```

App should start running on your localhost:3000

### Changing Server Port

Currently server port for sockets is hardcoded to 3001. In order to change it you need to edit the server and client index.js files

```javascript

// server socket at ./chat-server/index.js line 1

const  io = require("socket.io")(3001);

// client socket at ./src/index.js line 18

export  const  socket = io("http://localhost:3001");

```

## Built With

*  [Bootstrap 4](https://getbootstrap.com/) - Visual Component and Layout Styling

*  [React](https://reactjs.org/) - View Layer

*  [Redux](https://redux.js.org/) - Chat App State Management

*  [Socket.io](https://socket.io/) - Used for Communication between users

## Author

*  **Petar Marković** - [petmarkov](https://github.com/petmarkov)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details