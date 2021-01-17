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
            <p id="overlap-tracks-msg"> { this.props.overlapTracksMsg } </p>
                 {/* <Container className="scrolling-wrapper">
                    {this.props.overlapTracks.map(p => (
                        <div className="one-track">
                            <img id="track-artwork" key={p.id} src={p.artwork} alt="can't show image" />
                            <h2 id="track-name" key={p.id}> {p.name} </h2>
                            <p id="track-artist" key={p.id}> {p.artist} </p>
                        </div>
                ))}
                 </Container>  */}
        </Container>
        )
    }
}