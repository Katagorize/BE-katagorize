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
        return Promise.all([writeCodeToFile(code, owner, kata), fetchTests(kata)])
    })
    .then(([code, test]) => {
        // spawn child processadd .
    })
    .catch(error => console.log(error))   
}

function writeCodeToFile (code, owner, kata) {
    return fs.writeFile(`${owner}-${kata}.js`, code, console.error)
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
        return writeTestToFile(kata, test)
    })
    .catch(error => console.log(error))
}

function writeTestToFile(kata, test) {
    return fs.writeFile(`${kata}.spec.js`, test, console.error)
}

module.exports = {getSingleScore, writeCodeToFile, fetchTests};