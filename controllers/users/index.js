const pgp = require('pg-promise')({promiseLib: Promise})
const config = require('../../config').DB
const db = pgp(config)

function getAllUsers (req, res) {

    db.many(`SELECT students.username, kata_name, test_scores.test_score, test_scores.test_date FROM katas 
        JOIN test_scores ON katas.id = test_scores.kata_id
        JOIN students ON students.id = test_scores.student_id;`)
        .then(allUsers => {

            return allUsers.reduce((acc, user, i) => {
                console.log(i, acc)
                let test = acc.filter(el => el.name !== acc.name) 
                console.log('test', i)
                
                acc.push({
                    name: user.username,
                    katas: [{kataName: user.kata_name,
                    scores: [user.test_score]}]
                })
                console.log(acc)
                return acc 
            
            }, [])
        })
        .then(data => res.send(data))
}

function getSingleUser () {
    console.log('getting single user');
}

module.exports = {getAllUsers, getSingleUser};