import View from './components/View'

import { loadContent } from './actions'

export default [
  {
    exact: true,
    path: '/games/:id',
    component: View,
    server: {
      prefetchData: (store, match) =>
        store.dispatch(loadContent(match.params.id)).catch(console.error)
    }
  }
]
