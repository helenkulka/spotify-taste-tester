import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Footer from './components/footer';
import Home from './components/home';
import Wave from './components/wave';
import Loading from './components/loading.js';



const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    var access_token = params.access_token;
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
    }
    this.state = {
      loggedIn: access_token ? true : false,
      apiResponse: " ",
      firstName: "Friend",
      spotifyId: "",
      blonded_track_ids: new Set()
    }
  }



  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }


  async getFirstName() {
    spotifyApi.getMe()
    .then((response) => {
      this.setState({
        firstName: response.display_name,
        spotifyId: response.id
      });
      console.log("got first name!")
      console.log(this.state.spotifyId)
    })
  }

  async getBlondedPlaylist() {
    var playlist =  new Array();
    var offset = 0;
    var blonded_tracks = {}
    var blonded_tracks_ids_array=[]
    var blonded_tracks_ids_set = new Set()
    var numSavedInLibrary = 0
    var commonIds = []

    while (offset%100 == 0) {
      var changed = 0;
        const response = await spotifyApi.getPlaylistTracks("anahita23","4ZRBmBrAFTAfwxtkBApvzv", {offset: offset, limit: 100});
        for (var j =0; j < response.items.length; j++) {
            playlist.push(response.items[j].track);
            var name = response.items[j].track.name
            var id = response.items[j].track.id
            var popularity = response.items[j].track.popularity
            var artist = response.items[j].track.artists[0].name
            var cover = response.items[j].track.album.images[0].url
            var object = {name:name, artist:artist, cover: cover,popularity:popularity}
            blonded_tracks_ids_array.push(id)
            blonded_tracks_ids_set.add(id)
            blonded_tracks[id]=object

            changed = changed + 1;
        }
        if(changed < 100){
          break;
        }
        else{
          offset = offset + 100;
        }
      }

      var start = 0
      var len = blonded_tracks_ids_array.length
      while(start < len){
        var res = {}
        if(start + 50 < len){
          res = await spotifyApi.containsMySavedTracks(blonded_tracks_ids_array.slice(start,start+50));
        }
        else{
          res = await spotifyApi.containsMySavedTracks(blonded_tracks_ids_array.slice(start,len));
        }

        for(var k = 0; k <res.length; k++){
          if(res[k] == true){
            commonIds.push(blonded_tracks_ids_array[k])
          }
        }
        start = start+50;
      }

     console.log(blonded_tracks)
     console.log(commonIds)
     console.log(blonded_tracks_ids_array)
     console.log(blonded_tracks_ids_set)
     return playlist;
}



getAllData(){
  this.getFirstName();
  this.getBlondedPlaylist();
}

// getAllUserPlaylists(){
//   spotifyApi.getUserPlaylists(this.state.spotifyId)
//   .then(function(data) {
//     console.log('User playlists', data);
//   }, function(err) {
//     console.error(err);
//   });
// }


  render() {
    const isLoggedIn = this.state.loggedIn;
    return (

      <div className="App">

      {isLoggedIn ? (
        <h1 onLoad={this.getAllData()}>{this.state.firstName}</h1>
        // <Loading></Loading>
      ) : (
        <div className="HomePage">
        <Home></Home>
        <Wave></Wave>
        <Footer></Footer>
      </div>
      )}
        
      </div>
    )
  }
}

export default App;
