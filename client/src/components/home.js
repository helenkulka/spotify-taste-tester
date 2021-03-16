import React, { useRef, Component } from 'react';
import Loading from './loading.js';
import DiscoBall from './discoball.js'
import { Container, Row, Col } from 'react-bootstrap';
import {Carousel} from 'react-bootstrap'


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.homepage = React.createRef()
    this.state = {
      visiblesplash:true, 
      visiblehome:false,
      darkMode:false, 
      enterSite:false, 
      homepageDisplay:"none",
      splashscreenDisplay:"block",
      img1: 'https://imgur.com/MDIeLFM.png',
      img2:'https://imgur.com/GFBYR2Y.png',
    }
    this.darkMode = this.darkMode.bind(this);
    this.lightMode = this.lightMode.bind(this);
    this.enterSite = this.enterSite.bind(this);
    this.scrollHome = this.scrollHome.bind(this);
    this.removeSplash = this.removeSplash.bind(this);
    // this.homeVisible = this.homeVisible.bind.call(this);
    this.enterSiteInstructions = this.enterSiteInstructions.bind(this);
    this.timeout = this.timeout.bind(this);
  }


 async timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

  enterSite = () => this.setState({visiblesplash:false, enterSite:true}, this.props.onChangeParentStyle(this.state.darkMode,true));
  scrollHome = () => this.homepage.current.scrollIntoView()
  removeSplash = () => this.setState({splashscreenDisplay:"none"});
  homeVisible = () => this.setState({homepageDisplay:"block"});
  fadeInHome = () => this.setState({visiblehome:true});

  darkMode = () => this.setState({darkMode: true},
                  this.props.onChangeParentStyle(true,this.state.enterSite));

  lightMode = () => this.setState({darkMode: false}, 
                    this.props.onChangeParentStyle(false,this.state.enterSite));


  async enterSiteInstructions(){
    await this.enterSite()
    await this.timeout(200);
    await this.removeSplash()
    await this.homeVisible()
    await this.timeout(200);
    await this.fadeInHome()
  }

  changeImage = (change1, src) => {
    if (change1) {
      this.setState({
        img1: src
      });
    } else {
      this.setState({
        img2: src
      });
    }
  }



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
    <div className="section" style={{display:this.state.splashscreenDisplay}}>
    <div className={this.state.visiblesplash?'fadeIn':'fadeOut'} id="splashscreen" >
      <div className="row">
        <div className="col">
        <h1  className="title" id='title1'>FRANK OCEAN METRIC</h1>
        </div>
      </div>
      <div className="row">
      {darkModeOn ? (
        <button id="discobutton" onClick={this.enterSiteInstructions} style={{color:"#FFEADD"}}>
        <DiscoBall></DiscoBall>
        </button>      ) : (
          <button id="discobutton" onClick={this.enterSiteInstructions} style={{color:"rgb(255 233 207)"}}>
        <DiscoBall></DiscoBall>
        </button>      )}
      </div>
    </div>
    </div>
  </div>
  <div ref={this.homepage} className={this.state.visiblehome?'fadeIn':'fadeOut'} style={{display:this.state.homepageDisplay}}>
  <div id="homepage"  >
  <h1  className="title" id="title2">FRANK OCEAN METRIC</h1>
  <Container >
<div className="row">
  <div className="col col-6 col-sm-6">
                            <div>
                                <img className='home-photo' src={this.state.img1} onMouseEnter={() => this.changeImage(true, 'https://imgur.com/EeHRnx7.png')} onMouseLeave={() => this.changeImage(true, 'https://imgur.com/MDIeLFM.png')} alt="can't show image" />
                            </div>
  </div>
  <div className="col col-6 col-sm-6">

                            <div>
                            <img className='home-photo' src={this.state.img2} onMouseEnter={() => this.changeImage(false, 'https://imgur.com/oZ3TTPy.png')} onMouseLeave={() => this.changeImage(false, 'https://imgur.com/GFBYR2Y.png')}  alt="can't show image" />
                            </div>
    </div>
</div>

  <div className="row">                         
    <div className="col-md text-center">
      <p id="subtitle"> a website to compare your music taste to <br></br>Frank Ocean's playlists Blonded</p>
      <a href="https://frankoceanmetric.com/login" className="btn" id="login-btn">
        <span className="iconify" style={{margin:5}} data-icon="entypo-social:spotify-with-circle" data-inline="false" />
        Log in with Spotify
      </a>
    </div>
    </div>
    </Container> 
  {/* <div className="row">
      <div id="home-photo">
            <img className='beep' src={this.state.img1} onMouseEnter={() => this.changeImage(true, 'https://imgur.com/EeHRnx7.png')} onMouseLeave={() => this.changeImage(true, 'https://imgur.com/MDIeLFM.png')}/>
            <img className='beep' src={this.state.img2} onMouseEnter={() => this.changeImage(false, 'https://imgur.com/oZ3TTPy.png')} onMouseLeave={() => this.changeImage(false, 'https://imgur.com/GFBYR2Y.png')}/>
      </div>
  </div> */}
    {/* <div className="col col-6 col-sm-6 col-md-4" id="row-1-col-1" 
    onMouseEnter={() => this.someHandler}
    onMouseLeave={() => this.someOtherHandler}>
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
  </div> end of row 1 */}
  {/* <div className="row">
    <div className="col-md text-center">
      <p id="subtitle"> a website to compare your music taste to Frank Ocean's playlists Blonded</p>
      <a href="http://localhost:8888/login" className="btn" id="login-btn">
        <span className="iconify" style={{margin:5}} data-icon="entypo-social:spotify-with-circle" data-inline="false" />
        Log in with Spotify
      </a>
    </div> */}
    {/* <div className="col">
    </div>
    <div className="col col-12 col-sm-12 col-md-4 text-center" id="row-1-col-2">
      <p id="subtitle"> A website to compare your music taste to Frank Ocean's playlists Blonded</p>
    </div> */}
      {/* <iframe src="https://open.spotify.com/embed/playlist/4ZRBmBrAFTAfwxtkBApvzv" width="100%" height="400px" frameBorder={0} allow="encrypted-media" />
      <a href="http://localhost:8888/login" className="btn" id="login-btn">
        <span className="iconify" style={{margin:5}} data-icon="entypo-social:spotify-with-circle" data-inline="false" />
        Log in with Spotify
      </a> 
    </div>*/}
  </div> {/* end of row 2 */}
  </div> {/* section end */}
</div>

    )
  }
}