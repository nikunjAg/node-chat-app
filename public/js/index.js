const socket = io();

socket.on('connect', function () {
    console.log('Connection established with server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('welcomeMessage', function (message) {
    console.log(message);
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
});