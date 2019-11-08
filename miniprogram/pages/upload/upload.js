// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    fileIDs: [],
    bookName:'',
    bookDes:'',
    scanCode:''
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
      wx.showLoading({
        title: '提交中',
      })
    const db = wx.cloud.database()
    const promiseArr = []
    console.log('this.data.files', this.data.files)
      //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.files.length; i++) {
        let filePath = this.data.files[i]
        let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
        console.log('拓展闽',suffix)
        //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
        promiseArr.push(new Promise((reslove, reject) => {
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix,
            filePath: filePath, // 文件路径
          }).then(res => {
            // get resource ID
            console.log(res.fileID)
            this.setData({
              fileIDs: this.data.fileIDs.concat(res.fileID)
            })
            reslove()
          }).catch(error => {
            console.log(error)
          })
        }))
      }
      Promise.all(promiseArr).then(res => {
        let { files, bookName, bookDes } = this.data
        db.collection('Books').add({
          data: {
            files,
            bookName, 
            bookDes,
            isBorrow:false,
            lowerShelf:false,
            fileIDs: this.data.fileIDs //只有当所有的图片都上传完毕后，这个值才能被设置，但是上传文件是一个异步的操作，你不知道他们什么时候把fileid返回，所以就得用promise.all
          }
        })
          .then(res => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '提交成功',
            })
            this.setData({
              files: [],
              bookName: '',
              bookDes: '',
              fileIDs: [],
            })
          })
          .catch(error => {
            console.log(error)
          })
      })
  },
  scanCode:function(){
    let vm = this
    wx.scanCode({
      success(res) {
        console.log('扫码结果', res.result)
        wx.cloud.callFunction({
          name: 'ISBN',
          data: {
            ISBNCode: res.result
          },
          complete: res => {
            console.log('ISBN方法返回', res.result)
          }
        })
        vm.setData({
          scanCode:JSON.stringify(res)
        })
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