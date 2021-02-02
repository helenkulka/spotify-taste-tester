import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment } from 'react-bootstrap';
import './topTracks.css';

export default class TopTracks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Container id="top-tracks" ref={this.props.ref1}>
            <div id="tracks-div">
            <p id="overlap-tracks-msg" style={{display:"inline"}} >
            <strong id="num-overlap" style={{fontSize:60,fontStyle:"bold",fontWeight:700,display:"inline", marginRight:10}} > { this.props.overlapTopTracks.length }</strong>
            top songs. WOW! { this.props.overlapTopTracks.length } of your most listened to songs of all time overlap with Frank Ocean's favorites.
            </p>
            </div>

        <Container className="scrolling-wrapper">
                    {this.props.overlapTopTracks.map(p => (
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