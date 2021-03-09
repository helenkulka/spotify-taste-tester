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
      display: "inline",
      color: "inherit"
    };

    const playlistWrapper = {
      marginLeft: "20vh"
    }
    return (
        <footer id="footer" className="footer" style={{paddingBottom: '30px', paddingTop: '30px'}}>
        <div id="footer-container" className="container" style={{textAlign: 'center'}}>
          <div className="row">
            <div className="col">
              <iframe src="https://open.spotify.com/embed/playlist/6HEegfWHhUcytwQFAm1QbK" width={300} height={200} frameBorder={0} style={{border: 'none', overflow: 'hidden'}} />
            </div>
            <div className="col" style={{textAlign: 'center', display: 'inline', marginTop: "14vh"}}>
              <p style={footerText}>anahita.mohapatra@mail.mcgill.ca</p> 
              <ul class="social-network social-circle">
                <li><a href="https://www.linkedin.com/" target="_blank"class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://twitter.com/" target="_blank" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                <br></br>
            </ul>
              <p style={footerText}>helen.kulka@mail.mcgill.ca</p>
              <ul class="social-network social-circle" style={{marginBottom:1}}>
                <li><a href="https://www.linkedin.com/" target="_blank"class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://www.instagram.com/" target="_blank" class="icoInstagram" title="Instagram"><i class="fa fa-instagram"></i></a></li>
            </ul>
            </div>
          </div>
          <a href="https://github.com/helenkulka/spotify-taste-tester"style={footerText}>✿ github ✿ </a>
        </div>
      </footer>
    )
  }
}
