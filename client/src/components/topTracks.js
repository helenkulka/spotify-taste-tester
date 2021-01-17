import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment } from 'react-bootstrap';

export default class TopTracks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Container id="top-tracks" ref={this.props.ref1}>
        <h3 id="top-tracks-msg"> { this.props.overlapTopTracksMsg }</h3>
        {/* {this.props.overlapTopTracks.map(p => (
                        <Col xs="4" id="one-track">
                            <img id="track-artwork" key={p.id} src={p.artwork} alt="can't show image" />
                            <h2 id="track-name" key={p.id}> {p.name} </h2>
                            <p id="track-artist" key={p.id}> {p.artist} </p>
                        </Col>
                ))} */}
        </Container>
        )
    }

}