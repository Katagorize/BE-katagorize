require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs')

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
    fs.writeFile(`${owner}-${kata}.js`, code, () => {'file written'})
}

module.exports = {getAllUsers, getSingleUser, getAllKatas, getSingleKata, getSingleScore};
