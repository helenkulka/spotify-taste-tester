import React, { useRef, Component } from 'react';
import './loggedin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from './loading.js'
import { Container, Row, Col, Fragment } from 'react-bootstrap';
import blonded_artist_id_map from './artist_id_name_map.json';
import blonded_track_id_map from './track_id_name_map.json';
import { getTopType, getSavedPlaylists, getTracksFromPlaylist, getLikedTracks, blondedPopularity } from './getUserData';

const blonded_track_ids = Object.keys(blonded_track_id_map);

var user_track_ids = new Set();
var user_artist_ids = new Set(); 
var i,j,z = 0;

var overlap_tracks_msgs = [
    "we didn't find any shared songs :(",
    "u made the cut ur OK",
    "not bad kid.",
    "WOW! cool man, you like a lot of music!",
    "wait what? Frank - is that you?",
    "you and frank were switched at birth, probably. or you should just get outside more."
]
export default class LoggedIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName : "",
            overlapTracksMsg: "",
            overlapTopTracks: [],
            overlapTracks: [],
            itemsLoaded: false
        };
    }

    async calculateUserPopularity(blonded_track_id_map, track_overlap) {
        var popularity_set = await blondedPopularity(blonded_track_id_map);
        var popularity_length = Array.from(popularity_set).length;
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
        console.log("USER NICHENESS:", user_stat);
        console.log("MINIMUM POP LIST:", minimum_popularity_tracks);

    }

    setTopTracks(track_overlap) {
        var track_info = []
        for (i in track_overlap) {
            track_info.push(blonded_track_id_map[track_overlap[i]])
        }
        console.log(track_info)
        this.setState({overlapTopTracks: track_info});
    }

    willRenderTopTracks(num_top_tracks_overlap) {
        if (num_top_tracks_overlap !== 0) {
            if (num_top_tracks_overlap < 4) {

            }
        }
    }

    setOverlapTracksMsg(num_tracks_overlap) {
        var msg = "";
        if (num_tracks_overlap === 0) {
            msg = overlap_tracks_msgs[0];
          } else if (num_tracks_overlap < 5) {
            msg = overlap_tracks_msgs[1];
          } else if (num_tracks_overlap >= 5 && num_tracks_overlap < 20) {
            msg = overlap_tracks_msgs[2];
          } else if (num_tracks_overlap >= 20 && num_tracks_overlap < 50) {
            msg = overlap_tracks_msgs[3];
          } else if (num_tracks_overlap >= 50 && num_tracks_overlap < 100) {
            msg = overlap_tracks_msgs[4];
          } else if (num_tracks_overlap >= 100) {
            msg = overlap_tracks_msgs[5];
          }
          msg = msg + " you have " + num_tracks_overlap + " liked songs in common with Frank Ocean";
          this.setState({overlapTracksMsg: msg});
    }

    async getUserSavedTracks(track_overlap) {
        var bool_saved = await getLikedTracks(this.props.accessToken, blonded_track_ids);
        for (i in bool_saved) {
          if (bool_saved[i]) {
            if (!track_overlap.includes(blonded_track_ids[i])) {
              track_overlap.push(blonded_track_ids[i]);
            }
          }
        }
        return track_overlap;
    }

    async getUserPlaylistTracks() {
        var playlists = await getSavedPlaylists(this.props.accessToken);
        playlists = playlists.items;

        for (i in playlists) {
            //ignore blonded
          if (playlists[i].id === "6HEegfWHhUcytwQFAm1QbK") {
              continue;
          }
          var tracks_url = playlists[i].tracks.href;
          var offset = 0;
          while (offset < 1000) {
            var tracks = await getTracksFromPlaylist(this.props.accessToken, tracks_url, offset);
            tracks = tracks.items;
            for (j in tracks) {
                user_track_ids.add(tracks[j].track.id);
                for (z in tracks[j].track.artists) {
                    user_artist_ids.add(tracks[j].track.artists[z].id);
                }
            }

            if(tracks.length < 100){
                break
            }
            offset = offset + 100;
          }
        }

        var track_overlap = blonded_track_ids.filter(value => Array.from(user_track_ids).includes(value));
        return track_overlap;
    }

    async getUserTopTracks() {
        var top_songs = await getTopType('tracks', this.props.accessToken);
        var top_songs_overlap = blonded_track_ids.filter(value => top_songs.includes(value));
        return top_songs_overlap;
    }

    async componentDidMount() {
        this.setState({firstName: this.props.userData.display_name.split(" ")[0].toLowerCase()});
        var overlap_top_track_ids = await this.getUserTopTracks();
        var overlap_playlist_track_ids = await this.getUserPlaylistTracks();
        var overlap_all_track_ids = await this.getUserSavedTracks(overlap_playlist_track_ids);
        this.setOverlapTracksMsg(Array.from(overlap_all_track_ids).length);
        this.setTopTracks(Array.from(overlap_top_track_ids));
        this.calculateUserPopularity(blonded_track_id_map, overlap_all_track_ids);
        this.setState({overlapTracks: overlap_all_track_ids});
        this.setState({itemsLoaded:true})


    }

    render() {
        const dataLoaded = this.state.itemsLoaded
        return(
            <div>
            {dataLoaded ? (
                <div id="logged-in" className="fadeIn">
                <Container id="tracks">
                    <h2 id="first-name"> Hey { this.state.firstName },  </h2>
                    <p id="overlap-tracks-msg"> { this.state.overlapTracksMsg } </p>
                    <Row>
                        <Col id="top-tracks"> 
                        <h2>Top Tracks</h2>

                                {this.state.overlapTracks.map(p => {
                                      <div>
                                        <img id="track-artwork" key={p.id} src={p.artwork} alt="can't show image" />
                                        <h2 id="track-name" key={p.id}> {p.name} </h2>
                                        <p id="track-artist" key={p.id}> {p.artist} </p>
                                        <p>Anahita</p>
                                    </div>
                                })}
                        </Col>
                        <Col fluid id="niche-tracks"> 
                            niche songs 
                        </Col>
                    </Row>
                </Container>
            </div>
                
                ) : (

                    // null
                    <Loading></Loading>


            )}
        </div>
        )
    }
}

// ReactDOM.render(
//     <Loading />,
//     document.getElementById('root')
//   );