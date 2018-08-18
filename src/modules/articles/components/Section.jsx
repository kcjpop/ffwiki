import React from 'react'

export default function(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.content.map((p, index) => (
        <p className="lh-copy" key={index}>
          {p.text}
        </p>
      ))}
    </div>
  )
}
