//获取全局变量
var app = getApp();
var readyData = {};

Page({

  processZhihu: function (newsZhihu) {
    var news = [];
    for (var idx in newsZhihu.stories) {
      var subject = newsZhihu.stories[idx];
      var temp = {
        title: subject.title,
        newsImage: subject.images[0],
        newsId: subject.id
      }
      news.push(temp);
    }
    this.setData({
      contentkey: news
    });
  },

  getNewsList: function (url) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processZhihu(res.data);
      },
      fail: function (res) {
      },
    })
  },
  onLoad: function (options) {
    var newsList = app.globalData.zhihuBase +"/api/4/news/latest";
   
    this.getNewsList(newsList);
  },
  onNewTap: function (event) { 
    var newId = event.currentTarget.dataset.newid;
    wx.navigateTo({
      url: './news-detail/news-detail?id=' + newId
    })
  }
})