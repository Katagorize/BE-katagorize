const {expect} = require('chai')
const fetchTests = require('../fetchTests')

describe('fetchTests', () => {
    it('returns code from test file in github repository', () => {
        return fetchTests('pigLatin').then((res) => {
             expect(res).to.be.a('string')
        })

    })
})