const pgp = require('pg-promise')({promiseLib: Promise})
const config = require('../../config').DB
const db = pgp(config)


function getAllKatas (req, res) {
    db.many('SELECT kata_name FROM katas;')
    .then((data) => {
        res.send(data);
    })
}

function getSingleKata () {
    console.log('getting single katas');
}

module.exports = {getAllKatas, getSingleKata};