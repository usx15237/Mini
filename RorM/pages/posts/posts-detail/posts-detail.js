/*在Page前的语句提前于onload()执行，并只执行一次*/
//获取数据源头
var postsData = require('../../../data/posts-data.js')

//设置收藏缓存
var postId;
var Collects = [];
wx.setStorageSync('ifcollects', Collects);
var currentCollects;

Page({
  onLoad: function (op) {

    //确定postId参数
    postId = op.id;

    //读取缓存
    currentCollects = wx.getStorageSync('ifcollects');

    //根据缓存设置当前收藏标识样式
    this.setData({
      postData: postsData.postList[postId],
      collect: currentCollects[postId]
    });
  },

  //onCollect用于修改收藏情况，并记入缓存
  onCollect: function (event) {
    this.setData({
      collect: !this.data.collect
    })
    currentCollects[postId] = this.data.collect;
    wx.setStorageSync('ifcollects', currentCollects)

    //修改收藏提示
    wx.showToast({
      title: this.data.collect ? "收藏成功" : "已取消收藏",
      duration: 1000
    })
  },

  //分享功能
  onShare: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享给qq好友",
      "分享到qq空间",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //如果点击的选项不是"取消"
        if(!res.cancal){
          wx.showToast({
            title: itemList[res.tapIndex],
            duration: 1000
          })
        }
      }
    })
  }
})