import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadContent } from '../actions'

import Section from './Section'

class View extends React.Component {
  state = { loading: false }

  componentDidMount() {
    this.loadContent()
  }

  loadContent() {
    const content = this.getContentFromStore()
    if (content) return

    this.setState({ loading: true })
    this.props
      .loadContent(this.props.match.params.id)
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id)
      this.loadContent()
  }

  getContentFromStore() {
    return this.props.articles.content[this.props.match.params.id]
  }

  getGameFromStore() {
    return this.props.articles.byId[this.props.match.params.id]
  }

  render() {
    if (this.state.loading) return <p>Loading</p>

    const content = this.getContentFromStore() || { sections: [] }
    const game = this.getGameFromStore() || {}

    return (
      <div>
        <h1 className="f2 mv3">{game.title}</h1>
        {content.sections.map(section => (
          <Section key={section.title} {...section} />
        ))}
      </div>
    )
  }
}

export default connect(
  ({ articles }) => ({ articles }),
  {
    loadContent
  }
)(withRouter(View))
