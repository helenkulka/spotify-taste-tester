import React, { Component } from 'react'
import {FaTwitter} from 'react-icons/fa'

export default class Footer extends Component {
  render() {
    return (
        <footer id="footer" className="footer" style={{paddingBottom: '30px', paddingTop: '30px'}}>
        <div id="footer-container" className="container" style={{textAlign: 'center'}}>
          <div className="row" style={{marginLeft: '10%'}}>
            <div className="col" style={{textAlign: 'left'}}>
              <p style={{fontSize: '16px', fontWeight: 600}}>Explore</p>
              <p style={{fontSize: '12px'}}>Compare Spotify Music</p>
              <p style={{fontSize: '12px'}}>Compare Movies</p>
            </div>
            <div className="col" style={{textAlign: 'left'}}>
              <p style={{fontSize: '16px', fontWeight: 600}}>Contact</p>
              <p style={{fontSize: '12px',marginBottom:0}}>anahita.mohapatra@mail.mcgill.ca</p> 
              <ul class="social-network social-circle">
                <li><a href="https://www.facebook.com/" target="_blank" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                <li><a href="https://www.linkedin.com/" target="_blank"class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://twitter.com/" target="_blank" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://www.instagram.com/" target="_blank" class="icoInstagram" title="Instagram"><i class="fa fa-instagram"></i></a></li>
                <li><a href="https://github.com/anahita-m" target="_blank" class="icoGithub" title="Github"><i class="fa fa-github"></i></a></li>
            </ul>
              <p style={{fontSize: '12px',marginTop:"1rem",marginBottom:0}}>helen.kulka@mail.mcgill.ca</p>
              <ul class="social-network social-circle" style={{marginBottom:1}}>
                <li><a href="https://www.facebook.com/ " target="_blank" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                <li><a href="https://www.linkedin.com/" target="_blank"class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://twitter.com/" target="_blank" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://www.instagram.com/" target="_blank" class="icoInstagram" title="Instagram"><i class="fa fa-instagram"></i></a></li>
                <li><a href="https://github.com/helenkulka" target="_blank" class="icoGithub" title="Github"><i class="fa fa-github"></i></a></li>
            </ul>
              <p style={{fontSize: '12px',marginTop:"1rem"}}>Montreal, QC</p>
            </div>
            <div className="col" style={{textAlign: 'left'}}>
              <p style={{fontSize: '16px', fontWeight: 600}}>Spotify</p>
              <iframe src="https://open.spotify.com/follow/1/?uri=spotify:artist:2h93pZq0e7k5yf4dywlkpM&size=detail&theme=light&quot;" width={300} height={56} scrolling="no" frameBorder={0} style={{border: 'none', overflow: 'hidden'}} />
            </div>
          </div>
          <p style={{fontSize: '12px', fontFamily: 'var(--bs-font-sans-serif)'}}>Made By Anahita Mohapatra and Helen Kulka</p>
        </div>
      </footer>
    )
  }
}
