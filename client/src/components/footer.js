import React, { Component } from 'react'
import {FaTwitter} from 'react-icons/fa'
import Button from 'react-bootstrap'

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
      }

    scrollToTop = () => window.scrollTo(0, 0)


  render() {
    const footerText = {
      fontFamily: "Archivo",
      fontSize: "1.8vh",
      margin: "1vh",
      // display: "inline",
      color: "inherit"
    };

    const playlistWrapper = {
      marginLeft: "20vh"
    }
    return (
        <footer id="footer" className="footer" style={{paddingBottom: '30px', paddingTop: '40px'}}>
        <div id="footer-container" className="container" style={{textAlign: 'center'}}>
          <div className="row">
            <div className="col">
            <p style={{fontSize: '16px', fontWeight: 600}}>Spotify</p>

              <iframe src="https://open.spotify.com/embed/playlist/6HEegfWHhUcytwQFAm1QbK" width={300} height={80} frameBorder={0} style={{border: 'none', overflow: 'hidden'}} />

            </div>
            {/* <div className="col col-sm-4" style={{textAlign: 'center', display: 'inline'}}>
              <p style={{fontSize: '16px', fontWeight: 600}}>Frank Ocean</p>
              <iframe src="https://open.spotify.com/follow/1/?uri=spotify:artist:2h93pZq0e7k5yf4dywlkpM&size=detail&theme=light&quot;" width={300} height={56} scrolling="no" frameBorder={0} style={{border: 'none', overflow: 'hidden'}} />
            </div> */}
            <div className="col" style={{textAlign: 'center'}}>
            <p style={{fontSize: '16px', fontWeight: 600}}>Contact</p>

              <p style={footerText}>anahita.mohapatra@mail.mcgill.ca</p> 
              <ul class="social-network social-circle">
                <li><a href="https://www.linkedin.com/in/anahitamohapatra/" target="_blank"class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://www.instagram.com/anahitamohapatra/" target="_blank" class="icoInstagram" title="Instagram"><i class="fa fa-instagram"></i></a></li>
                <li><a href="https://twitter.com/anahita_moh" target="_blank" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                <br></br>
              </ul>
              <p style={footerText}>helen.kulka@mail.mcgill.ca</p>
              <ul class="social-network social-circle" style={{marginBottom:1}}>
                <li><a href="https://www.linkedin.com/in/helen-kulka-427b1414a/" target="_blank"class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://www.instagram.com/helenenenenenen/" target="_blank" class="icoInstagram" title="Instagram"><i class="fa fa-instagram"></i></a></li>
            </ul>

            </div>
          </div>
          <a href="https://github.com/helenkulka/spotify-taste-tester"style={footerText}>✿ github ✿ </a>
        </div>
      </footer>
    )
  }
}
