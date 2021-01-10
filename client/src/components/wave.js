import * as React from "react"

function SvgComponent(props) {
  return (
    <svg viewBox="0 0 290 30" {...props}>
      <path
        className="wave"
        fill="none"
        stroke="#f61"
        strokeLinecap="round"
        d="M.1 25c38 0 45-20 75-20s50 20 75 20c38 0 45-5 75-20s50 20 75 20c38 0 45-20 75-20s50 20 75 20c38 0 45-20 75-20s50 20 75 20"
      />
    </svg>
  )
}

export default SvgComponent