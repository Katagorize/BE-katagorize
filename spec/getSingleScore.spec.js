process.env.NODE_ENV = 'development'
const {expect} = require('chai')
const app = require('../app')
const getSingleScore = require('../controllers/scores/index')
const request = require('supertest')(app)


describe('getSingleScore', () => {
    it('returns a json file with a complete test report', () => {
        return request
        .get('/api/users/katagorize-student/katas/pigLatin/test')
        .expect(200)
        .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.tests).to.be.an('array')
            expect(res.body.failures).to.be.an('array')
            expect(res.body.passes).to.be.an('array')
            return;
        })
    });
    it('returns a 404 error if kata does not exist on students repo', () => {
        return request
        .get('/api/users/katagorize-student/katas/newKata/test')
        .expect(404)
        .then(res => {
            expect(res.body.message).to.equal('Kata not found')
            return;
        })
    })
})
