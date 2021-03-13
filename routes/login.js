

var express = require("express");
var querystring = require('querystring');
var router = express.Router();

var client_id = '7c4ba681e3034fa0b7e28dfb7d5b353f';// Your client id
var redirect_uri = 'http://localhost:8888/callback';

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/', function(req, res) {

    var state = generateRandomString(16);
    var stateKey = 'spotify_auth_state';
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email user-top-read user-library-read playlist-read-private playlist-modify-private playlist-modify-public';
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
})

module.exports = router;