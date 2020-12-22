import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      apiResponse: " " 
    }
  }

  callAPI() {
    fetch("http://localhost:8888/login", {mode: 'cors'})
    .catch(err => console.log(err))
  }

componentWillMount() {
    this.callAPI();
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

  getNowPlaying(){
      spotifyApi.getPlaylistTracks(1130791520, "5FhPTMUBwGX8sU3qPD2stB", { offset: 0, limit: 100 })
      .then((response) => {
        console.log(response)
      });
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">;{this.state.apiResponse}</p>
        <a href='' > Login to Spotify </a>
        {
        }
      </div>
    )
  }
}

export default App;
