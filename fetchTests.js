require('dotenv').config()

const fetch = require('node-fetch')

function fetchTests (kataName) {
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
            'Authorization': `Bearer ${process.env.githubAccessToken}`
        }
    })
    .then(res => res.json())
    .then(body => body.data.repository.object.text)
    .catch(error => console.log(error))
}



module.exports = fetchTests
