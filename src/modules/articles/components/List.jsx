import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadGameList } from '../actions'

class List extends React.Component {
  componentDidMount() {
    this.props.loadGameList()
  }

  render() {
    const { list } = this.props
    if (list.length === 0) return <p>Loading</p>

    return (
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
    )
  }
}

export default connect(
  state => ({ list: state.articles.list }),
  {
    loadGameList
  }
)(List)
