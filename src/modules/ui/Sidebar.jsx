import React from 'react'
import { Link } from 'react-router-dom'

export default function(props) {
  return (
    <ul>
      <li>
        <Link to="/">Hello</Link>
      </li>
      <li>
        <Link to="/1">1</Link>
      </li>
    </ul>
  )
}
