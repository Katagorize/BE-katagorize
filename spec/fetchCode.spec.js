const {expect} = require('chai')
const fetchCode = require('../fetchCode')

describe('FetchCode', () => {
    it('returns code from kata file in github repository', () => {
        const code = '// Please do not change the name of this function\nvar pigLatin = function (str) {\n  str = \'pigLatin\'\n\n  return str;\n};\n  \n  if (typeof module !== \'undefined\') {\n    module.exports = {pigLatin};\n  }\n'
        return fetchCode('katagorize-student', 'pigLatin').then((res) => {
             expect(res).to.equal(code)
        })

    })
})