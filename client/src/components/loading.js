import React, { Component } from 'react';
import {App,spotifyApi} from '../App';
import './loading.css';
// import spotifyApi from App.js;

export default class Loading extends Component {



  render() {
    return (
        // style={{display: 'none'}}
        <div className="loading" id="loading">
            <div className="a" />
            <div className="b" />
            <div className="c" />
            <div className="d" />
            <div className="e" />
            <div className="f" />
            <div className="g" />
            <div className="h" />
            <div className="i" />   
            <div></div> 
        </div>
    )
  }
}
