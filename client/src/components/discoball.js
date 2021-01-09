import React, { useRef, useEffect,Component } from 'react';
import Sturs from './sturs.js';
import Disco from './disco.js';
import { TweenMax, Power0, TimelineLite, TweenLite } from "gsap";



const DiscoBall = () => {

    // constructor(props){
    //     super(props);
    //     // reference to the DOM node
    //     this.myElement = null;
    //     // reference to the animation
    //     this.myTween = null;
    //   }
    
    //   componentDidMount(){
    //       var node = this.getDOMNode()
    //       TweenMax.to(node, 5, {x:299})
    //   }

    useEffect(() => {
        // TweenMax.fromTo(
        //   [blue.current, yellow.current],
        //   0.5,
        //   { y: 18 },
        //   { y: -18, yoyo: true, repeat: -1 }
        // );
        TweenMax.to(
            [Disco.clipPathRef.current, Sturs.stursRef.current],
            6.9, 
            {rotation: 360,repeat: -1, ease: Power0.easeNone}
            )
          
        // TweenMax.fromTo(
        //   [red.current, green.current],
        //   0.5,
        //   { y: -18 },
        //   { y: 18, repeat: -1, yoyo: true }
        // );
      }, []);

    // render() {
      return (
          <div>
            <Disco></Disco>
            <Sturs></Sturs>
          </div>
      )
    }
//   }
export default DiscoBall;

