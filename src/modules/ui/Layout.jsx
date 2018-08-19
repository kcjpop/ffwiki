import React from 'react'

export default function(props) {
  return (
    <div className="flex flex-column-reverse flex-row-l serif f4">
      <div className="w-25-l bg-dark-gray pa3">{props.sidebar}</div>
      <div className="w-75-l ph5 pv3">{props.children}</div>
    </div>
  )
}
