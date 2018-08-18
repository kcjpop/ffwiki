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
      <React.Fragment>
        <h1>Games</h1>
        <ul className="list ma0 pl3">
          {list.map(item => (
            <li key={item.id}>
              <Link className="lh-copy dark-gray" to={`/games/${item.id}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({ list: state.articles.list }),
  {
    loadGameList
  }
)(List)
