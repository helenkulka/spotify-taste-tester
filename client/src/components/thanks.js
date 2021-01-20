import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment } from 'react-bootstrap';
import './tracks.css'

export default class ThankYouPage extends Component {
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
        <Container id="thanks" ref={this.props.ref1}>
            <div id="tracks-div">
            <p id="overlap-tracks-msg" style={{display:"inline"}} >
            <strong id="num-overlap" style={{fontSize:60,fontStyle:"bold",fontWeight:700,display:"inline", marginRight:10}} >Thanks For Visiting!</strong></p>
            </div>
        </Container>
        )
    }
}