var expect = require('expect');

var {isRealString} = require('./validation');

describe('is Real String', () => {
    it('should reject non string values', () => {
        var res = isRealString(12);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('should only allow string with non-space character', () => {
        var res = isRealString('12');
        expect(res).toBe(true);
    });
});