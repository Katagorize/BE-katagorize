require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const spawn = require('child_process').spawn
const pgp = require('pg-promise')({promiseLib: Promise})
const config = require('../../config').DB
const db = pgp(config)


function getSingleScore (req, res, next) {
    const owner = req.params.user_name;
    const kata = req.params.kata_name;
    const query = `
    query {
        repository(owner:"${owner}", name:"morning-katas") {
            object(expression: "master:${kata}/${kata}.js") {
                ... on Blob {
                    text
                }
            }
        }
    }`
    return fetch('https://api.github.com/graphql', {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
            'Authorization': `Bearer ${process.env.accessToken}`
        }
    })
    .then(res => res.json())
    .then(body => {
        let code = body.data.repository.object.text

        return fs.writeFile(`./data/${kata}.js`, code, () => console.log('Solution written'))
    })
    .then(() => {
        return fetchTests(kata)
    })
    .then(() => {
        const cp = spawn('npm', ['run', 'test-solution'])
        let dataCount = 0
        let resultData;
        cp.stdout.on('data', (data) => {
            if (dataCount) {
                resultData = JSON.parse(data.toString())
                res.json(resultData)           
                fs.writeFile(`./data/results/${owner}.${kata}result.json`, data, () => console.log('Results written'))
            }
            dataCount++
        })
        
        cp.on('close', () => {
            let studentId;
            db.one('SELECT id FROM students WHERE username = $1;', owner)
            .then(stud => {
                studentId = stud.id;
                return db.one('SELECT id FROM katas WHERE kata_name = $1;', kata)
            })
            .then(kata => {
                return db.one('INSERT INTO test_scores (test_score, kata_id, student_id) VALUES ($1, $2, $3) RETURNING *;', [resultData.stats.passes, kata.id, studentId])
            })
            .then(data => {
                console.log(data)
                process.exit()
            })
            .catch(err => console.log(err))
        })
    })
    .catch(error => console.log(error))   
}


function fetchTests (kata) {
    const query = `
    query {
        repository(owner:"Katagorize", name:"kata-tests") {
            object(expression: "master:spec/${kata}.spec.js") {
                ... on Blob {
                    text
                }
            }
        }
    }`

    return fetch('https://api.github.com/graphql', {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
            'Authorization': `Bearer ${process.env.accessToken}`
        }
    })
    .then(res => res.json())
    .then(body => {
        const test = body.data.repository.object.text
        
        return fs.writeFile(`./data/spec/${kata}.spec.js`, test, () => console.log('Test written'))
    })
    .catch(error => console.log(error))
}

module.exports = {getSingleScore, fetchTests};