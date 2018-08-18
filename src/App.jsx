import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from '@/modules/ui/Layout'
import Sidebar from '@/modules/ui/Sidebar'

export default function App() {
  return (
    <Layout sidebar={<Sidebar />}>
      <Switch>
        <Route exact path="/" render={() => <h1>Hello World</h1>} />
        <Route path="*" render={() => <h1>404</h1>} />
      </Switch>
    </Layout>
  )
}
