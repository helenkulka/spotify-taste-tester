import React, { useRef, useEffect,Component } from 'react';
// import Stars from './sturs.js';
// import Disco from './disco.js';
import './discoball.css';
import { TweenMax, Power0, SteppedEase } from "gsap";



const DiscoBall = () => {
    // const globeRef = React.createRef()
    const clipPathRef = React.createRef() 
    const stursRef = React.createRef()
    const clipPathPathRef = React.createRef()
    const globeGRef = React.createRef()
    const lngsRef = React.createRef()
    const latsRef = React.createRef()
    const globeEllipseRef = React.createRef()
    const stursAllRef = React.createRef()




    useEffect(() => {

        // TweenMax.set(
        //     [ globeGRef.current, globeEllipseRef.current, stursRef.current, clipPathRef.current, clipPathPathRef.current], {
        //     transformOrigin: 'center'
        //   })

        // TweenMax.to(
        //     [clipPathRef.current, stursAllRef.current],
        //     6.9, 
        //     {rotation: 360,repeat: -1, ease: Power0.easeNone}
        //     );
        
        //     TweenMax.to(
        //         [clipPathRef.current, stursAllRef.current],
        //         3.45, 
        //         {scale: 1.2,repeat: -1, yoyo:true, ease: Power0.easeNone}
        //         );
            
            // TweenMax.to([lngsRef.current,latsRef.current], 3.45, {
            //     rotation: 360,
            //     repeat: -1,
            //     ease:SteppedEase.config(6)
            // })

      }, []);

    // render() {
      return (
        <div>
        <svg className="globe" viewBox="0 0 210 210" >
      <defs>
        <clipPath id="a" ref={clipPathRef}>
          <path ref={clipPathPathRef}
            fill="none"
            d="M0 0v210h210V0zm48.035 42.035L44.5 48.5l-3.535-6.465L34.5 38.5l6.465-3.535L44.5 28.5l3.535 6.465L54.5 38.5zm87.048 57.858l-3.536 6.465-3.535-6.465-6.465-3.535 6.465-3.536 3.535-6.464 3.536 6.464 6.464 3.536zm33-40.452l-3.536 6.464-3.535-6.464-6.465-3.536 6.465-3.535 3.535-6.465 3.536 6.465 6.464 3.535z"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#a)" ref={globeGRef}>
          <g  ref={globeGRef}>
        <circle cx={105} cy={105} r={100} />
        <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={84.7737} ry={100} />
        <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={69.5473} ry={100} />
        <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={54.321} ry={100} />
        <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={39.0947} ry={100} />
        <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={23.8683} ry={100} />
        <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={8.642} ry={100} />
        </g>
        <g  ref={globeGRef}>
          <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={100} ry={84.7737} />
          <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={100} ry={69.5473} />
          <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={100} ry={54.321} />
          <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={100} ry={39.0947} />
          <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={100} ry={23.8683} />
          <ellipse ref={globeEllipseRef} cx={105} cy={105} rx={100} ry={8.642} />
        </g>
      </g>
      {/* <Sturs></Sturs> */}
    </svg>
        <svg  ref={stursAllRef} className="globe" viewBox="0 0 210 210">
            <path  ref={stursRef} className="stur" d="M48.036 42.036L44.5 48.5l-3.536-6.464L34.5 38.5l6.464-3.536L44.5 28.5l3.536 6.464L54.5 38.5l-6.464 3.536zM168.083 59.441l-3.536 6.464-3.535-6.464-6.465-3.536 6.465-3.535 3.535-6.465 3.536 6.465 6.464 3.535-6.464 3.536zM135.083 99.894l-3.536 6.464-3.535-6.464-6.465-3.536 6.465-3.536 3.535-6.464 3.536 6.464 6.464 3.536-6.464 3.536z"/>
        </svg>
    </div>
      )
    }
//   }
export default DiscoBall;

