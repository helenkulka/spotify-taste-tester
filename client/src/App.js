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
      apiResponse: " " 
    }
    // console.log(this.state.loggedIn)

  }


  // function UserGreeting(props) {
  //   return <h1>Welcome back!</h1>;
  // }
  
  // function GuestGreeting(props) {
  //   return <h1>Please sign up.</h1>;
  // }
  // function Greeting(props) {
  //   const isLoggedIn = props.loggedIn;
  //   if (isLoggedIn) {
  //     return <UserGreeting />;
  //   }
  //   return <GuestGreeting />;
  // }



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

  render() {
    return (
      <div className="App">
        {/* <Greeting isLoggedIn={this.state.loggedIn} />, */}
        <div className="HomePage">
          <Home></Home>
          <Wave></Wave>
          <Footer></Footer>
          {/* <p>Logged In: str({this.state.loggedIn})</p> */}
          {/* <Loading></Loading> */}
        </div>
      </div>
    )
  }
}

export default App;
