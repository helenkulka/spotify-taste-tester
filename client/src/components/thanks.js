import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment, Button } from 'react-bootstrap';
import {createRecommendedPlaylist} from './getUserData';
import {
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TumblrShareButton,
    TumblrIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  } from "react-share";
import './thanks.css'
import SocialShare from './social_share.js'

var recs = []
export default class ThankYouPage extends Component {
    constructor(props) {
        super(props);
        this.playAudio = this.playAudio.bind(this)

        this.state={
            isEdit:false,
            playlistId:"",
            playlistLoaded: false,
            saidYes: false
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

    async handleClickYes () { 
        var playlist_id = await createRecommendedPlaylist(this.props.userId, recs);
        this.setState({isEdit:true, playlistId: playlist_id, saidYes: true})
    }

    async handleClickNo () { 
        this.setState({isEdit:true, saidYes: false})
    }

    async componentDidMount() {
        recs = [...this.props.overlapTrackUris, ...this.props.recommendedTracksByArtist, ...this.props.topTrackUris];
    }




    render() {
        return (
        <Container id="thanks" ref={this.props.ref1}>
        { !this.state.isEdit ? 
            <div>
                    <p id="thanks-msg"> Would you like to save our recommendations for you? </p>
                    <div id="button-wrapper">
                        <Button id="save-play-btn"
                        onClick={() => this.handleClickYes()}>
                            yes
                        </Button> 
                        <p id="slash"> / </p>
                        <Button id="save-play-btn"
                        onClick={() => this.handleClickNo()}>
                            no
                        </Button> 
                    </div>
            </div> : 
                this.state.saidYes ?
            <Container id="playlist-wrapper">
                <iframe id="playlist-embed"src={`https://open.spotify.com/embed/playlist/${this.state.playlistId}`} width="300" height="350" onLoad={this.hideSpinner} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                {this.state.playlistLoaded ?  
                <div id="success-save">
                    <p id="success-save-msg"> We successfully saved your playlist, enjoy! </p> 
                    <div id="share-social c-network">
                        <p className="social_share">Share your results with friends:</p>
                        <SocialShare></SocialShare>
                    </div>
                </div>
                : <p> </p>

                }
            </Container> :
            <div>
                <p id="success-save"> Ok, we didn't save your playlist: </p> 
                <p className="social_share">Share your results with friends!</p>
                <SocialShare></SocialShare>
            </div>
        }

</Container>
        )
    }
}