import req from '@/helpers/req'

export const LOAD_LIST = 'ARTICLES/LOAD_LISTS'
export function loadGameList() {
  return dispatch =>
    req
      .get('/Articles/List', {
        params: {
          category: 'Games',
          limit: 50,
          expand: 1
        }
      })
      .then(({ data }) =>
        dispatch({
          type: LOAD_LIST,
          payload: {
            list: data.items
          }
        })
      )
}

export const SET_CONTENT = 'ARTICLES/SET_CONTENT'
export function loadContent(id) {
  return dispatch =>
    req
      .get('/Articles/AsSimpleJson', {
        params: { id }
      })
      .then(({ data }) =>
        dispatch({ type: SET_CONTENT, payload: { id, content: data } })
      )
}
