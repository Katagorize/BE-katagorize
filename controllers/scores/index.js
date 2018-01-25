require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const spawn = require('child_process').spawn

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


        cp.stdout.on('data', (data) => {
            if (dataCount) {
                res.json(JSON.parse(data.toString()))
            }
            dataCount++
            fs.writeFile(`./data/results/${owner}.${kata}result.json`, data, () => console.log('Results written'))
        })

        cp.on('close', () => {
            process.exit()
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