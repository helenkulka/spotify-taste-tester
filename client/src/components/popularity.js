import React, { useRef, Component } from 'react';
import './popularity.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { blondedPopularity } from './getUserData';
import blonded_track_id_map from './track_id_name_map.json';

var i,j=0;
var popularity_msgs = [
    "we didn't find any shared songs :(",
    "u made the cut ur OK",
    "not bad kid.",
    "WOW! cool man, you like a lot of music!",
    "wait what? Frank - is that you?",
    "you and frank were switched at birth, probably. or you should just get outside more."
]

export default class Popularity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popularity: 0,
            popularTracks: [],
            popularityMsg: ""
        };
    }

async calculateUserPopularity(blonded_track_id_map, track_overlap) {
    var popularity_set = await blondedPopularity(blonded_track_id_map);
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
    var user_stat = 1 - popularity_set.slice(popularity_set.indexOf(user_avg) + 1, popularity_set.length + 1).length/length_prior;
    for (i in track_overlap) {
       if (blonded_track_id_map[track_overlap[i]].popularity === user_min) {
           minimum_popularity_tracks.push(blonded_track_id_map[track_overlap[i]]);
       }
    }
    this.setState({popularity: user_stat,
        popularTracks: minimum_popularity_tracks});
    console.log("USER NICHENESS:", user_stat);
    console.log("MINIMUM POP LIST:", minimum_popularity_tracks);

}

componentDidMount() {
    this.calculateUserPopularity(blonded_track_id_map, this.props.overlapTracksIds);

}

render() {
    return(
        <div>
            <Container id="tracks">
                <Row>
                    <Col fluid id="niche-tracks"> 
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

}