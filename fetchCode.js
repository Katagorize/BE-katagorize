require('dotenv').config()

const fetch = require('node-fetch');
const writeCode = require('./s3')

function fetchCode (owner, kataName) {
    const query = `
    query {
        repository(owner:"${owner}", name:"morning-katas") {
            object(expression: "master:${kataName}/${kataName}.js") {
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
            'Authorization': `Bearer ${process.env.githubAccessToken}`
        }
    })
    .then(res => res.json())
    .then(body => {
        let code = body.data.repository.object.text
        return writeCode(owner, kataName, code)
    })
    .catch(error => console.log(error))
}

module.exports = fetchCode