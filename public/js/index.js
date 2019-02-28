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
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    console.log('newLocationMessage', message);
    var li = `<li>${message.from}: <a href=${message.url} target="_blank">My current location</a></li>`;
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Nikunj',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it!', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'Nikunj',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val("");
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
    if(!navigator.geolocation)
        return alert('Geolocation is not supported by your browser');

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })

});