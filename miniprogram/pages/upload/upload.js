// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    bookName:'',
    bookDes:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bookName:function(e){
    let value = e.detail.value;
    this.setData({
      bookName:value
    })
  },
  bookDes:function(e){
    let value = e.detail.value;
    this.setData({
      bookDes:value
    })
  },
  chooseImage: function (e) {
    if(this.data.files.length >= 2){
      wx.showToast({
        title: '警告：只能上传两张图片!',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
        }
      })
    }
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  handleSubmit:function(){
    let { files,bookName,bookDes } = this.data
    console.log('提交', files, bookName, bookDes)
    const db = wx.cloud.database()
    db.collection('Books').add({
      data:{
        files, 
        bookName, 
        bookDes,
        isBorrow:false,
        lowerShelf:false,
      }
    }).then(res=>{
      wx.showToast({
        title: '图书上传成功',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        files: [],
        bookName: '',
        bookDes: '',
      })
    }).catch(res=>{
      console.log('上传失败',res)
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