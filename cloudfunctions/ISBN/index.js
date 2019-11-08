// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let ISBNCode = event.ISBNCode
  let url = 'https://isbn.qiaohaoforever.cn/' + ISBNCode
  return await rp(url)
  .then(function(res){
    return res
  })
  .catch(function(res){
    return res
  })
}