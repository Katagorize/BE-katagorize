require('dotenv').config();
const fetch = require('node-fetch');

function getAllUsers () {
    console.log('getting all users');
}

function getSingleUser () {
    console.log('getting single user');
}

function getAllKatas () {
    console.log('getting all katas');
}

function getSingleKata () {
    console.log('getting single katas');
}

function getSingleScore (req, res) {
    const query = `
    query {
        repository(owner:"${req.params.user_name}", name:"morning-katas") {
            object(expression: "master:${req.params.kata_name}/${req.params.kata_name}.js") {
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
        console.log(code)
    })
    .catch(error => console.log(error))
    
}

module.exports = {getAllUsers, getSingleUser, getAllKatas, getSingleKata, getSingleScore};