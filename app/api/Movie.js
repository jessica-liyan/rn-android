import {postFetch, getFetch} from './index'

export const FetchNew = getFetch({
  path: 'movie/in_theaters',
  callback: res => res.subjects
})

