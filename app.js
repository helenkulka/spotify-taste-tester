const path = require('path');
var http = require('http');
var express = require('express'); // Express web server framework
var cookieParser = require('cookie-parser');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var callbackRouter = require("./routes/callback");
var indexRouter = require('./routes/index');
var errorRouter = require('./routes/error');
var infoRouter = require('./routes/info');
var cors = require("cors");
var bodyParser = require('body-parser');
const logger = require('heroku-logger')

var app = express();

require('dotenv').config()

var origin_val = process.env.NODE_ENV ? 'https://frankoceanmetric.com' : 'http://localhost:3000';
app.use(cors({
    origin: origin_val,
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', indexRouter);
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/callback", callbackRouter);
app.use("/error", errorRouter);
app.use("/info", infoRouter);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `${origin_val}`); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var port = process.env.NODE_ENV ? process.env.PORT : '8888';

var server = http.createServer(app);
var port_number = server.listen(process.env.PORT || 8888);
app.listen(port_number);

console.log(`Listening on ${port}`);