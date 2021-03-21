
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
import $ from 'jquery';
const spotifyApi = new SpotifyWebApi();
var i, j = 0;

export function getUserData(access_token) {
  try{
    var res = {}
    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      dataType: 'JSON',
      success: function(data) {
        // var res = data.responseJSON;
        console.log(data)
        res = data
        // res = data.responseJSON
        // console.log('res',res)
      },
      async: false,
      error: function (xhr, status, error) {
        var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
        var errorMessage = 'error in getUserData- ' + xhr.status + ': ' + xhr.statusText
        axios
        .post(`${url}`, {error: errorMessage, errorMsg: 'error in getUserData'})
        .catch(err => {
        });
        // console.log(xhr.status);
        console.log(error);
      }
    })
    console.log(res)
    return res;
  }catch(e) {
    var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
    if (e.response){
      axios
      .post(`${url}`, {error: e.response, errorMsg: 'error in getUserData'})
      .catch(err => {
      });
    } else {
      axios
      .post(`${url}`, {error: e, errorMsg: 'error in getUserData'})
      .catch(err => {
      });
    }
    // this.setState({recievedError: true, errorMsg: e});
    return;
  }
}

export async function getPlaylist(access_token) {
  try{
    spotifyApi.setAccessToken(access_token);
    var playlist =  new Array();
    var offsets = [0, 100, 200, 300, 400];
    var l = offsets.length;
    for (i =0; i < l; i++) {
        var response = await spotifyApi.getPlaylistTracks("4ZRBmBrAFTAfwxtkBApvzv", {offset: offsets[i], limit: 100});
        var l2 = response.items.length;
        for (j =0; j < l2; j++) {
            playlist.push(response.items[j].track);
        }
      }
     return await playlist;
    }catch(e) {
      var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
      if (e.response){
        axios
        .post(`${url}`, {error: e.response, errorMsg: 'error in getPlaylist'})
        .catch(err => {
        });
      } else {
        axios
        .post(`${url}`, {error: e, errorMsg: 'error in getPlaylist'})
        .catch(err => {
        });
      }
      // this.setState({recievedError: true, errorMsg: e});
      return;
    }
}

export async function getLikedTracks(access_token, blonded_ids) {
  try{
    spotifyApi.setAccessToken(access_token);
    var contains = [];
    for (i =0; i < 385; i+=50) {
      var ids = blonded_ids.slice(i,i+50);
      var index = ids.indexOf("null");
      if (index > -1) {
        ids.splice(index, 1);
      }
      spotifyApi.containsMySavedTracks(ids)
      .then(function (data){
        var l = data.length;
        for (j =0; j < l; j++) {
          contains.push(data[j]);
        }
      })
      .catch(function(error){
        var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
        axios
        .post(`${url}`, {error: error, errorMsg: 'error in getLikedTracks'})
        .catch(err => {
        });
        console.log(error)
      });
    }
    return contains;
  }catch(e) {
    var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
    if (e.response){
      axios
      .post(`${url}`, {error: e.response, errorMsg: 'error in getLikedTracks'})
      .catch(err => {
      });
    } else {
      axios
      .post(`${url}`, {error: e, errorMsg: 'error in getLikedTracks'})
      .catch(err => {
      });
    }
    // this.setState({recievedError: true, errorMsg: e});
    return;
  }
}

export async function getSavedPlaylists(access_token) {
  try{
    var res = {}
    $.ajax({
      url: 'https://api.spotify.com/v1/me/playlists/',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      dataType: 'JSON',
      success: function(data) {
        res = data
      },
      async: false,
      error: function (xhr, status, error) {
        var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
        var errorMessage = 'error in getSavedPlaylists- ' + xhr.status + ': ' + xhr.statusText
        axios
        .post(`${url}`, {error: errorMessage, errorMsg: 'error in getSavedPlaylists'})
        .catch(err => {
        });
        console.log(error);
      }
    })
    return res;
  }catch(e) {
    var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
    if (e.response){
      axios
      .post(`${url}`, {error: e.response, errorMsg: 'error in getSavedPlaylists'})
      .catch(err => {
      });
    } else {
      axios
      .post(`${url}`, {error: e, errorMsg: 'error in getSavedPlaylists'})
      .catch(err => {
      });
    }
  }
  return;
}

export async function getTracksFromPlaylist(access_token, tracks_url, offset) {
  try{
    var res = {}
    $.ajax({
    url: tracks_url +'?offset='+offset,
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    dataType: 'JSON',
    async: false,
    success: function(data){
      res = data
    },
    error: function (xhr, status, error) {
      var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
      var errorMessage = 'error in getTracksFromPlaylist- ' + xhr.status + ': ' + xhr.statusText
      axios
      .post(`${url}`, {error: errorMessage, errorMsg: 'error in getTracksFromPlaylist'})
      .catch(err => {
      });
      console.log(error);
    }
  })
  return res;
}catch(e) {
    var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
    if (e.response){
      axios
      .post(`${url}`, {error: e.response, errorMsg: 'error in getTracksFromPlaylist'})
      .catch(err => {
      });
    } else {
      axios
      .post(`${url}`, {error: e, errorMsg: 'error in getTracksFromPlaylist'})
      .catch(err => {
      });
    }
    // this.setState({recievedError: true, errorMsg: e});
    return;
  }
}

export async function fetchTop(type, access_token, offset, time_range) {
  try{
    var top_songs =  [];
    $.ajax({
      url: 'https://api.spotify.com/v1/me/top/' + type + '?limit=50&offset=' + offset + '&time_range=' + time_range,
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      dataType: 'JSON',
      success: function(data){
        var res = data
        console.log(res)
        for (var y=0; y<res.items.length; y++) {
          top_songs.push(res.items[y].id)
          }
        return top_songs;
      },
      async: false,
      error: function (xhr, status, error) {
        var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
        var errorMessage = 'error in fetchTop - ' + xhr.status + ': ' + xhr.statusText
        axios
        .post(`${url}`, {error: errorMessage, errorMsg: 'error in fetchTop'})
        .catch(err => {
        });
        console.log(error);
      }
    })
    return top_songs;
  }catch(e) {
    var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
    if (e.response){
      axios
      .post(`${url}`, {error: e.response, errorMsg: 'error in fetchTop'})
      .catch(err => {
      });
    } else {
      axios
      .post(`${url}`, {error: e, errorMsg: 'error in fetchTop'})
      .catch(err => {
      });
    }
    // this.setState({recievedError: true, errorMsg: e});
    return;
  }
}

export async function getTopType(type, access_token) {
  try{
    var offsets = [];
    var total_songs = []
    var top_songs = []
    var top_long = []
    var top_med = []
    var top_short = []

    for (var i = 0; i <= 100; i+=50) {
      offsets.push(i);
    }

    for (var j=0; j<offsets.length; j++) {
      top_long = await fetchTop(type, access_token, offsets[j], 'long_term');
      top_songs =  top_songs.concat(top_long);
      if (top_long.length < 50){
        break
      }
    }

    for (var j=0; j<offsets.length; j++) {
      top_med = await fetchTop(type, access_token, offsets[j], 'medium_term');
      top_songs =  top_songs.concat(top_med);
      if (top_med.length < 50){
        break
      }
    }

    for (var j=0; j<offsets.length; j++) {
      top_short = await fetchTop(type, access_token, offsets[j], 'short_term');
      top_songs =  top_songs.concat(top_short);
      if (top_short.length < 50){
        break
      }
    }

    total_songs.push(top_songs);

    var merged = [].concat.apply([], total_songs);
    var uniq = [...new Set(merged)];
    return uniq;
  }catch(e) {
    var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
    if (e.response){
      axios
      .post(`${url}`, {error: e.response, errorMsg: 'error in getTopType'})
      .catch(err => {
      });
    } else {
      axios
      .post(`${url}`, {error: e, errorMsg: 'error in getTopType'})
      .catch(err => {
      });
    }
    // this.setState({recievedError: true, errorMsg: e});
    return;
  }

}

export async function blondedPopularity(blonded_track_id_map) {
  try{
    var popularities = [];
    for (var track_id in blonded_track_id_map) {
      popularities.push(blonded_track_id_map[track_id].popularity);
    }
    return popularities.sort(); 
  }catch(e) {
    var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
    if (e.response){
      axios
      .post(`${url}`, {error: e.response, errorMsg: 'error in blondedPopularity'})
      .catch(err => {
      });
    } else {
      axios
      .post(`${url}`, {error: e, errorMsg: 'error in blondedPopularity'})
      .catch(err => {
      });
    }
    // this.setState({recievedError: true, errorMsg: e});
    return;
  }
}


export async function createRecommendedPlaylist(user_id, uris) {
  try{
    var playlist_obj = await spotifyApi.createPlaylist(user_id, {name: "❤ for u from blonded ❤"});
    uris = uris.map(i => 'spotify:track:' + i);
    spotifyApi.addTracksToPlaylist(user_id, playlist_obj.id, uris);
    return playlist_obj.id;
  }catch(e) {
    var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
    if (e.response){
      axios
      .post(`${url}`, {error: e.response, errorMsg: 'error in createRecommendedPlaylist'})
      .catch(err => {
      });
    } else {
      axios
      .post(`${url}`, {error: e, errorMsg: 'error in createRecommendedPlaylist'})
      .catch(err => {
      });
    }
    // this.setState({recievedError: true, errorMsg: e});
    return;
  }

}