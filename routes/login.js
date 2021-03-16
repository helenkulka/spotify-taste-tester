var express = require("express");
var querystring = require('querystring');
var router = express.Router();

var client_id = process.env.REACT_APP_CLIENT_ID; // Your client id
var redirect_uri = 'http://frankoceanmetric.com/callback';

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
    res.header("Access-Control-Allow-Origin", "https://spotify-taste-tester.herokuapp.com/");
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