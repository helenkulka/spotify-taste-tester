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
            <p id="overlap-tracks-msg">
                <strong id="num-overlap" > { this.props.numTracksOverlap }  </strong>
                { this.props.numTracksOverlap == 1 ? <p style={{display: 'inline'}}> shared song </p> : <p style={{display: 'inline'}}> shared songs </p>
                }
            <br></br> We found {this.props.numTracksOverlap} of your saved songs on Frank Ocean's playlists.
            </p>
                <Container className="scrolling-wrapper">
                        {this.props.overlapTracks.map(p => (
                            <div className="one-track">
                            <img id="track-artwork" key={p.id} src={p.artwork} alt="can't show image" />
                            <div className="text-wrapper">
                                <span id="track-name" key={p.id}> {p.name} <br></br>
                                    <span id="track-artist" key={p.id}> {p.artist} </span>
                                </span>
                            </div>
                            </div>
                        ))}
                </Container> 
        </Container>
        )
    }
}