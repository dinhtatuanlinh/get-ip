let http = require('http')
let axios = require("axios")
require('dotenv').config()

let sendEmail = require("./services/send_email")

let port = process.env.PORT || 6969
let server = http.createServer(app)
server.listen(port, () => {
    console.log(`app is running at port: http://localhost:${port}`)
});

axios.get(
    'https://api.ipify.org?format=json',
).then(result =>{
    sendEmail(result.data.ip)
}).catch(err=>{
    console.log(err)
})
setInterval(()=>{
    axios.get(
        'https://api.ipify.org?format=json',
    ).then(result =>{
        console.log(result.data.ip)
        sendEmail(result.data.ip)
    }).catch(err=>{
        console.log(err)
    })
    
}, 43200000)
// 86400

function app(req, res){
    switch(req.method){
        case "GET":
            switch(req.url){
                case "/":
                    axios.get(
                        'https://api.ipify.org?format=json',
                    ).then(result =>{
                        res.writeHead(200, {'Content-Type':'application/json' })
                        res.end(result.data.ip)
                    }).catch(err=>{
                        res.writeHead(500, {'Content-Type':'application/json' })
                        res.end(err)
                    })
                    break
                default:
                    res.writeHead(404, {'Content-Type':'application/json' })
                    res.end("404 not found!!!")
            }
            break
        case "POST":
            break
    }
}