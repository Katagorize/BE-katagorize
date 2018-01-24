const AWS = require('aws-sdk')
const s3 = new AWS.S3()

function writeCode(owner, kataName, code) {
    return s3.putObject({Bucket: 'kata-code', Key: `${owner}-${kataName}.js`, Body: code }, (err, data) => {
        if(err) console.log(err)
        else console.log(`Successfully uploaded ${owner}-${kataName}.js`)
    })
}

module.exports = writeCode