import React from 'react'

export default function() {
  return (
    <React.Fragment>
      <h1>Welcome to Simple Final Fantasy Wiki</h1>
      <p className="lh-copy">
        There is nothing fancy here. Just pick a title and you are good to go.
      </p>
      <p className="lh-copy">
        Content is fetched from{' '}
        <a
          href="http://finalfantasy.wikia.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Final Fantasy Wikia
        </a>.
      </p>
    </React.Fragment>
  )
}
