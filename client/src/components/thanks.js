import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment, Button } from 'react-bootstrap';
import {createRecommendedPlaylist} from './getUserData';
import './thanks.css'
var recs = []
export default class ThankYouPage extends Component {
    constructor(props) {
        super(props);
        this.playAudio = this.playAudio.bind(this)

        this.state={
            isEdit:false,
            playlistId:"",
            playlistLoaded: false
           }
    }

    playAudio(track){
        var audio = new Audio(track.preview_url)
        audio.play()
        console.log("playing!!!",track.preview_url)
    }

    hideSpinner = () => {
        this.setState({
          playlistLoaded: true
        });
    };

    async handleClick () { 
        var playlist_id = await createRecommendedPlaylist(this.props.userId, recs);
        this.setState({isEdit:true, playlistId: playlist_id})
    }

    async componentDidMount() {
        console.log(this.props.recommendedTracksByArtist)
        recs = [...this.props.overlapTrackUris, ...await this.props.recommendedTracksByArtist, ...this.props.topTrackUris];
    }




    render() {
        return (
        <Container id="thanks" ref={this.props.ref1}>
        { !this.state.isEdit ? 
            <div>
                    <p id="thanks-msg"> we found some songs you might like, do u wanna save a playlist? </p>
                    <Button id="save-play-btn"
            onClick={() => this.handleClick()}>
                save recommendations
            </Button> 
            </div> : 
            <Container id="playlist-wrapper">
                <iframe id="playlist-embed"src={`https://open.spotify.com/embed/playlist/${this.state.playlistId}`} width="300" height="350" onLoad={this.hideSpinner} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                {this.state.playlistLoaded ?  
                <p id="success-save"> we successfully saved your playlist, enjoy! </p> : <p></p>
                }
            </Container>
        }

        </Container>
        )
    }
}