import View from './components/View'

import { loadContent } from './actions'
import req from '@/helpers/req'

export default [
  {
    exact: true,
    path: '/games/:id',
    component: View,
    server: {
      prefetchData: (store, match) =>
        store.dispatch(loadContent(req, match.params.id)).catch(console.error)
    }
  }
]
