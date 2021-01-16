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
      enteredSite: false,
      itemsLoaded: false

    }
  }

  onChangeStyle(darkModeStatus,enterSiteStatus,slideNumber) {

    if (darkModeStatus === true && this.state.loggedIn === true && slideNumber === 1){
      this.setState({
        backgroundColor: "#e8f693",
        color: "#302d4e",
        enteredSite: enterSiteStatus
      })  
    }

    else if (darkModeStatus === true && this.state.loggedIn === true && slideNumber === 2){
      this.setState({
        backgroundColor: "#c1c3f9",
        color: "#322f4f",
        enteredSite: enterSiteStatus
      })  
    }

    else if (darkModeStatus === true && this.state.loggedIn === true && slideNumber === 3){
      this.setState({
        backgroundColor: "#fccd97",
        color: "#2c2c52",
        enteredSite: enterSiteStatus
      })  
    }

    else if (darkModeStatus === true && this.state.loggedIn === true && slideNumber === 4){
      this.setState({
        backgroundColor: "#c0f8ca",
        color: "#332c53",
        enteredSite: enterSiteStatus
      })  
    }




    else if (darkModeStatus == false && this.state.loggedIn == true){
      this.setState({
        backgroundColor: "green",
        color: "black",
        enteredSite: enterSiteStatus
      })  
    }
    else if(darkModeStatus === true && this.state.loggedIn === false){
      this.setState({
        backgroundColor: "linear-gradient(0deg,black,#112130)",
        color: "white",
        enteredSite: enterSiteStatus
      })
    }
    else if (darkModeStatus === false && this.state.loggedIn === false){
      this.setState({
        backgroundColor: "linear-gradient(0deg,#d4a68e,#ffcdb3,#ffedd6)",
        color: "black",
        enteredSite: enterSiteStatus
      })  
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

  async componentDidMount() {
    this.setState({itemsLoaded:true})
    if (this.state.loggedIn) {
     var userData = await getUserData(this.state.accessToken);
      this.setState({userData: userData});
    }
  }
  render() {
    const enteredSite = this.state.enteredSite
    const dataLoaded = this.state.itemsLoaded

    if (!(Object.keys(this.state.userData).length === 0)) {
      return(
        <div className="App" style={{background:this.state.backgroundColor, color:this.state.color}}>
          <LoggedIn onChangeParentStyle={this.onChangeStyle.bind(this)} {...this.state}></LoggedIn>
        </div>
      )
    }
    return (
        <div className="App" style={{background:this.state.backgroundColor, color:this.state.color}}>
        {dataLoaded ? (
          <div className="HomePage">
            <Home onChangeParentStyle={this.onChangeStyle.bind(this)} ></Home>
            {enteredSite ? (
              <div>
                <Wave></Wave>
                <Footer></Footer>
              </div>
              ) : ( <div></div>)}
        </div>
          ) : (
            <div>
            <Loading></Loading>
            </div>
          )}
        </div>
      )
  }
}

export default App;
