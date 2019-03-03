// [{
//     id: '1322wsfsw54s5',
//     name: 'Nikunj',
//     romm: 'India'
// }]
var users = [];

// addUser(id, name, room)

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var user = this.getUser(id);
        this.users = this.users.filter((user) => user.id !== id);
        return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUsersList (room) {
        var users = this.users.filter((user, index, array) => user.room === room);
        var namesArray = users.map((user, index, array) => user.name);
        return namesArray;
    }
}

module.exports = {Users};