// import SpotifyWebApi from '../node_modules/spotify-web-api-js/src/typings/spotify-web-api';
const spotifyApi = new SpotifyWebApi();

async function getPlaylist(access_token) {
    spotifyApi.setAccessToken(access_token)
    playlist =  new Array(332);
    offsets = [0, 100, 200, 300];
    limits = [100, 100, 100, 32];
    //console.log(spotifyApi.getPlaylistTracks("5FhPTMUBwGX8sU3qPD2stB", {offset: 0, limit: 100}))
    for (i =0; i < offsets.length; i++) {
        var response = await spotifyApi.getPlaylistTracks("5FhPTMUBwGX8sU3qPD2stB", {offset: offsets[i], limit: limits[i]});
        for (j =0; j < response.items.length; j++) {
            playlist.push(response.items[j].track);
        }
      }
     return await playlist;
}
function getLikedTracks(access_token) {
    spotifyApi.setAccessToken(access_token)
    spotifyApi.getPlaylistTracks("5FhPTMUBwGX8sU3qPD2stB")
    .then((response) => {
      console.log("blonded trax -> ", response)
    });
}

function getSavedArtists() {

}

function getSavedAlbums() {

}