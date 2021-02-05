import React, { useRef, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { blondedPopularity } from './getUserData';
import blonded_track_id_map from './track_id_name_map.json';
import './popularity.css'

var i,j=0;

export default class Popularity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popularity: 0,
            popularTracks: [],
            popularityMsg: "",
            popularity_percentage: 0
        };
    }

async calculateUserPopularity(blonded_track_id_map, track_overlap) {
    var popularity_set = await blondedPopularity(blonded_track_id_map);
    console.log(popularity_set);
    var minimum_popularity_tracks = [];
    var user_avg = 0;
    var user_min = 999;
    for (i in track_overlap) {
        var track_popularity = blonded_track_id_map[track_overlap[i]].popularity;
        user_avg += track_popularity;
        if (track_popularity < user_min) {
            user_min = track_popularity;
        }
    }
    user_avg = Math.floor(user_avg/Array.from(track_overlap).length);
    popularity_set = popularity_set.filter(value => value !== user_avg);
    popularity_set.push(user_avg);
    popularity_set.sort();
    var length_prior = popularity_set.length;
    var user_stat = popularity_set.slice(popularity_set.indexOf(user_avg) + 1, popularity_set.length + 1).length/length_prior;
    for (i in track_overlap) {
       if (blonded_track_id_map[track_overlap[i]].popularity === user_min) {
           minimum_popularity_tracks.push(blonded_track_id_map[track_overlap[i]]);
       }
    }

    var percentage = (user_stat * 100).toFixed(0);
    this.setState({popularity: user_stat, popularity_percentage: percentage,
        popularTracks:minimum_popularity_tracks.slice(Math.max(minimum_popularity_tracks.length - 3, 0))});

}

componentDidMount() {
    this.calculateUserPopularity(blonded_track_id_map, [...this.props.topTrackUris, ...this.props.overlapTrackUris]);

}

render() {
    return(
        <div>

<Container id="tracks-niche" ref={this.props.ref1}>
            <p id="overlap-tracks-msg" >
            <strong id="num-overlap" > { this.state.popularity_percentage }%</strong>
              niche. <br></br> Your shared songs are more niche than { this.state.popularity_percentage }% of Frank's favorites. 
              {
                  this.state.popularTracks.length > 1 ? <p style={{display:"inline"}}> Here's your best finds </p> 
                  : this.state.popularTracks.length === 1 ? <p style={{display:"inline"}}> Here's your best find </p> 
                  : <p> </p> 
              }
              </p>
            <Container className="scrolling-wrapper">
                        {this.state.popularTracks.map(p => (
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
        </div>
    )
}

}