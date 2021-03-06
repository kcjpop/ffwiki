import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadContent } from '../actions'

import Section from './Section'
import Image from './Image'

import Loader from '@/modules/ui/Loader'
import req from '@/helpers/req'

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
      .loadContent(req, this.props.match.params.id)
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
    const content = this.getContentFromStore() || { sections: [] }
    const game = this.getGameFromStore() || {}

    return (
      <Loader loading={this.state.loading}>
        <Helmet>
          <title>{`${game.title} :: Simple Final Fantasy Wiki`}</title>
        </Helmet>
        <h1 className="f2 mv3">{game.title}</h1>
        <Image src={game.thumbnail} alt={game.title} caption={game.title} />
        {content.sections.map((section, index) => (
          <Section key={section.title + index} {...section} />
        ))}
      </Loader>
    )
  }
}

export default connect(
  ({ articles }) => ({ articles }),
  {
    loadContent
  }
)(withRouter(View))
