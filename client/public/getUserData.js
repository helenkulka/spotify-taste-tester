const spotifyApi = new SpotifyWebApi();

async function getFirstName(access_token) {
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
  }).responseText;
  return res;
}

async function getPlaylist(access_token) {
    spotifyApi.setAccessToken(access_token);
    playlist =  new Array();
    offsets = [0, 100, 200, 300, 400];
    for (var i =0; i < offsets.length; i++) {
        var response = await spotifyApi.getPlaylistTracks("4ZRBmBrAFTAfwxtkBApvzv", {offset: offsets[i], limit: 100});
        for (j =0; j < response.items.length; j++) {
            playlist.push(response.items[j].track);
        }
      }
     return await playlist;
}
async function getLikedTracks(access_token, blonded_ids) {
  spotifyApi.setAccessToken(access_token);
  var contains = [];
  for (var i =0; i < 385; i+=50) {
    var ids = blonded_ids.slice(i,i+50);
    var index = ids.indexOf("null");
    if (index > -1) {
      ids.splice(index, 1);
    }
    var res = await spotifyApi.containsMySavedTracks(ids);
    for (j =0; j < res.length; j++) {
      contains.push(res[j]);
    }
  }
  return contains;

}

async function getSavedPlaylists(access_token) {

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
  }).responseText;
  return res;

}

async function getTracksFromPlaylist(access_token, tracks_url, offset) {
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
 }).responseText;
 return res;
}

async function fetchTop(type, access_token, offset, time_range) {
  top_songs =  [];
  var res = $.ajax({
    url: 'https://api.spotify.com/v1/me/top/' + type + '?limit=20&offset=' + offset + '&time_range=' + time_range,
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

async function getTopType(type, access_token) {
  var offsets = [];
  var total_songs = []
  for (var i = 0; i <= 60; i+=20) {
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
  uniq = [...new Set(merged)];
  return uniq;

}


function getSavedArtists() {
  var offsets = [];
  var total_songs = []
  for (var i = 0; i <= 60; i+=20) {
    offsets.push(i);
  }

}

function getSavedAlbums() {

}

function createRecommendedPlaylist() {

}