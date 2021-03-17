import React, { useRef, Component} from 'react';
import { Container, Row, Col, Fragment, Button } from 'react-bootstrap';
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
var recs = []
export default class SocialShare extends Component {
    constructor(props) {
        super(props);
        // this.props = props;
        console.log(this.props);
    }
    render() {
        return (
            <div className="c-network" ref={this.props.ref1}>
                {/* <p >Share your results!</p> */}
                <FacebookShareButton
                    className="network"
                    url="https://www.frankoceanmetric.com/"
                    quote={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    hashtag="#frankocean">
                    <FacebookIcon logoFillColor="white" size={"2rem"} round/>
                </FacebookShareButton>
                <TwitterShareButton
                    className="network"
                    url="https://www.frankoceanmetric.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <TwitterIcon logoFillColor="white" size={"2rem"} round/>
                </TwitterShareButton>
                <WhatsappShareButton
                    className="network"
                    url="https://www.frankoceanmetric.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <WhatsappIcon logoFillColor="white" size={"2rem"} round/>
                </WhatsappShareButton>
                <TumblrShareButton
                    className="network"
                    url="https://www.frankoceanmetric.com/"
                    title="Frank Ocean Metric"
                    caption={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <TumblrIcon logoFillColor="white" size={"2rem"} round/>
                </TumblrShareButton>
                <RedditShareButton
                    className="network"
                    url="https://www.frankoceanmetric.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    >
                    <RedditIcon logoFillColor="white" size={"2rem"} round/>
                </RedditShareButton>
                <FacebookMessengerShareButton
                    className="network"
                    url="https://www.frankoceanmetric.com/"
                    title={`I just took a quiz on The Frank Ocean Metric and found out I have ${this.props.numTracksOverlap} songs in common with Frank Ocean!`}
                    appId="715761142463541"
                    >
                    <FacebookMessengerIcon logoFillColor="white" size={"2rem"} round/>
                </FacebookMessengerShareButton>
        </div>

        )
    }
}