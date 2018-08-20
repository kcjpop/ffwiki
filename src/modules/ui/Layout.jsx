import React from 'react'
import PropTypes from 'prop-types'

function Layout(props) {
  return (
    <div className="flex flex-column-reverse flex-row-l serif f4">
      <div className="w-25-l bg-dark-gray pa3">{props.sidebar}</div>
      <div className="w-75-l ph5 pv3">{props.children}</div>
    </div>
  )
}

Layout.propTypes = {
  sidebar: PropTypes.element,
  children: PropTypes.element.isRequired
}

export default Layout
