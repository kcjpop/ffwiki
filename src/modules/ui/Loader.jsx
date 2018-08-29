import React from 'react'
import PropTypes from 'prop-types'

function Loader({ loading, children, ...rest }) {
  return loading ? (
    <div className="sk-rotating-plane ba b--white" {...rest} />
  ) : (
    children
  )
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Loader
