const express = require("express");
let http = require('http');
let cors = require('cors')
const bodyParser = require("body-parser");
let axios = require("axios")
require('dotenv').config();


global.__base = __dirname + '/';
global.__pathConfig = __base + 'config/';
global.__pathRoutes = __base + 'routes/';
global.__pathControllers = __base + 'controllers/';
global.__pathServices = __base + 'services/';

const initWebRoutes = require(__pathRoutes + "web");
let sendEmail = require(__pathServices + "send_email")

let app = express();
//cấp phép truy cập api

app.use(cors())
// use midleware bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", initWebRoutes());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.locals.userInfo = '';
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('404'); ///khi không tìm được trang sẽ trả về trang báo lỗi có thông báo lỗi đầy đủ
    // res.render('error', { title: 'errorPage' });
});

let port = process.env.PORT || 6969; // ||hoặc
// PORT === undefined thì gán vào 6969
let server = http.createServer(app);
server.listen(port, () => {
    console.log(`app is running at port: http://localhost:${port}`);
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
    
}, 86400000)
86400
