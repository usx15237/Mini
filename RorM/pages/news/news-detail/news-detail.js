var app = getApp();
var R_htmlToWxml = require('../../../util/htmlToWxml.js');//引入公共方法

Page({
  onLoad: function (op) {
    var that = this;
    var url = app.globalData.zhihuBase + "/api/4/news/" + op.id;

    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res.data)
        var newsDetail = res.data;

        newsDetail.content = R_htmlToWxml.html2json(that.escape2Html(newsDetail.body.replace(/[\r\n]/g, "")));
        that.setData({
          silen: newsDetail.content
        })
      },
      fail: function (res) {
      },
    })
  },
  escape2Html: function (str) {
    var arrEntities = { 'ldquo': '"', 'rdquo': '"', 'mdash':'—' };
    return str.replace(/&(ldquo|rdquo|mdash);/ig, function (all, t) { return arrEntities[t]; });
  },
  stockClick: function (e) {
    var secCode = e.currentTarget.dataset.seccode;
    var secName = e.currentTarget.dataset.secname;
    console.log("stockClick:" + secCode + ";secName:" + secName);
  },
  imageLoad: function (e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var windowWidth = wx.getSystemInfoSync().windowWidth - 30;
    var picHeight = (height / width) * windowWidth;
    var index = e.currentTarget.dataset.index;
    console.log(this.data.silen)
    this.data.silen[index].attr.height = picHeight;
    this.setData({
      silen: this.data.silen
    });
  }
})