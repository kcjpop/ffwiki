import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const ScrollToTop = withRouter(
  class extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }

    render() {
      return this.props.children
    }
  }
)

ScrollToTop.propTypes = {
  children: PropTypes.element.isRequired
}

export default ScrollToTop
