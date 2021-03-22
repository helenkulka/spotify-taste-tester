
var express = require("express");
var querystring = require('querystring');
var router = express.Router();
var request = require('request');
require('dotenv').config()

var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  var client_id = process.env.REACT_APP_CLIENT_ID;// Your client id
  var client_secret = process.env.REACT_APP_CLIENT_SECRET;// Your secret
  var redirect_uri = process.env.NODE_ENV ? 'https://spotify-taste-tester.herokuapp.com/callback' : 'http://localhost:8888/callback';

router.get('/', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var state = generateRandomString(16);
    var stateKey = 'spotify_auth_state';
    res.cookie(stateKey, state);
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      console.log("ERROR: state mismatch");
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
          // var access_token = 'BQCAW3PZplTnxm0SkoZRrNQGaeHrFVEClukUcvBUJBssq2Lx6zyJleyIlbdUeETEj2oYTUap-DoB9KyWINYh4mOrn8lmX9cPT-R8WXSG2VPMi5fBNIHhv3nkU_408aXO79R1UAf0nl7CQosM4VsgHSGYPZRlnqMjT1ibZP2tVa35GZtP5PWEwz_V-5y6UULzPJpynnWWciFZg0eXYaYyWE7QjAsUQe1vl3yYjuX7k2y-eJIi39y9bhTv&refresh_token=AQClOmaIRA1x-617Mn_bugDVpf5Dj709Mw1RwX1MshNofFQpu42GeBsa9957Ta_XfxbizXdY3UYt6hOUZc_jhYfKueDk7o4FgNUpRZO1QLMMxEWB2C2Z89MiCKCI5w4QSvA'
          // var access_token = ' BQBXX7MBcYTAoJulVNcNjtBfiCpD8zrYkyhHOzD4lyYowvXnIoqnfery-PiabqFyBaKykXz_fKQJXQdGEyTSY_PqtwZ-8MgCcQfClAtlK7q5TLxtZelrONUJwYY_mDLYouNx56ZBPRE9can9nXtyEBglFzFvPwapxdO-JefNL0IK3X0F2VkgstXC4ywjIENyO7_tN-o-jaUqMb3T1fg0xqVHi7Oj6SE-sKB9uXX7IFmGYkqCxm-JErLp1co',
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          var url = process.env.NODE_ENV ? 'https://frankoceanmetric.com/#' : 'http://localhost:3000/#';
          console.log(`redirecting to ${url} with access code, ${access_token}`);
            res.redirect(`${url}` +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
           } else {
          console.log("ERROR: invalid_token", response.statusCode);
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });

  module.exports = router;