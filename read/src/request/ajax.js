import wepy from 'wepy'
import {
  baseUrl
} from './data'

const ajax = {
  post: function (url, data) {
    return wepy.request({
      url: baseUrl + url,
      data: data,
      method: 'POST'
    })
  },
  get: function (url, data) {
    return wepy.request({
      url: baseUrl + url,
      data: data,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
      }
    })
  }
}

module.exports = {
  ajax
}
