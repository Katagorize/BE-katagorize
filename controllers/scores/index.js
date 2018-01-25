require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

function getSingleScore (req, res) {
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
        return writeCodeToFile(code, owner, kata)
    })
    .catch(error => console.log(error))   
}

function writeCodeToFile (code, owner, kata) {
    fs.writeFile(`${owner}-${kata}.js`, code, fetchTests(kata))
}

function fetchTests (kataName) {
    console.log('fetchTests called')
    const query = `
    query {
        repository(owner:"Katagorize", name:"kata-tests") {
            object(expression: "master:spec/${kataName}.spec.js") {
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
        fs.writeFile(`${kataName}.spec.js`, body.data.repository.object.text, () => {'writing of test and code complete'})
    })
    .catch(error => console.log(error))
}

module.exports = {getSingleScore, writeCodeToFile, fetchTests};