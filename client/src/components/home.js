import React, { useRef, Component } from 'react';
import Loading from './loading.js';
import DiscoBall from './discoball.js'
import {Carousel} from 'react-bootstrap'


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.homepage = React.createRef()
    this.state = {darkMode:true, enterSite:false, homepageDisplay:"none",splashscreenDisplay:"block"}
    this.darkMode = this.darkMode.bind(this);
    this.lightMode = this.lightMode.bind(this);
    this.enterSite = this.enterSite.bind(this)
    // this.executeScroll = this.executeScroll(this)
   
  }

  // executeScroll = () => this.homepage.current.scrollIntoView()

  enterSite = () => this.setState({homepageDisplay:"block", splashscreenDisplay:"none",enterSite:true}, this.props.onChangeParentStyle(this.state.darkMode,true));


  darkMode = () => this.setState({darkMode: true},
                  this.props.onChangeParentStyle(true,this.state.enterSite));

  lightMode = () => this.setState({darkMode: false}, 
                    this.props.onChangeParentStyle(false,this.state.enterSite));


  render() {
    const darkModeOn = this.state.darkMode
    return (
  <div className="container">
    {darkModeOn ? (
      <span style={{marginTop: 10}} type="button" id="mode-button" onClick={this.lightMode}>☼</span>
      ) : (
        <span style={{marginTop: 10}} type="button" id="mode-button" onClick={this.darkMode}>☾</span>
      )}

  <div className="d-flex justify-content-center">
    
    <div className="section" id="splashscreen" style={{display:this.state.splashscreenDisplay}}>
      <div className="row">
        <div className="col">
        <h1  className="title" id='title1'>THE FRANK OCEAN METRIC</h1>
        </div>
      </div>
      {/* <div className="row">
        <button id="welcome">
          Enter Site
        </button>
      </div> */}
      <div className="row">
      {darkModeOn ? (
        <button id="discobutton" onClick={this.enterSite} style={{color:"black"}}>
        <DiscoBall></DiscoBall>
        </button>      ) : (
          <button id="discobutton" onClick={this.enterSite} style={{color:"#ffd86b"}}>
        <DiscoBall></DiscoBall>
        </button>      )}
      </div>
    </div>
    
    {/* <button onClick={this.executeScroll} onMouseDown={this.executeScroll}>&#8595;
    </button> */}
  </div>
  <div ref={this.homepage}>
  <div id="home-page"  style={{display:this.state.homepageDisplay}}>
  <h1  className="title" id="title2">THE FRANK OCEAN METRIC</h1>
  <div className="row">
    <div className="col col-6 col-sm-6 col-md-4" id="row-1-col-1">
      <Carousel  fade="true" interval="15000">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/MDIeLFM.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/EeHRnx7.png"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
    <div className="col col-6 col-sm-6 col-md-4" id="row-1-col-2">
      <Carousel fade="true" interval="15000">
        <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://imgur.com/GFBYR2Y.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://imgur.com/oZ3TTPy.png"
              alt="First slide"
            />
          </Carousel.Item>
      </Carousel>  
    </div>
    <div className="col col-12 col-sm-12 col-md-4 text-center" id="row-1-col-3">
      <p id="subtitle"> A website to compare your music taste to Frank Ocean's playlists Blonded</p>
      <a href="http://localhost:8888/login" className="btn" id="login-btn">
        <span className="iconify" style={{margin:5}} data-icon="entypo-social:spotify-with-circle" data-inline="false" />
        Log in with Spotify
      </a>
    </div>
  </div> {/* end of row 1 */}
  <div className="row">
    <div className="col col-12 col-sm-6 col-md-5">
      <iframe src="https://open.spotify.com/embed/playlist/4ZRBmBrAFTAfwxtkBApvzv" width="100%" height="400px" frameBorder={0} allow="encrypted-media" />
    </div>
    <div className="d-none d-md-block col-md-2">
      <p id="japanese-vertical">フランク・オーシャン</p>
    </div>
    <div className="col col-12 col-sm-6 col-md-5">
      <img className="media-object" src="https://imgur.com/hqZX3it.png" style={{width: '100%'}} />
    </div>
  </div> {/* end of row 2 */}
  </div> {/* section end */}
</div>
</div>


    )
  }
}