require('dotenv').config()

const fetch = require('node-fetch');

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
    .then(body => body.data.repository.object.text)
    .catch(error => console.log(error))
}

module.exports = fetchCode