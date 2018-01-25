require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

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
        Promise.all([writeCodeToFile(code, owner, kata), fetchTests(kata)])
    })
    .then(([code, test]) => {
        console.log(code, test) 
    })
    .catch(error => console.log(error))   
}

function writeCodeToFile (code, owner, kata) {
    fs.writeFile(`${owner}-${kata}.js`, code, (err) => {
        if (err) console.log(err)
        else console.log('code written')
    })
}

function fetchTests (req, res) {
    const kata = req.params.kata_name
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
        return writeTestToFile(kata, test)
    })
    .catch(error => console.log(error))
}

function writeTestToFile(kata, test) {
    fs.writeFile(`${kata}.spec.js`, test, (err) => {
        console.log('test written!')
    })
}

module.exports = {getSingleScore, writeCodeToFile, fetchTests};