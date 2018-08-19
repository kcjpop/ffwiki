import React from 'react'

export default function({ loading, children, ...rest }) {
  return loading ? (
    <div className="sk-rotating-plane ba b--white" {...rest} />
  ) : (
    children
  )
}
