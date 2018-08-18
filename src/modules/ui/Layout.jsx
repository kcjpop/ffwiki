import React from 'react'

export default function(props) {
  return (
    <div className="flex sans-serif f5">
      <div className="w-30-l">{props.sidebar}</div>
      <div className="w-70-l">{props.children}</div>
    </div>
  )
}
