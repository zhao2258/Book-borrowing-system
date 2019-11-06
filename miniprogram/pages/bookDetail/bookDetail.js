const app = getApp()
// miniprogram/pages/bookDetail/bookDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetail:{},
    isAdmin:'',
    isForbidden:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    const db = wx.cloud.database()
    db.collection('Books').doc(id).get().then(res=>{
      this.setData({
        bookDetail:res.data
      })
    })
  },
  previewImg: function (e) { //预览图片
    let imgData = e.currentTarget.dataset.img;
    wx.previewImage({
      //当前显示图片
      current: imgData,
      //所有图片
      urls: imgData
    })
  },

  ReserveBook:function(e){
    let { bookDetail } = this.data
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
        const db = wx.cloud.database()
        let BorrowBooksData 
        db.collection('BorrowBooks').doc(app.globalData.openid).get().then(res=>{
          BorrowBooksData = res.data.BorrowBooksData
          if(e.detail.value){
            BorrowBooksData.push(bookDetail)
          } else {
            BorrowBooksData.map((item,index) => {
              if (item._id == bookDetail._id){
                BorrowBooksData.splice(index,1)
              }
            })
          }
          wx.cloud.callFunction({
            name: 'BorrowBooks',
            data: {
              BorrowBooksData,
              id: app.globalData.openid
            },
            complete: res => {
        
            }
          })
        })
      }
    })
  },

  LowerShelfBook:function(e){
    let { bookDetail } = this.data
    bookDetail.lowerShelf = e.detail.value
    this.setData({
      bookDetail
    })
    wx.cloud.callFunction({
      name: 'bookDetail',
      data: {
        id: bookDetail._id,
        isBorrow: bookDetail.isBorrow,
        lowerShelf: e.detail.value
      },
      complete: res => {
        // console.log('方法返回', res)
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
    this.setData({
      isAdmin: app.globalData.isAdmin,
      isForbidden: app.globalData.isForbidden
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