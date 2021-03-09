import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment, Button } from 'react-bootstrap';
import {createRecommendedPlaylist} from './getUserData';
import blonded_track_id_map from './track_id_name_map.json';
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.setState({isEdit:true, playlistId: playlist_id, saidYes: true, playlistLoaded: true})
    }

    async handleClickNo () { 
        this.setState({isEdit:true, saidYes: false})
    }

async componentDidMount() {
        var keys = Object.keys(blonded_track_id_map);
        var new_recs = [];
        var partial_top = [];
        var i;
        //taking only top 10 in common
        if (this.props.overlapTrackUris.length > 10) {
            partial_top = this.props.overlapTrackUris.splice(0, 10);
        } else {
            partial_top = this.props.overlapTrackUris;
        }
        //getting random 20
        for (i = 0; i<20; i++) {
            new_recs.push(keys[ keys.length * Math.random() << 0]);
        }
        //concatenating random, top 10 in common, and tracks by artist
        new_recs = [...partial_top, ...this.props.recommendedTracksByArtist, ...this.props.topTrackUris,...new_recs];
        var unique_recs = new Set(new_recs);
        recs = Array.from(unique_recs);
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
                {this.state.playlistLoaded ? 
                <div>
                <iframe id="playlist-embed" src={`https://open.spotify.com/embed/playlist/${this.state.playlistId}`} width="300" height="350" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <div id="success-save">
                    <p id="success-save-msg"> We successfully saved your playlist, enjoy! </p> 
                    <div id="share-social c-network">
                        <p className="social_share">share your results:</p>
                        <div className="c-network" ref={this.props.ref1}>
                {/* <p >Share your results!</p> */}
                <FacebookShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    quote={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    hashtag="#frankocean">
                    <FacebookIcon logoFillColor="white" size={"2rem"} round/>
                </FacebookShareButton>
                <TwitterShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <TwitterIcon logoFillColor="white" size={"2rem"} round/>
                </TwitterShareButton>
                <WhatsappShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <WhatsappIcon logoFillColor="white" size={"2rem"} round/>
                </WhatsappShareButton>
                <TumblrShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title="Frank Ocean Metric"
                    caption={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <TumblrIcon logoFillColor="white" size={"2rem"} round/>
                </TumblrShareButton>
                <RedditShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <RedditIcon logoFillColor="white" size={"2rem"} round/>
                </RedditShareButton>
                <FacebookMessengerShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    appId="715761142463541"
                    >
                    <FacebookMessengerIcon logoFillColor="white" size={"2rem"} round/>
                </FacebookMessengerShareButton>
        </div>
                    </div>
                </div>
                </div>

                : <p> 
                    {this.state.playlistId}
                </p>
                }
            </Container> :
            <div>
                <p id="success-save"> ok, we didn't save your playlist </p> 
                <p className="social_share">share your results:</p>
                <div className="c-network" ref={this.props.ref1}>
                {/* <p >Share your results!</p> */}
                <FacebookShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    quote={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    hashtag="#frankocean">
                    <FacebookIcon logoFillColor="white" size={"2rem"} round/>
                </FacebookShareButton>
                <TwitterShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <TwitterIcon logoFillColor="white" size={"2rem"} round/>
                </TwitterShareButton>
                <WhatsappShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <WhatsappIcon logoFillColor="white" size={"2rem"} round/>
                </WhatsappShareButton>
                <TumblrShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title="Frank Ocean Metric"
                    caption={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <TumblrIcon logoFillColor="white" size={"2rem"} round/>
                </TumblrShareButton>
                <RedditShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <RedditIcon logoFillColor="white" size={"2rem"} round/>
                </RedditShareButton>
                <FacebookMessengerShareButton
                    className="network"
                    url="https://www.backdrophome.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    appId="715761142463541"
                    >
                    <FacebookMessengerIcon logoFillColor="white" size={"2rem"} round/>
                </FacebookMessengerShareButton>
        </div>
            </div>
        }

</Container>
        )
    }
}