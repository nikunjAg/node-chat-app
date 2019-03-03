const expect = require('expect');

var {Users} = require('./user');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Nikunj',
            room: 'India'
        }, {
            id: '2',
            name: 'NikunjAgg',
            room: 'Aus'
        }, {
            id: '3',
            name: 'NikunjAggarwal',
            room: 'India'
        }];
    });

    it('should add new user', () => {
        var id = 12;
        var name = 'Nikunj';
        var room = 'India';
        var user = {id, name, room};
        var obj = new Users();
        var res = obj.addUser(id, name, room);
        expect(obj.users).toEqual([user]);
    });

    it('should return the user list of room India', () => {
        var nameList = users.getUsersList('India');
        expect(nameList[0]).toBe('Nikunj');
        expect(nameList[1]).toBe('NikunjAggarwal');
    });

    it('should return a user', () => {
        var user = users.getUser('1');
        expect(user.name).toBe('Nikunj');
        expect(user.room).toBe('India');
    });

    it('should not return a user', () => {
        var user = users.getUser('4');
        expect(user).toBeFalsy();
    });

    it('should remove a user', () => {
        var user = users.removeUser('2');
        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('4');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

});