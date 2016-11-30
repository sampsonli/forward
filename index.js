/**
 * Created by lichun on 2016/11/30.
 */
let https = require('https')
let fs = require('fs')
let forward = require('forward-request')
let express = require('express')
let app = express()

app.use((req,resp,next)=>{
    if(~req.originalUrl.indexOf('/mapi')){
        forward.http(req, resp, 'm.500.com', '113.105.144.58', 80, req.originalUrl);
    }else {
        next()
    }
});

let server = https.createServer({
    key: fs.readFileSync(__dirname + '/config/500.key'),
    cert: fs.readFileSync(__dirname + '/config/500.crt')
},app);
server.listen(443, (err)=>{
    if(err){
        return
    }
    console.log('listening port: 443')
})



