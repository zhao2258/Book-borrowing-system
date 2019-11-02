const app = getApp()
// miniprogram/pages/bookDetail/bookDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetail:{},
    isAdmin:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    const db = wx.cloud.database()
    db.collection('Books').doc(id).get().then(res=>{
      console.log('shuji',res.data)
      this.setData({
        bookDetail:res.data
      })
    })
  },

  ReserveBook:function(e){
    let { bookDetail } = this.data
    console.log('订阅', e.detail.value, bookDetail)
    bookDetail.isBorrow = e.detail.value
    this.setData({
      bookDetail
    })
    wx.cloud.callFunction({
      name:'bookDetail',
      data:{
        id: bookDetail._id,
        isBorrow: e.detail.value,
        lowerShelf: bookDetail.lowerShelf
      },
      complete:res=>{
        console.log('方法返回',res)
      }
    })
  },

  LowerShelfBook:function(e){
    let { bookDetail } = this.data
    console.log('下架', e.detail.value, bookDetail)
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
    this.setData({
      isAdmin: app.globalData.isAdmin
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