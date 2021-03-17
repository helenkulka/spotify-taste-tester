import React, { useRef, Component} from 'react';
import './loggedin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import App from '../App';
import './jquery.pagepiling.js';
import './jquery.pagepiling.css';
import Loading from './loading.js'
import NicheTracks from './popularity.js'
import { Container, Row, Col, Fragment } from 'react-bootstrap';
import blonded_artist_id_map from './artist_id_name_map.json';
import blonded_track_id_map from './track_id_name_map.json';
import { getTopType, getSavedPlaylists, getTracksFromPlaylist, getLikedTracks, blondedPopularity } from './getUserData';
import { Waypoint } from 'react-waypoint';
import Tracks from './tracks';
import TopTracks from './topTracks';
import ThankYouPage from './thanks';
import Artists from './artists';
import Home from './home';

const blonded_track_ids = Object.keys(blonded_track_id_map);

var user_track_ids = new Set();
var user_artist_ids = new Set(); 
var i,j,z = 0;


var overlap_tracks_msgs = [
    "we didn't find anything in common, but we can still recommend you some stuff :)",
    "we didn't find any shared songs, but it looks like you still might have a bit in common with Frank Ocean! check out our recommendations below.",
    "if you run into Frank Ocean, we might not recommend talking about music. it looks like you don't have much in common",
    "if you run into Frank Ocean, you might have a bit to talk about. it looks like you have a similar taste in music",
    "not bad! you and Frank Ocean would have a lot to talk about, you have really similar music tastes.",
    "we're impressed, you like a lot of music! it looks like you and Frank Ocean have a lot in common.",
    "wait what? Frank - is that you? we found a lot in common between your music taste and Frank Ocean's.",
    "you and frank were switched at birth, probably. or you should just get outside more. we found ...too much in common between your music tastes."
]
export default class LoggedIn extends Component {


    constructor(props) {
        super(props);

        this.state = {
            firstName : "",
            userId: "",
            overlapIntroMsg: "",
            overlapTracksMsg: "",
            overlapTopTracksMsg: "",
            overlapTopTracks: [],
            overlapTracks: [],
            topTrackUris: [],
            overlapTrackUris: [],
            overlapTracksIds: [],
            numArtistsOverlap: 0,
            recommendedTracksByArtistUris: [],
            uniqueRecommendedTracksByArtistUris: [],
            recommendedTracksByArtist: [],
            numTracksOverlap: 0,
            itemsLoaded: false,
            sections: [],
            recievedError: false,
            ref1: React.createRef()
        };
 
        this.backgroundColor1 = this.backgroundColor1.bind(this);
        this.backgroundColor2 = this.backgroundColor2.bind(this);
        this.backgroundColor3 = this.backgroundColor3.bind(this);
    }

    handleNavigate() {
        let el = this.state.ref1;

        el.current.scrollIntoView({ behavior: 'smooth' })
    }


    setOverlapTopTracks(top_track_overlap) {
        var top_track_info = [];
        var msg = "";
        if (top_track_overlap.length > 0) {
            msg =  top_track_overlap.length + " top songs. WOW! " + top_track_overlap.length +  " of your most listened to songs of all time overlap with Frank Ocean's favorites.";
            for (i in top_track_overlap) {
                top_track_info.push(blonded_track_id_map[top_track_overlap[i]]);
            }
            if (top_track_info.length > 3) {
                msg = msg + " check out your top 3";
                top_track_info = top_track_info.slice(0,3);
            }
        }
        this.setState({overlapTopTracksMsg: msg, overlapTopTracks: top_track_info, topTrackUris: top_track_overlap});
    }

    setOverlapTracks(all_track_overlap, top_track_overlap) {
        var all_track_info = [];
        var all_track_uris = [];

        if (all_track_overlap.length > 0) {
            for (i in all_track_overlap) {
                if (!top_track_overlap.includes(all_track_overlap[i])) {
                    all_track_uris.push(all_track_overlap[i]);
                    all_track_info.push(blonded_track_id_map[all_track_overlap[i]]);
                }
            }
            if (all_track_info.length > 3) {
                all_track_info = all_track_info.slice(0,3);
            }
        }
        this.setState({overlapTracks: all_track_info, numTracksOverlap: all_track_overlap.length, overlapTrackUris: all_track_uris})
    }

    setOverlapIntroMsg(num_tracks_overlap, num_artists_overlap, num_top_tracks_overlap) {
        var msg = "";
        if (num_tracks_overlap === 0 && num_artists_overlap == 0 && num_top_tracks_overlap == 0) {
            msg = overlap_tracks_msgs[0];
          } else if (num_tracks_overlap === 0 && num_artists_overlap > 0 && num_top_tracks_overlap == 0){
            msg = overlap_tracks_msgs[1];
          } else if (num_tracks_overlap < 5) {
            msg = overlap_tracks_msgs[2];
          } else if (num_tracks_overlap >= 5 && num_tracks_overlap < 10) {
            msg = overlap_tracks_msgs[3];
          } else if (num_tracks_overlap >= 10 && num_tracks_overlap < 20) {
            msg = overlap_tracks_msgs[4];
          } else if (num_tracks_overlap >= 20 && num_tracks_overlap < 50) {
            msg = overlap_tracks_msgs[5];
          } else if (num_tracks_overlap >= 50 && num_tracks_overlap < 100) {
            msg = overlap_tracks_msgs[6];
          } else if (num_tracks_overlap >= 100) {
            msg = overlap_tracks_msgs[7];
          }
          this.setState({overlapIntroMsg: msg});
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
        this.setState({overlapTracksIds: track_overlap});
        return track_overlap;
    }

    async getUserPlaylistTracks() {
        var playlists = await getSavedPlaylists(this.props.accessToken);
        playlists = playlists.items;

        for (i in playlists) {
            //ignore playlists not owned by user
          if (this.props.userData.display_name !== playlists[i].owner.display_name) {
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
            if (tracks) {
                if(tracks.length < 100){
                    break
                }
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

    getTrackByArtist(value) {
        var recs = []
        //console.log(value);
        for (var key in blonded_track_id_map) {
            if (blonded_track_id_map[key]["artist"] === value) {
                recs.push(key)
            }
        }
        return recs;
    }

    async getArtistRecommendations() {
        var recs_by_artist = [];
        var top_artists = await getTopType('artists', this.props.accessToken);
        var num_overlap = 0;
        var recommended_uris = [];
        var unique_recommended = [];
        //console.log(top_artists);
        for (var artist_id in blonded_artist_id_map){
            if (top_artists.includes(artist_id)) {
                num_overlap += 1;
                var artist_name = blonded_artist_id_map[artist_id]["name"];
                var recommended_track = this.getTrackByArtist(artist_name);
                recommended_track = recommended_track.filter(val => !this.state.overlapTrackUris.includes(val) && !this.state.topTrackUris.includes(val));
                if (recommended_track.length > 0) {
                    recs_by_artist.push(...recommended_track);
                    num_overlap += 1;
                    unique_recommended.push(blonded_track_id_map[recommended_track[0]]);
                    for (i in recommended_track) {
                        recommended_uris.push(blonded_track_id_map[recommended_track[i]]);
                    }
                    if (recommended_track.length > 3) {
                        recommended_track = recommended_track.splice(0,3);
                    }
                    for (i in recommended_track) {
                        recs_by_artist.push(recommended_track[i]);
                    }
                }
            }
        }
        if (unique_recommended.length > 3) {
            unique_recommended = unique_recommended.slice(0,3);
        }
        this.setState({numArtistsOverlap: num_overlap, recommendedTracksByArtistUris: recommended_uris, uniqueRecommendedTracksByArtistUris: unique_recommended});
        return recs_by_artist;
    }

    intro() {
        return(
            <div class="section sec1">
                <Container id="intro">
                    <h2 id="first-name"> hey { this.state.firstName },  </h2>
                    <p id="overlap-intro-msg"> { this.state.overlapIntroMsg } </p>
                </Container>
            </div>
        );
    }

    thankYou() {
        return(
            <div class="section sec6">
                <ThankYouPage {...this.state}></ThankYouPage>
            </div>
        );
    }

    tracks() {
        return (
            <div class="section sec2">
                <Tracks {...this.state}> </Tracks> 
            </div>  
        );
    }

    topTracks() {
        return(
            <div class="section sec3">
                <TopTracks {...this.state}></TopTracks>
            </div>
        );
    }

    popularity() {
        return(
            <div class="section sec4">
                <NicheTracks {...this.state}></NicheTracks>
            </div>
        );
    }

    artists() {
        return(
            <div class="section sec5">
                <Artists {...this.state}></Artists>
            </div>
        );
    }




    async componentDidMount() {
        try {
            this.setState(
                {firstName: await this.props.userData.display_name.split(" ")[0].toLowerCase(), 
                userId: await this.props.userData.id});
            var overlap_top_track_ids = await this.getUserTopTracks();
            var overlap_playlist_track_ids = await this.getUserPlaylistTracks();
            var overlap_all_track_ids = await this.getUserSavedTracks(overlap_playlist_track_ids);
    
            //setting overlap track messages for all tracks and top tracks
            //will be rendered in respective components
            this.setOverlapTracks(overlap_all_track_ids, overlap_top_track_ids);
            
            this.setOverlapTopTracks(overlap_top_track_ids);
            this.setState({recommendedTracksByArtist: await this.getArtistRecommendations()});
            // this.calculateUserPopularity(blonded_track_id_map, overlap_all_track_ids);
            this.setState({itemsLoaded:true},this.props.onChangeParentStyle(true,true,1));

            //setting intro message for first page
            this.setOverlapIntroMsg(Array.from(overlap_all_track_ids).length, this.state.numArtistsOverlap, Array.from(overlap_top_track_ids).length);
        } catch(e) {
            this.setState({recievedError: true});
            return;
        }
        var toolTips = []
        if (this.state.overlapTracks.length == 0 && this.state.overlapTopTracks.length == 0 && this.state.numArtistsOverlap == 0) {
            toolTips = ['sec1','sec6'];
        } else if (this.state.overlapTracks.length == 0 && this.state.overlapTopTracks.length == 0 && this.state.numArtistsOverlap > 0) {
            toolTips = ['sec1','sec5','sec6'];
        } else if (this.state.overlapTracks.length == 0 && this.state.overlapTopTracks > 0 && this.state.numArtistsOverlap == 0) {
            toolTips = ['sec1', 'sec3', 'sec4', 'sec6'];
        } else if (this.state.overlapTracks.length > 0 && this.state.overlapTopTracks == 0 && this.state.numArtistsOverlap == 0) {
            toolTips = ['sec1', 'sec2', 'sec4', 'sec6'];
        } else if (this.state.overlapTracks.length > 0 && this.state.overlapTopTracks == 0 && this.state.numArtistsOverlap > 0) {
            toolTips = ['sec1', 'sec2', 'sec4', 'sec5' ,'sec6'];
        } else if (this.state.overlapTracks.length == 0 && this.state.overlapTopTracks > 0 && this.state.numArtistsOverlap > 0) {
            toolTips = ['sec1', 'sec3', 'sec4', 'sec5', 'sec6'];
        } else if (this.state.overlapTracks.length > 0 && this.state.overlapTopTracks > 0 && this.state.numArtistsOverlap == 0) {
            toolTips = ['sec1', 'sec2', 'sec3', 'sec4', 'sec6'];
        } else {
            toolTips = ['sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6'];
        }

        this.setState({sections: toolTips});

        $(document).ready(function() {
            $('#pagepiling').pagepiling({
                navigation: {
                    'textColor': '#fff',
                    'bulletsColor': '#fff',
                    'position': 'right',
                    'tooltips': toolTips
                }
            })
        });
    }

    backgroundColor1 = () => this.setState(this.props.onChangeParentStyle(true,true,1));
    backgroundColor2 = () => this.setState(this.props.onChangeParentStyle(true,true,2));
    backgroundColor3 = () => this.setState(this.props.onChangeParentStyle(true,true,3));
    



    render() {
        const dataLoaded = this.state.itemsLoaded;
        if (this.state.recievedError) {
            return(<App></App>);
        }
        else if (!dataLoaded) {
            return  (<Loading></Loading>)
        } else if (this.state.sections.length == 1) {
            return(
                <div id="pagepiling">
                    { this.intro() }
                    { this.thankYou() } 
                </div>
            );
        } else if (this.state.sections.length == 3) {
            return(
                <div id="pagepiling">
                    { this.intro() }
                    { this.artists() }
                    { this.thankYou() } 
                </div>
            );
        }
        else if(this.state.sections.length == 4 && this.state.sections.includes('sec2')) {
           // 1246
           return (                
                <div id="pagepiling">
                    {  this.intro() }
                    { this.tracks() }
                    {  this.popularity() }
                    { this.thankYou() }
                </div>
            );
        } else if (this.state.sections.length == 5 && this.state.sections.includes('sec2') && this.state.sections.includes('sec5')) {
            //12456
            return (                
                <div id="pagepiling">
                    {  this.intro() }
                    { this.tracks() }
                    {  this.popularity() }
                    { this.artists() }
                    { this.thankYou() }
                </div>
            );
        } else if (this.state.sections.length == 5 && this.state.sections.includes('sec2') && !this.state.sections.includes('sec5')) {
            //12456
            return (                
                <div id="pagepiling">
                    {  this.intro() }
                    { this.tracks() }
                    { this.topTracks() }
                    {  this.popularity() }
                    { this.thankYou() }
                </div>
            );
        }
        else if(this.state.sections.length == 4 && !this.state.sections.includes('sec5')) {
            //12456
            return (                
                <div id="pagepiling">
                    {  this.intro() }
                    { this.tracks() }
                    {  this.popularity() }
                    { this.artists() }
                    { this.thankYou() }
                </div>
            );
        }
        else if (this.state.sections.length == 4) {
                //1346
                return (                
                    <div id="pagepiling">
                        {  this.intro() }
                        { this.topTracks() }
                        {  this.popularity() }
                        { this.thankYou() }
                    </div>
                );
        } else if (this.state.sections.length == 5) {
            //13456
            return (                
                <div id="pagepiling">
                    {  this.intro() }
                    { this.topTracks() }
                    {  this.popularity() }
                    {  this.artists() }
                    { this.thankYou() }
                </div>
            );
        } else {
            return (                
                <div id="pagepiling">
                    {  this.intro() }
                    { this.tracks() }
                    { this.topTracks() }
                    {  this.popularity() }
                    {  this.artists() }
                    { this.thankYou() }
                </div>
            );
        }
    }
}

