import React, { useRef, useEffect,Component } from 'react';
import './discoball.css';
import { TweenMax, Power0, SteppedEase } from "gsap";



const DiscoBall = () => {
    // const clipPathRef = React.createRef() 
    // const stursRef = React.createRef()
    // const clipPathPathRef = React.createRef()
    // const globeGRef = React.createRef()
    // const lngsRef = React.createRef()
    // const latsRef = React.createRef()
    // const globeEllipseRef = React.createRef()
    // const stursAllRef = React.createRef()


    useEffect(() => {

        TweenMax.set(['#globe g', '#globe ellipse', '.stur', '#clip-path', '#clip-path path'], {
            transformOrigin: 'center'
        })

        TweenMax.to(['#lngs','#lats'], 3.45, {
            rotation: 360,
            repeat: -1,
             ease:SteppedEase.config(6)
        })
        
        
        TweenMax.to(['#clip-path path', '#sturs'], 6.9, {
            rotation: 360,
            repeat: -1,
             ease: Power0.easeNone
        })
        
        TweenMax.to(['#clip-path path', '#sturs'], 3.45, {
            scale: 1.2,
            repeat: -1,
            yoyo: true,
             ease: Power0.easeNone
        })

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
            
      }, []);
      return (
        <div id="body-disco">
        <div className="container" id="disco">
        <svg xmlns="http://www.w3.org/2000/svg" class="globe" id="globe" viewBox="0 0 210 210">
  <defs>
    <clipPath id="clip-path">
      <path fill="none" d="M0 0v210h210V0zm48.0355 42.0355L44.5 48.5l-3.5355-6.4645L34.5 38.5l6.4645-3.5355L44.5 28.5l3.5355 6.4645L54.5 38.5zm87.0474 57.858l-3.5356 6.4645-3.5355-6.4645-6.4645-3.5355 6.4645-3.5356 3.5355-6.4644 3.5356 6.4644 6.4644 3.5356zm33-40.4527l-3.5356 6.4645-3.5355-6.4645-6.4645-3.5355 6.4645-3.5355 3.5355-6.4645 3.5356 6.4645 6.4644 3.5355z"/>
    </clipPath>
  </defs>
	<g clip-path="url(#clip-path)">
		<circle id="outline" cx="105" cy="105" r="100"/>
		<g id="lngs">
			<ellipse cx="105" cy="105" rx="84.7737" ry="100"/>
			<ellipse cx="105" cy="105" rx="69.5473" ry="100"/>
			<ellipse cx="105" cy="105" rx="54.321" ry="100"/>
			<ellipse cx="105" cy="105" rx="39.0947" ry="100"/>
			<ellipse cx="105" cy="105" rx="23.8683" ry="100"/>
			<ellipse cx="105" cy="105" rx="8.642" ry="100"/>
		</g>
		<g id="lats">
			<ellipse cx="105" cy="105" rx="100" ry="84.7737"/>
			<ellipse cx="105" cy="105" rx="100" ry="69.5473"/>
			<ellipse cx="105" cy="105" rx="100" ry="54.321"/>
			<ellipse cx="105" cy="105" rx="100" ry="39.0947"/>
			<ellipse cx="105" cy="105" rx="100" ry="23.8683"/>
			<ellipse cx="105" cy="105" rx="100" ry="8.642"/>
		</g>
	</g>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" class="globe" id="sturs" viewBox="0 0 210 210">
				<path class="stur" id="stur-1" d="M48.036 42.036L44.5 48.5l-3.536-6.464L34.5 38.5l6.464-3.536L44.5 28.5l3.536 6.464L54.5 38.5l-6.464 3.536z"/>
		    <path class="stur" id="stur-2" d="M168.083 59.441l-3.536 6.464-3.535-6.464-6.465-3.536 6.465-3.535 3.535-6.465 3.536 6.465 6.464 3.535-6.464 3.536z"/>
    		<path class="stur" id="stur-3" d="M135.083 99.894l-3.536 6.464-3.535-6.464-6.465-3.536 6.465-3.536 3.535-6.464 3.536 6.464 6.464 3.536-6.464 3.536z"/>
</svg>
        </div>
    </div>
      )
    }
export default DiscoBall;