import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadGameList } from '../actions'

import Loader from '@/modules/ui/Loader'
import req from '@/helpers/req'

class List extends React.Component {
  componentDidMount() {
    if (this.props.list.length === 0) this.props.loadGameList(req)
  }

  render() {
    const { list } = this.props

    return (
      <Loader loading={list.length === 0}>
        <ul className="list mv3 pl0">
          {list.map(item => (
            <li key={item.id}>
              <Link
                className="lh-copy moon-gray no-underline db"
                to={`/games/${item.id}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </Loader>
    )
  }
}

export default connect(
  state => ({ list: state.articles.list }),
  {
    loadGameList
  }
)(List)
