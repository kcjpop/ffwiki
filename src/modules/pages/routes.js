import Home from './components/Home'
import NotFound from './components/NotFound'

export default [
  {
    exact: true,
    path: '/',
    component: Home
  },
  {
    path: '/*',
    component: NotFound
  }
]
