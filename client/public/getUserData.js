const spotifyApi = new SpotifyWebApi();

async function getPlaylist(access_token) {
    spotifyApi.setAccessToken(access_token);
    playlist =  new Array();
    offsets = [0, 100, 200, 300];
    limits = [100, 100, 100, 34];
    for (i =0; i < offsets.length; i++) {
        var response = await spotifyApi.getPlaylistTracks("5FhPTMUBwGX8sU3qPD2stB", {offset: offsets[i], limit: limits[i]});
        for (j =0; j < response.items.length; j++) {
            playlist.push(response.items[j].track);
        }
      }
     return await playlist;
}
async function getLikedTracks(access_token, blonded_ids) {
  spotifyApi.setAccessToken(access_token);
  var contains = [];
  console.log(blonded_ids.length)
  for (i =0; i < 350; i+=50) {
    var ids = blonded_ids.slice(i,i+50);
    var res = await spotifyApi.containsMySavedTracks(ids);
    for (j =0; j < res.length; j++) {
      contains.push(res[j]);
    }
  }
  return contains;

}


function getSavedArtists() {

}

function getSavedAlbums() {

}

function createRecommendedPlaylist() {

}