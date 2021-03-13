const path = require('path');
var http = require('http');
var express = require('express'); // Express web server framework
var cookieParser = require('cookie-parser');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var callbackRouter = require("./routes/callback");
var indexRouter = require('./routes/index');
var cors = require("cors");

var app = express();


app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', indexRouter);
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/callback", callbackRouter);

var port = process.env.SERVER_PORT || '8888';
app.set('port', port);

var server = http.createServer(app);
var port_number = server.listen(process.env.SERVER_PORT || 8888);
app.listen(port_number);

console.log(`Listening on ${port}`);