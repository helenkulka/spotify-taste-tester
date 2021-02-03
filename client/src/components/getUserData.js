
import SpotifyWebApi from 'spotify-web-api-js';
import $ from 'jquery';
const spotifyApi = new SpotifyWebApi();
var i, j = 0;

export function getUserData(access_token) {
  var res = $.ajax({
    url: 'https://api.spotify.com/v1/me',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    success: function(data) {
    },
    async: false,
    error: function (err) {
        console.log(err);
    }
  }).responseJSON;
  return res;
}

export async function getPlaylist(access_token) {
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
}
export async function getLikedTracks(access_token, blonded_ids) {
  spotifyApi.setAccessToken(access_token);
  var contains = new Set();
  for (i =0; i < 385; i+=50) {
    var ids = blonded_ids.slice(i,i+50);
    var index = ids.indexOf("null");
    if (index > -1) {
      ids.splice(index, 1);
    }
    var res = await spotifyApi.containsMySavedTracks(ids);
    var l = res.length;
    for (j =0; j < l; j++) {
      contains.add(res[j]);
    }
  }
  return contains;

}

export async function getSavedPlaylists(access_token) {

  var res = $.ajax({
    url: 'https://api.spotify.com/v1/me/playlists/',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    success: function(data) {
    },
    async: false,
    error: function (err) {
        console.log(err);
    }
  }).responseJSON;
  return res;

}

export async function getTracksFromPlaylist(access_token, tracks_url, offset) {
  var res = $.ajax({
   url: tracks_url +'?offset='+offset,
   type: 'GET',
   headers: {
     'Authorization': 'Bearer ' + access_token
   },
   async: false,
   error: function (err) {
       console.log(err);
   }
 }).responseJSON;
 return res;
}

export async function fetchTop(type, access_token, offset, time_range) {
  var top_songs =  [];
  var res = $.ajax({
    url: 'https://api.spotify.com/v1/me/top/' + type + '?limit=50&offset=' + offset + '&time_range=' + time_range,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    async: false,
    error: function (err) {
        console.log(err);
    }
  }).responseText;
  res = JSON.parse(res);
  for (var y=0; y<res.items.length; y++) {
    top_songs.push(res.items[y].id)
  }
  return top_songs;
}

export async function getTopType(type, access_token) {
  var offsets = [];
  var total_songs = []
  for (var i = 0; i <= 100; i+=50) {
    offsets.push(i);
  }
  for (var j=0; j<offsets.length; j++) {
    var top_long = await fetchTop(type, access_token, offsets[j], 'long_term');
    var top_med = await fetchTop(type, access_token, offsets[j], 'medium_term');
    var top_short = await fetchTop(type, access_token, offsets[j], 'short_term');
    var top_songs =  top_long.concat(top_med);
    top_songs = top_songs.concat(top_short);
    total_songs.push(top_songs);
  }
  var merged = [].concat.apply([], total_songs);
  var uniq = [...new Set(merged)];
  return uniq;

}

export async function blondedPopularity(blonded_track_id_map) {
  var popularities = [];
  for (var track_id in blonded_track_id_map) {
    popularities.push(blonded_track_id_map[track_id].popularity);
  }
  return popularities.sort(); 
}


export async function createRecommendedPlaylist(user_id, uris) {
  var playlist_obj = await spotifyApi.createPlaylist(user_id, {name: "❤ for u from blonded ❤"});
  uris = uris.map(i => 'spotify:track:' + i);
  spotifyApi.addTracksToPlaylist(user_id, playlist_obj.id, uris);
  return playlist_obj.id;

}