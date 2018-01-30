const pgp = require('pg-promise')({promiseLib: Promise});
const config = require('../../config').DB;
const db = pgp(config);


function getAllKatas (req, res) {
  db.many('SELECT kata_name, release_date FROM katas;')
    .then((data) => {
      res.send(data);
    });
}

function getSingleKata (req, res) {
  db.one('SELECT kata_name FROM katas WHERE kata_name = $1;', req.params.kata_name)
    .then((data) => {
      res.send(data);
    });
}

module.exports = {getAllKatas, getSingleKata};