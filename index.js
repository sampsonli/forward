/**
 * Created by lichun on 2016/11/30.
 */
let https = require('https')
let fs = require('fs')
let forward = require('forward-request')
let express = require('express')
let fetch = require('node-fetch')
let app = express()

app.use((req,response,next)=>{
    if(~req.originalUrl.indexOf('/mapi')){
        forward.http(req, response, 'm.500.com', '113.105.144.58', 80, req.originalUrl);
    }else if(~req.originalUrl.indexOf('/static')){
        fetch(`http://wx.500.com${req.originalUrl}`).then((resp)=>resp.text()).then(res=>{
            response.setHeader('Content-Type','application/json')
            let datachart = (data)=>{
                console.log(data)
                response.end(JSON.stringify(data))
            };
            eval(res);
        })
    } else{
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
});
app.listen(3002, (err)=>{
    if(err){
        return
    }
    console.log('listening port: 3002')
})


