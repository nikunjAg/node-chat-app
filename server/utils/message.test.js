const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message', () => {
        var res = generateMessage('Admin', 'Hey!');
        expect(res.from).toBe('Admin');
        expect(res.text).toBe('Hey!');
        expect(typeof res.createdAt).toBe('number');
    });
});