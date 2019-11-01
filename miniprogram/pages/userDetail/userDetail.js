const moment = require('../../untils/moment.min.js')
// pages/userDetail/userDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{},
    LandingTime:'',
    id:'',  //当前页的数据的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('users_Book').where({
      _id:options.id
    }).get().then(res=>{
      console.log('用户详情',res.data[0])
      this.setData({
        userData:res.data[0],
        id: options.id,
        LandingTime: moment(res.data[0].LandingTime).format("YYYY-MM-DD HH:mm:ss")
      })
    })
  },

  onModify:function(){
    wx.cloud.callFunction({
      name:'update',
      data:{
        isForbidden: true,
        id:this.data.userData._id
      },
      complete:res => {
        const db = wx.cloud.database()
        db.collection('users_Book').where({
          _id: this.data.id
        }).get().then(res => {
          console.log('用户详情', res.data[0])
          this.setData({
            userData: res.data[0],
          })
        })
        console.log('callfunction test result:',res)
      }
    })
  },
  onAllowModify: function () {
    wx.cloud.callFunction({
      name: 'update',
      data: {
        isForbidden: false,
        id: this.data.userData._id
      },
      complete: res => {
        const db = wx.cloud.database()
        db.collection('users_Book').where({
          _id: this.data.id
        }).get().then(res => {
          console.log('用户详情', res.data[0])
          this.setData({
            userData: res.data[0],
          })
        })
        console.log('callfunction test result:', res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})