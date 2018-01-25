let expect = require('chai').expect;

let pigLatin = require('./pigLatin');

describe('pigLatin()', function () {
    'use strict';

    it('it will throw an error if there are no letters in the string.', function () {
        expect(pigLatin('12345')).to.equal('You must enter a valid string.')
    })

    it('if a vowel is given, "way" will be appended.', function () {
		expect(pigLatin('a')).to.equal('away');
		expect(pigLatin('algorithm')).to.equal('algorithmway');
    });
    
    it('It will push the first consonant to the end of the string and append "ay"', function () {
		expect(pigLatin('sheffield')).to.equal('effieldshay');
    });
    
    it('It will push consecutive consonant to the end of the string and append "ay"', function () {
		expect(pigLatin('cat')).to.equal('atcay');
    });
    
    it('the function will apply pigLatin to each word in a string.', function () {
		expect(pigLatin('keep on coding')).to.equal('eepkay onway odingcay');
	});
})
