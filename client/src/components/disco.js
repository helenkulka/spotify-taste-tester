import * as React from "react"
import './disco.css';
import Sturs from './sturs.js';


function Disco(props) {
    const globeRef = React.createRef()
    const clipPathRef = React.createRef()      
      

  return (
    <svg ref={globeRef} className="globe" viewBox="0 0 210 210" {...props}>
      <defs>
        <clipPath id="a" ref={clipPathRef}>
          <path
            fill="none"
            d="M0 0v210h210V0zm48.035 42.035L44.5 48.5l-3.535-6.465L34.5 38.5l6.465-3.535L44.5 28.5l3.535 6.465L54.5 38.5zm87.048 57.858l-3.536 6.465-3.535-6.465-6.465-3.535 6.465-3.536 3.535-6.464 3.536 6.464 6.464 3.536zm33-40.452l-3.536 6.464-3.535-6.464-6.465-3.536 6.465-3.535 3.535-6.465 3.536 6.465 6.464 3.535z"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <circle cx={105} cy={105} r={100} />
        <ellipse cx={105} cy={105} rx={84.7737} ry={100} />
        <ellipse cx={105} cy={105} rx={69.5473} ry={100} />
        <ellipse cx={105} cy={105} rx={54.321} ry={100} />
        <ellipse cx={105} cy={105} rx={39.0947} ry={100} />
        <ellipse cx={105} cy={105} rx={23.8683} ry={100} />
        <ellipse cx={105} cy={105} rx={8.642} ry={100} />
        <g>
          <ellipse cx={105} cy={105} rx={100} ry={84.7737} />
          <ellipse cx={105} cy={105} rx={100} ry={69.5473} />
          <ellipse cx={105} cy={105} rx={100} ry={54.321} />
          <ellipse cx={105} cy={105} rx={100} ry={39.0947} />
          <ellipse cx={105} cy={105} rx={100} ry={23.8683} />
          <ellipse cx={105} cy={105} rx={100} ry={8.642} />
        </g>
      </g>
      {/* <Sturs></Sturs> */}
    </svg>
  )
}

export default Disco


