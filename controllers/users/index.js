const pgp = require('pg-promise')({promiseLib: Promise})
const config = require('../../config').DB
const db = pgp(config)


function getAllUsers () {
    console.log('getting all users');
}

function getSingleUser (req, res) {
    console.log(req.params, '***************');
    db.one('SELECT username, user_image FROM students WHERE username = $1;', req.params.user_name)
    .then((data) => {
        res.send(data);
    })
}

module.exports = {getAllUsers, getSingleUser};