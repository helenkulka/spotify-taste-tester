import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment } from 'react-bootstrap';
import './topTracks.css'

export default class TopTracks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Container id="top-tracks" ref={this.props.ref1}>
            <p id="overlap-tracks-msg">
            <strong id="num-overlap" > { this.props.overlapTopTracks.length }</strong>
            { this.props.overlapTopTracks.length == 1 ? <p style={{display: 'inline'}}> top song </p> : <p style={{display: 'inline'}}> top songs </p> }
            <br></br> Wow! { this.props.overlapTopTracks.length } of your most listened to songs of all time overlap with Frank Ocean's favorites.
            </p>

        <Container className="scrolling-wrapper">
                    {this.props.overlapTopTracks.map(p => (
                        <div className="one-track">
                            <img id="track-artwork" key={p.id} src={p.artwork} alt="can't show image" />
                            <div className="text-wrapper">
                                <span id="track-name" key={p.id}> {p.name} <br></br>
                                    <span id="track-artist" key={p.id}> {p.artist} </span>
                                </span>
                            </div>
                            {/* <audio><source key={p.id} src={p.preview_url}></source></audio> */}
                        </div>
                ))}
                 </Container> 
        </Container>
        )
    }

}