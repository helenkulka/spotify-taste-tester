import React, { Component } from 'react'

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
              <p style={{fontSize: '12px'}}>anahita.mohapatra@mail.mcgill.ca</p>
              <p style={{fontSize: '12px'}}>helen.kulka@mail.mcgill.ca</p>
              <p style={{fontSize: '12px'}}>Montreal, QC</p>
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
