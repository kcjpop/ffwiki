import req from '@/helpers/req'

export const LOAD_GAME_LIST = 'ARTICLES/LOAD_GAME_LISTS'
export function loadGameList() {
  return dipatch =>
    req
      .get('/Articles/List', {
        params: {
          category: 'Games',
          limit: 50,
          expand: 1
        }
      })
      .then(({ data }) => {
        dipatch({
          type: LOAD_GAME_LIST,
          payload: {
            list: data.items
          }
        })
      })
}
