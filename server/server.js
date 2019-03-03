const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/user');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
// Here 'io' is th web socket server
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createLocation', (coords) => {
        var user = users.getUser(socket.id);
        if (user)
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });

    socket.on('join', (param, callback) => {
        if (!isRealString(param.name) || !isRealString(param.room)) {
            callback('Name and Room are Required');
        } else {
            // To  join a specific room we use
            socket.join(param.room);
            users.addUser(socket.id, param.name, param.room);
            io.to(param.room).emit('updateUserList', users.getUsersList(param.room));
            // socket.leave(param.room);

            // io.emit -> io.to(roomName).emit
            // socket.broadcast.emit -> socket.broadcast.to(roomName).emit
            // socket.emit -> socket.emit
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
            socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', `${param.name} has joined`));
            callback();
        }
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));

        }
    });
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});