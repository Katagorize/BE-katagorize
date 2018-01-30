const pgp = require('pg-promise')({ promiseLib: Promise });
const config = require('../../config').DB;
const db = pgp(config);
const _ = require('lodash');
const fetch = require('node-fetch');

function getAllUsers(req, res) {

  db.many(`SELECT students.username, kata_name, test_scores.test_score, test_scores.test_date FROM katas 
        JOIN test_scores ON katas.id = test_scores.kata_id
        JOIN students ON students.id = test_scores.student_id;`)
    .then(allUsers => {
      let result = {};
      allUsers.map((el) => {

        if (Object.keys(result).includes(el.username)) {
          if (Object.keys(result[el.username]).includes(el.kata_name)) {
            result[el.username][el.kata_name].push(`${el.test_date} score: ${el.test_score}`);
          }
          else {
            result[el.username][el.kata_name] = [`${el.test_date} score: ${el.test_score}`];
          }

        }
        else {
          let date = el.test_date;
          result[el.username] = {};
          result[el.username][el.kata_name] = [`${date} score: ${el.test_score}`];
        }
      });
      return result;
    })
    .then(data => res.send(data));
}

function getSingleUser(req, res) {
  const query = `query {
  repository(name: "morning-katas", owner:"${req.params.user_name}") {
    object(expression: "master:") {
    ... on Tree{
      entries{
        name
        type
      }
    }
  }
  }
}`;

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      'Authorization': `Bearer ${process.env.accessToken}`
    }
  })
    .then(res => res.json())
    .then(files => {
      const katas = files.data.repository.object.entries.filter((file) => {
        return file.type === 'tree';
      })
      
      res.send({katas})
    });
}

function addUser(req, res) {
  db.any('SELECT * FROM students WHERE username = $1;', [req.params.user_name])
    .then((student) => {
      if (student.length > 0) res.json('user already exists');
      else {
        db.one('INSERT INTO students (username, user_password, user_image) VALUES ($1, crypt($2, gen_salt(\'bf\', 8)), $3) RETURNING *;', [req.params.user_name, req.body.password, req.body.user_image])
          .then((data) => {
            console.log(data);
            res.send(data);
          });
      }
    })
    .catch(error => console.log(error));

}

function userLogin(req, res) {
  db.one('SELECT * FROM students WHERE username=$1 AND user_password = crypt($2, user_password)', [req.params.user_name, req.headers.authorization])
    .then((data) => {
      res.send(data);
    })
    .catch(error => console.log(error));
}

module.exports = { getAllUsers, getSingleUser, addUser, userLogin };