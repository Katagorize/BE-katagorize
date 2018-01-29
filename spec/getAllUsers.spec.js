process.env.NODE_ENV = 'development';
const {expect} = require('chai');
const app = require('../app');
const request = require('supertest')(app);

describe('getAllUsers', () => {
  it('returns a list of users', () => {
    return request
      .get('/api/users')
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).to.include('katagorize-student');
      });
  });
  it('returns a list of katas each student has completed with dates of tests', () => {
    return request
      .get('/api/users')
      .expect(200)
      .then(res => {
        expect(res.body['katagorize-student'].pigLatin).to.be.an('array');
      });
  });
});