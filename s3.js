const AWS = require('aws-sdk')
const s3 = new AWS.S3()

function writeCode(kataName, code) {
    return s3.putObject({Bucket: 'kata-code', Key: `${kataName}.js`, Body: code }, (err, data) => {
        if(err) console.log(err)
        else console.log(`Successfully uploaded ${kataName}.js`)
    })
}

module.exports = writeCode