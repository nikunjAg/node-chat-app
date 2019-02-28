const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
// Here 'io' is th web socket server
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('welcomeMessage', {
        from: 'Admin',
        text: 'Welcome! You have joined the chat room',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('welcomeMessage', {
        from: 'Admin',
        text: 'New user have joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('User message', message);
        // This get send to all the user including the sender
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // Broadcast send the message to all other user except the sender
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});