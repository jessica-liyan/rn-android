const baseUrl = 'https://api.douban.com/v2/'

// path是相对路径 params参数对象，callback回调函数 
export const postFetch = ({path, params, callback} = {}) => {
  let url = `${baseUrl}${path}`
  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json()).then(
    callback
  )
}

// 没有参数使用getFetch
export const getFetch = ({path, callback} = {}) => {
  let url = `${baseUrl}${path}`
  fetch(url).then(res => res.json()).then(
    callback
  )
}

