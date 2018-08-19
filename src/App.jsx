import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider, connect } from 'react-redux'

import Layout from '@/modules/ui/Layout'
import Sidebar from '@/modules/articles/components/List'

import { store, routes } from './bootstrap'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout sidebar={<Sidebar />}>
          <Switch>
            {routes.map(route => <Route key={route.path} {...route} />)}
          </Switch>
        </Layout>
      </Provider>
    )
  }
}

export default App
