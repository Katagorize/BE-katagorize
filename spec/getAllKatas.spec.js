process.env.NODE_ENV = 'development';
const {expect} = require('chai');
const app = require('../app');
const request = require('supertest')(app);

describe.only('getAllKatas', () => {
  it('retuns an array of all katas', () => {
    return request
      .get('/api/katas')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].kata_name).to.equal('pigLatin');
      });
  });
});