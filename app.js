const path = require('path');
var http = require('http');
var express = require('express'); // Express web server framework
var cookieParser = require('cookie-parser');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var callbackRouter = require("./routes/callback");
var indexRouter = require('./routes/index');
var cors = require("cors");
var bodyParser = require('body-parser');
const logger = require('heroku-logger')

var app = express();

require('dotenv').config()


app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', indexRouter);
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/callback", callbackRouter);

app.post('/err', function(req, res) {
    console.log("ERROR:",req.body.error);
});

app.post('/info', function(req, res) {
    console.log("INFO:", req.body.log);
});



var port = process.env.NODE_ENV ? process.env.PORT : '8888';

var server = http.createServer(app);
var port_number = server.listen(process.env.PORT || 8888);
app.listen(port_number);

console.log(`Listening on ${port}`);