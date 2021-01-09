import * as React from "react"

function Stars(props) {
    const stursRef = React.createRef()

  return (
    <svg ref={stursRef} className="globe" viewBox="0 0 210 210" {...props}>
      <path
        className="stur"
        d="M48.036 42.036L44.5 48.5l-3.536-6.464L34.5 38.5l6.464-3.536L44.5 28.5l3.536 6.464L54.5 38.5l-6.464 3.536zM168.083 59.441l-3.536 6.464-3.535-6.464-6.465-3.536 6.465-3.535 3.535-6.465 3.536 6.465 6.464 3.535-6.464 3.536zM135.083 99.894l-3.536 6.464-3.535-6.464-6.465-3.536 6.465-3.536 3.535-6.464 3.536 6.464 6.464 3.536-6.464 3.536z"
      />
    </svg>
  )
}

export default Stars
