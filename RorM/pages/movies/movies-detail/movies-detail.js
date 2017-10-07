//var moviesData = require('../../../data/movies-data.js')
var app = getApp();

Page({

  onLoad: function (op) {
    var that=this;
    var url = app.globalData.doubanBase+"/v2/movie/subject/"+op.id;
    var movieData={};
    
    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        movieData["title"] = res.data.title;
        movieData["year"] = res.data.year;
        movieData["image"] = res.data.images.large;
        movieData["average"] = res.data.rating.average;
        movieData["genres"] = res.data.genres;
        movieData["countries"] = res.data.countries;
        movieData["collect_count"] = res.data.collect_count;
        movieData["summary"] = res.data.summary;
        movieData["directors"] = res.data.directors;
        movieData["casts"] = res.data.casts;
        that.setData({
          movie: movieData
        })
      },
      fail: function (res) {
      },
    })
  },
})