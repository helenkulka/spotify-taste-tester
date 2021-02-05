import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment } from 'react-bootstrap';
import './artists.css'

export default class Artists extends Component {
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
        <Container id="artists" ref={this.props.ref1}>
            <p id="overlap-tracks-msg">
                <strong id="num-overlap" > { this.props.numArtistsOverlap }  </strong>
                { this.props.numArtistsOverlap == 1 ? <p style={{display: 'inline'}}> shared artist </p> : <p style={{display: 'inline'}}> top artists </p>
                }
            <br></br> We found {this.props.numArtistsOverlap} of your top artists on Blonded with { this.props.recommendedTracksByArtistUris.length }
             {this.props.recommendedTracksByArtistUris == 1 ? <p style={{display: 'inline'}}> song </p> : <p style={{display: 'inline'}}> songs </p> } featured that you don't have saved.
            </p>
                <Container className="scrolling-wrapper">
                        {this.props.uniqueRecommendedTracksByArtistUris.map(p => (
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