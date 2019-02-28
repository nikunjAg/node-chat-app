const socket = io();

socket.on('connect', function () {
    console.log('Connection established with server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = `<li>${message.from}: ${message.text}</li>`;
    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Nikunj',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it!', data);
// });

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'Nikunj',
        text: $('[name=message]').val()
    }, function () {

    });

});