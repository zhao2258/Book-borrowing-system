const app = getApp()
const timeout = null 

// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booksData:[],
    isAdmin:'',
    autoplay: true,
    interval: 3000,
    duration: 1000,
    inputShowed: false,
    inputVal: "",
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    const db = wx.cloud.database()
    db.collection('Books').get().then(res => {
      this.setData({
        booksData: res.data,
        isAdmin: app.globalData.isAdmin
      })
    })
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    const db = wx.cloud.database()
    db.collection('Books').get().then(res => {
      this.setData({
        booksData: res.data,
        isAdmin: app.globalData.isAdmin
      })
    })
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log('输入的值',e.detail.value)
    const db = wx.cloud.database()
    db.collection('Books').where({
      bookName:e.detail.value
    }).get().then(res => {
      console.log('搜索得到的值',res)
      this.setData({
        booksData: res.data,
        isAdmin: app.globalData.isAdmin
      })
    })
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const db = wx.cloud.database()
    db.collection('Books').get().then(res => {
      this.setData({
        booksData:res.data,
        isAdmin: app.globalData.isAdmin
      })
    })
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