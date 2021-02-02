import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment } from 'react-bootstrap';
import './tracks.css'

export default class Tracks extends Component {
    constructor(props) {
        super(props);
        this.playAudio = this.playAudio.bind(this)
    }

    playAudio(track){
        var audio = new Audio(track.preview_url)
        audio.play()
        console.log("playing!!!",track.preview_url)
    }



    render() {
        return (
        <Container id="tracks" ref={this.props.ref1}>
            <div id="tracks-div">
            <p id="overlap-tracks-msg" style={{display:"inline"}} >
            <strong id="num-overlap" style={{fontSize:60,fontStyle:"bold",fontWeight:700,display:"inline", marginRight:10}} > { this.props.numTracksOverlap }</strong>
              shared songs. We found {this.props.numTracksOverlap} saved songs from Frank Ocean's playlist. Here's your favorites:</p>
            </div>
                <Container className="scrolling-wrapper">
                        {this.props.overlapTracks.map(p => (
                            <div className="one-track" onMouseEnter={this.playAudio(p)}>
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