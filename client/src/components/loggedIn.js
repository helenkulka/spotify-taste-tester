import React, { useRef, Component} from 'react';
import { getUserData } from './getUserData';
import './loggedin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import history from '../history';
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
import axios from 'axios';
import {
    isMobile
  } from "react-device-detect";
const blonded_track_ids = Object.keys(blonded_track_id_map);

var user_track_ids = new Set();
var user_artist_ids = new Set(); 
var i,j,z = 0;


var overlap_tracks_msgs = [
    "umm...do you know who frank ocean is? jk jk we didn't find anything in common, but we can still recommend you some stuff :)",
    "if you run into Frank Ocean at a party, maybe talk about something other than music? jk jk we didn't find any shared songs but it looks like you still have a bit in common!",
    "if you run into Frank Ocean at a party, maybe talk about something other than music? jk jk it looks like you have a bit in common!",
    "if you run into Frank Ocean at a party, you might have a bit to talk about! it looks like you have some music in common :)",
    "woahhh not bad! if you run into Frank Ocean at a party, you would have a lot to talk about! you have really similar music tastes :)",
    "we're impressed, you like a lot of music! if you run into Frank Ocean at a party, you guys would totally hit it off :)",
    "wait what? Frank - is that you? we found a lot in common between your music taste and Frank Ocean's :)",
    "you and frank were switched at birth, probably. or you should just get outside more. we found ...too much in common between your music tastes."
];

export default class LoggedIn extends Component {


    constructor(props) {
        super(props);
        history.push('/');
        this.state = {
            firstName : "",
            userData: {},
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
            errorMsg: "",
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
        try{
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
        }catch(e) {
        var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
        if (e.response){
            axios
            .post(`${url}`, {error: e.response, errorMsg: 'error in setOverlapTopTracks'})
            .catch(err => {
            });
          } else {
            axios
            .post(`${url}`, {error: e, errorMsg: 'error in setOverlapTopTracks'})
            .catch(err => {
            });
          }
        this.setState({recievedError: true, errorMsg: e});
        return;
      }
    }

    setOverlapTracks(all_track_overlap, top_track_overlap) {
        try{
            var all_track_info = [];
            var all_track_uris = [];
            var overlap_top_all_info = []
            var overlap_top_all_uris = []


                for (i in all_track_overlap) {
                    if (!top_track_overlap.includes(all_track_overlap[i])) {
                        all_track_uris.push(all_track_overlap[i]);
                        all_track_info.push(blonded_track_id_map[all_track_overlap[i]]);
                    }
                    else{
                        overlap_top_all_uris.push(all_track_overlap[i]);
                        overlap_top_all_info.push(blonded_track_id_map[all_track_overlap[i]]);
                    }
                }

                console.log('overlap_top_length',overlap_top_all_info.length)

                if (all_track_info.length < 3){
                    for(i in overlap_top_all_info){
                        console.log(i)
                        all_track_info.push(overlap_top_all_info[i]);
                        all_track_uris.push(overlap_top_all_uris[i]);
                        if (all_track_info.length == 3){
                            break;
                        }
                    }
                }

                
                if (all_track_info.length > 3) {
                    all_track_info = all_track_info.slice(0,3);
                }
                console.log('overlap',all_track_overlap)
            this.setState({overlapTracks: all_track_info, numTracksOverlap: all_track_overlap.length, overlapTrackUris: all_track_uris})
        }
        catch(e) {
            var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
            if (e.response){
                axios
                .post(`${url}`, {error: e.response, errorMsg: 'error in setOverlapTracks'})
                .catch(err => {
                });
              } else {
                axios
                .post(`${url}`, {error: e, errorMsg: 'error in setOverlapTracks'})
                .catch(err => {
                });
              }
            this.setState({recievedError: true, errorMsg: e});
            return;
        }
    }

    setOverlapIntroMsg(num_tracks_overlap, num_artists_overlap, num_top_tracks_overlap) {
        var msg = "";
        /* if they have 0 results on everything */
        if (num_tracks_overlap === 0 && num_artists_overlap == 0 && num_top_tracks_overlap == 0) {
            msg = overlap_tracks_msgs[0];
          } 
        /* if they have no shared songs but have something else in common */
        else if (num_tracks_overlap === 0 && num_artists_overlap > 0 || num_tracks_overlap === 0 && num_top_tracks_overlap > 0){
            msg = overlap_tracks_msgs[1];
          }
        /* if they have only a few songs in common and nothing else */ 
        else if (num_tracks_overlap < 5 && num_artists_overlap == 0 && num_top_tracks_overlap == 0) {
            msg = overlap_tracks_msgs[2];
          } 
        /* if they have a few songs in common + something else */ 
          else if (num_tracks_overlap < 5 && (num_artists_overlap > 0 || num_top_tracks_overlap > 0)) {
            msg = overlap_tracks_msgs[3];
          } 
          else if (num_tracks_overlap >= 5 && num_tracks_overlap < 10) {
            msg = overlap_tracks_msgs[4];
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
        try{
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
    }catch(e) {
        var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
        if (e.response){
            axios
            .post(`${url}`, {error: e.response, errorMsg: 'error in getUserSavedTracks'})
            .catch(err => {
            });
          } else {
            axios
            .post(`${url}`, {error: e, errorMsg: 'error in getUserSavedTracks'})
            .catch(err => {
            });
          }
        this.setState({recievedError: true, errorMsg: e});
        return;
        }
    }

    async getUserPlaylistTracks() {
        try{
        var playlists = await getSavedPlaylists(this.props.accessToken);
        if (Object.keys(playlists).length === 0 || !playlists.items) {
            playlists = []
            console.log("No playlists retrieved")
        }else{
            playlists = playlists.items;
        }
        if(playlists){
            for (i in playlists) {
                //ignore playlists not owned by user
              if (this.state.userData.display_name !== playlists[i].owner.display_name) {
                  continue;
              }
              var tracks_url = playlists[i].tracks.href;
              var offset = 0;
              while (offset < 1000) {
                var tracks = await getTracksFromPlaylist(this.props.accessToken, tracks_url, offset);
                if (Object.keys(tracks).length === 0 || !tracks.items) {
                    tracks = []
                    console.log("No tracks retrieved")
                } else{
                    tracks = tracks.items;
                }
                if(tracks){
                    for (j in tracks) {
                        if (tracks[j].track){
                            if (tracks[j].track.id){
                                user_track_ids.add(tracks[j].track.id);
                                for (z in tracks[j].track.artists) {
                                    user_artist_ids.add(tracks[j].track.artists[z].id);
                                }
                            }
                        }
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
        }

        var track_overlap = blonded_track_ids.filter(value => Array.from(user_track_ids).includes(value));
        return track_overlap;
    } catch(e) {
        var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
        if (e.response){
            axios
            .post(`${url}`, {error: e.response, errorMsg: 'error in getUserPlaylistTracks'})
            .catch(err => {
            });
          } else {
            axios
            .post(`${url}`, {error: e, errorMsg: 'error in getUserPlaylistTracks'})
            .catch(err => {
            });
          }
        this.setState({recievedError: true, errorMsg: e});
        return;
        }
    }

    async getUserTopTracks() {
        try{
            var top_songs = await getTopType('tracks', this.props.accessToken);
            var top_songs_overlap = blonded_track_ids.filter(value => top_songs.includes(value));
            return top_songs_overlap;
        }catch(e) {
            var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
            if (e.response){
                axios
                .post(`${url}`, {error: e.response, errorMsg: 'error in getUserTopTracks'})
                .catch(err => {
                });
              } else {
                axios
                .post(`${url}`, {error: e, errorMsg: 'error in getUserTopTracks'})
                .catch(err => {
                });
              }
            this.setState({recievedError: true, errorMsg: e});
            return;
        }
    }

    getTrackByArtist(value) {
        try{
            var recs = []
            //console.log(value);
            for (var key in blonded_track_id_map) {
                if (blonded_track_id_map[key]["artist"] === value) {
                    recs.push(key)
                }
            }
            return recs;
        }catch(e) {
            var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
            if (e.response){
                axios
                .post(`${url}`, {error: e.response, errorMsg: 'error in getTrackByArtist'})
                .catch(err => {
                });
              } else {
                axios
                .post(`${url}`, {error: e, errorMsg: 'error in getTrackByArtist'})
                .catch(err => {
                });
              }
            this.setState({recievedError: true, errorMsg: e});
            return;
        }
    }

    async getArtistRecommendations() {
        try{
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
        } catch(e) {
            var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
            if (e.response){
                axios
                .post(`${url}`, {error: e.response, errorMsg: 'error in getArtistRecommendations'})
                .catch(err => {
                });
              } else {
                axios
                .post(`${url}`, {error: e, errorMsg: 'error in getArtistRecommendations'})
                .catch(err => {
                });
              }
            this.setState({recievedError: true, errorMsg: e});
            return;
            }
    }

    intro() {
        return(
            <div class="section sec1">
                <Container id="intro">
                    <p id="overlap-tracks-msg">
                        <strong id="first-name"> hey { this.state.firstName },  </strong>
                        <p style={{marginTop:'1rem'}}> { this.state.overlapIntroMsg } </p>
                    </p>
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
            var user_data = await getUserData(this.props.accessToken);
            this.setState({userData: user_data});
            var firstName = await this.state.userData.display_name.split(" ")[0].toLowerCase()
            if(isMobile && firstName.length > 9){
                firstName = "there"
            }

            this.setState(
                {firstName: firstName, 
                userId: await this.state.userData.id});

        } catch(e) {
            var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
            if (e.response){
                axios
                .post(`${url}`, {error: e.response, errorMsg: 'error getting user data'})
                .catch(err => {
                });
              } else {
                axios
                .post(`${url}`, {error: e, errorMsg: 'error getting user data'})
                .catch(err => {
                });
              }
            this.setState({recievedError: true, errorMsg: e});
            return;
        }
        try {
            var overlap_top_track_ids = await this.getUserTopTracks();
            var overlap_playlist_track_ids = await this.getUserPlaylistTracks();
            var overlap_all_track_ids = await this.getUserSavedTracks(overlap_playlist_track_ids);
    
            //setting overlap track messages for all tracks and top tracks
            //will be rendered in respective components
            this.setOverlapTracks(overlap_all_track_ids, overlap_top_track_ids);
            
            this.setOverlapTopTracks(overlap_top_track_ids);
            this.setState({recommendedTracksByArtist: await this.getArtistRecommendations()});
            // this.calculateUserPopularity(blonded_track_id_map, overlap_all_track_ids);
            //setting intro message for first page
            this.setOverlapIntroMsg(Array.from(overlap_all_track_ids).length, this.state.numArtistsOverlap, Array.from(overlap_top_track_ids).length);
            this.setState({itemsLoaded:true},this.props.onChangeParentStyle(true,true,1));
        } catch(e) {
            var url = process.env.NODE_ENV == "production" ? "https://spotify-taste-tester.herokuapp.com/error" : "http://localhost:8888/error";
            if (e.response){
                axios
                .post(`${url}`, {error: e.response, errorMsg: 'error calculating track info'})
                .catch(err => {
                });
              } else {
                axios
                .post(`${url}`, {error: e, errorMsg: 'error calculating track info'})
                .catch(err => {
                });
              }
            this.setState({recievedError: true, errorMsg: e});
            return;
        }

        var toolTips = []

        toolTips.push('sec1')
        
        if(this.state.overlapTracks.length > 0){
            toolTips.push('sec2')
        }
        if(this.state.overlapTopTracks.length > 0){
            toolTips.push('sec3')
        }
        if(this.state.overlapTracks > 0 || this.state.overlapTopTracks.length > 0){
            toolTips.push('sec4')
        }
        if(this.state.numArtistsOverlap > 0){
            toolTips.push('sec5')
        }
        toolTips.push('sec6')

        // if (this.state.overlapTracks.length == 0 && this.state.overlapTopTracks.length == 0 && this.state.numArtistsOverlap == 0) {
        //     toolTips = ['sec1','sec6'];
        // } else if (this.state.overlapTracks.length == 0 && this.state.overlapTopTracks.length == 0 && this.state.numArtistsOverlap > 0) {
        //     toolTips = ['sec1','sec5','sec6'];
        // } else if (this.state.overlapTracks.length == 0 && this.state.overlapTopTracks > 0 && this.state.numArtistsOverlap == 0) {
        //     toolTips = ['sec1', 'sec3', 'sec4', 'sec6'];
        // } else if (this.state.overlapTracks.length > 0 && this.state.overlapTopTracks == 0 && this.state.numArtistsOverlap == 0) {
        //     toolTips = ['sec1', 'sec2', 'sec4', 'sec6'];
        // } else if (this.state.overlapTracks.length > 0 && this.state.overlapTopTracks == 0 && this.state.numArtistsOverlap > 0) {
        //     toolTips = ['sec1', 'sec2', 'sec4', 'sec5' ,'sec6'];
        // } else if (this.state.overlapTracks.length == 0 && this.state.overlapTopTracks > 0 && this.state.numArtistsOverlap > 0) {
        //     toolTips = ['sec1', 'sec3', 'sec4', 'sec5', 'sec6'];
        // } else if (this.state.overlapTracks.length > 0 && this.state.overlapTopTracks > 0 && this.state.numArtistsOverlap == 0) {
        //     toolTips = ['sec1', 'sec2', 'sec3', 'sec4', 'sec6'];
        // } else {
        //     toolTips = ['sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6'];
        // }

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
            console.log(this.state.errorMsg);
            alert('Error: Spotify is having an issue sending us information about your music selection.')
            return(<App></App>);
        }
        else if (!dataLoaded) {
            return  (<Loading></Loading>)
        } else {
            return(
                <div id="pagepiling">
                    {this.state.sections.includes('sec1') &&
                        this.intro()
                    }
                    {this.state.sections.includes('sec2') &&
                        this.tracks()
                    }
                    {this.state.sections.includes('sec3') &&
                        this.topTracks()
                    }
                    {this.state.sections.includes('sec4') &&
                        this.popularity()
                    }
                    {this.state.sections.includes('sec5') &&
                         this.artists()
                    }
                    {this.state.sections.includes('sec6') &&
                        this.thankYou()
                    }
                </div>
            );
        }
    }
}

