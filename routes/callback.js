
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
          // var access_token = 'BQA7DfndcCSccpwKQPqyDQTAI8t6owR1J0sMc6jdnHnmN7Bmhdiw8qC_x_rRLNtifk6ojEqi-nTsWUPIU7vbGJ4QfLanyCyqcMKGtmTdo1So3iVfsvpzKjnw2XIAOkmtg2IHMQy4TGJ1-meT2NTW3nU3PBw-jEmH8nwSLjspOg6WKEilcDUtspIERo7g8durAqM5NVK64i6llccqgLUQn2Kn4IwuzWLoAMuZfHodHM675OfvqQ&refresh_token=AQClBqWMdQZS_hEwcqJtEtC5eRVumjADkWR_veeednD5ZMViRR_6Pmx9hCJr-lOXXr4bLBsqxMOP3hkmAwy1OEEYFcXmtdsyaVapGnzHPTdpQjQ3q8PD-7kzie7D8mxQE3w'
          // var access_token ='BQBChKWjKTApB9T05tnB_iS6AAAroAjbJ_12vPaT3XV-lSu_xm-tK_8I0Sj5gUv3nIi5aAgWqHZ_oyceYaus4zkxriwPrKCqi6lSRyl6YrteENUHYCJ_cBHEsAbl_Qq8GUFDCH6ulCbc4AeGyJbgO2ypEOk4VeVSNe610EmfnYBnOaF3KrcE74s1qhjr_65xdJ-kvytdd-zP5q5CaHawReA5wuMnbLYciOmpqJiPyRJwCUko8aJdTIDX&refresh_token=AQByif_jn79pBnuZmqjDFeXzpV3nluZFZe8bZqkefBlHFyVYgy8s4XpTk7UjzyfXQgrjIxq_Jnh6v4RYu_7F3rPOnDjmsw0D3cyE-or0Ch-mvL7K8GiyR33TgyRndf2d68Y'
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