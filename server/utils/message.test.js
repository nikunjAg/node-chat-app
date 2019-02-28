const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message', () => {
        var res = generateMessage('Admin', 'Hey!');
        expect(res.from).toBe('Admin');
        expect(res.text).toBe('Hey!');
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var res = generateLocationMessage('Admin', 12, 21);
        expect(res.from).toBe('Admin');
        expect(res.url).toBe('https://www.google.com/maps?q=12,21');
        expect(typeof res.createdAt).toBe('number');
    });
});