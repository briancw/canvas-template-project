const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const express = require('express')
const webPort = 3008
const webPortSecure = 3443

let privateKey
let certificate
if (process.argv.includes('--local')) {
    privateKey = fs.readFileSync(path.resolve(__dirname, 'localcert.key'), 'utf8')
    certificate = fs.readFileSync(path.resolve(__dirname, 'localcert.crt'), 'utf8')
} else {
    privateKey = fs.readFileSync(path.resolve(__dirname, 'privkey.pem'), 'utf8')
    certificate = fs.readFileSync(path.resolve(__dirname, 'fullchain.pem'), 'utf8')
}

const credentials = {key: privateKey, cert: certificate}
const app = express()

// Quick and dirty way to serve Brotli compressed JS files
if (process.env.NODE_ENV === 'production') {
    app.get('*.js', (req, res, next) => {
        req.url += '.br'
        res.set('Content-Encoding', 'br')
        res.set('Content-Type', 'application/javascript; charset=UTF-8')
        next()
    })
}

app.use('/', express.static(path.resolve(__dirname, '../public')))

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(webPort, (err) => {
    if (err) {
        console.error(err)
    }
    console.log(`Serving HTTP on port ${webPort}`)
})

httpsServer.listen(webPortSecure, (err) => {
    if (err) {
        console.error(err)
    }
    console.log(`Serving HTTPS on port ${webPortSecure}`)
})
