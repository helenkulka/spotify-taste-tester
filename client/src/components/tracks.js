import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment } from 'react-bootstrap';
import './tracks.css'

export default class Tracks extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
        <Container id="tracks" ref={this.props.ref1}>
            <div id="tracks-div">
            <p id="overlap-tracks-msg" style={{display:"inline"}} >
            <strong id="num-overlap" style={{fontSize:60,fontStyle:"bold",fontWeight:700,display:"inline", marginRight:10}} > { this.props.numTracksOverlap }</strong>
              shared songs. We found {this.props.numTracksOverlap} saved songs from Frank Ocean's playlist. Here are some of your favorites:</p>
            </div>

            {/* {this.props.overlapTracks.map(p => (
                        <div className="one-track">
                            <img id="track-artwork" key={p.id} src={p.artwork} alt="can't show image" />
                            <h2 id="track-name" key={p.id}> {p.name} </h2>
                            <p id="track-artist" key={p.id}> {p.artist} </p>
                        </div>
                ))} */}
            

                 <Container className="scrolling-wrapper">
                    {this.props.overlapTracks.map(p => (
                        <div className="one-track">
                            <img id="track-artwork" key={p.id} src={p.artwork} alt="can't show image" />
                            <h2 id="track-name" key={p.id}> {p.name} </h2>
                            <p id="track-artist" key={p.id}> {p.artist} </p>
                            {/* <audio><source key={p.id} src={p.preview_url}></source></audio> */}
                        </div>
                ))}
                 </Container> 
        </Container>
        )
    }
}