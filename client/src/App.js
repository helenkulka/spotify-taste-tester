import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Footer from './components/footer';
import Home from './components/home';
import Wave from './components/wave';
import Loading from './components/loading.js';
import LoggedIn from './components/loggedIn';
import { getUserData } from './components/getUserData';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props,context){
    super(props,context);
    const params = this.getHashParams();
    var access_token = params.access_token;
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
    }
    this.state = {
      loggedIn: access_token ? true : false,
      accessToken: access_token ? access_token : "",
      userData: {},
      backgroundColor:"black",
      color:"white",
      enteredSite: false
    }
  }

  onChangeStyle(backgroundColor,color) {
    this.setState({
        backgroundColor: backgroundColor,
        color: color
    })
}

enterSiteApp() {
  this.setState({
    enteredSite:true
  })
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

  async componentDidMount() {
    if (this.state.loggedIn) {
     var userData = await getUserData(this.state.accessToken);
      this.setState({userData: userData});
    }
  }
  render() {
    const enteredSite = this.state.enteredSite
    if (!(Object.keys(this.state.userData).length === 0)) {
      return(
        <div className="App">
        <LoggedIn {...this.state}></LoggedIn>
        </div>
      )
    }
    return (
      <body>
        <div className="App" style={{backgroundColor:this.state.backgroundColor, color:this.state.color}}>
          <div className="HomePage">
            <Home onChangeParentStyle={this.onChangeStyle.bind(this),this.enterSiteApp.bind(this)} ></Home>


            {enteredSite ? (
      <div>
      <Wave></Wave>
      <Footer></Footer>
      </div>
      ) : ( <div></div>
      )}

  
            
            <script></script>
            {/* <p>Logged In: str({this.state.loggedIn})</p> */}
            {/* <Loading></Loading> */}
          </div>
        </div>
      </body>
    )
  }
}

export default App;
