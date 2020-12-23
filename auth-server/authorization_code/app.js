/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
const path = require('path');
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var callbackRouter = require("./routes/callback");
var cors = require("cors");

var client_id = '123';// Your client id
var client_secret = '456';// Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Or Your redirect uri


var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/callback", callbackRouter);

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
