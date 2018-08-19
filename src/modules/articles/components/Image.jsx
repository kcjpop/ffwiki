import React from 'react'
import classnames from 'classnames'

export default function(props) {
  const { className, position, caption, alt, src, ...rest } = props
  const left = position === 'left'
  return (
    <div
      className={classnames(
        'w5 pa3 b--light-gray',
        { 'fl br mr3': left, 'fr bl ml3': !left },
        className
      )}
      {...rest}
    >
      <img src={src} alt={alt} />
      {caption && caption.length > 0 ? (
        <p className="lh-copy i mv2">{caption}</p>
      ) : null}
    </div>
  )
}
