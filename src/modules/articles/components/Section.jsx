import React from 'react'
import Image from './Image'

export default function(props) {
  return (
    <div>
      <h2>{props.title}</h2>

      {props.content.map((p, index) => (
        <React.Fragment key={index}>
          {props.images[index] != null ? (
            <Image
              {...props.images[index]}
              position={index % 2 ? 'left' : 'right'}
            />
          ) : null}
          <p className="lh-copy baskerville">{p.text}</p>
        </React.Fragment>
      ))}
    </div>
  )
}
