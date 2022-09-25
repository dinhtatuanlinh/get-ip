const express = require("express");
var http = require('http');
var cors = require('cors')
const bodyParser = require("body-parser");

global.__base = __dirname + '/';
global.__pathConfig = __base + 'config/';
global.__pathRoutes = __base + 'routes/';

const viewEngine = require(__pathConfig + "viewEngine");
const initWebRoutes = require(__pathRoutes + "web");

let app = express();
//cấp phép truy cập api

viewEngine(app);

app.use(cors())
// use midleware bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", initWebRoutes(io, app));
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

server.listen(port, () => {
    console.log(`app is running at port: http://localhost:${port}`);
});