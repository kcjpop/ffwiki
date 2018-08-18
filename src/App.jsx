import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { combineReducers } from 'redux'
import createStore from './createStore'

import Layout from '@/modules/ui/Layout'

import Home from '@/modules/pages/Home'

// Feature modules
import * as Articles from '@/modules/articles'

const reducers = combineReducers({
  articles: Articles.reducer
})
const store = createStore(reducers)

class App extends React.Component {
  render() {
    const Sidebar = Articles.components.List
    return (
      <Provider store={store}>
        <Layout sidebar={<Sidebar />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="*" render={() => <h1>404</h1>} />
          </Switch>
        </Layout>
      </Provider>
    )
  }
}

export default App
