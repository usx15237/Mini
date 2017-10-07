//获取全局变量
var app = getApp();
var readyData = {};

Page({

  processDouban: function (movieDouban,key,tag) {
    var movies = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var title = subject.title.length > 6 ? subject.title.substring(0, 4) + "..." : subject.title;
      var temp = {
        title: title,
        average: subject.rating.average,
        coverImage: subject.images.large,
        movieId: subject.id,
      }
      movies.push(temp);
    }
    readyData[key]={
      movies:movies,
      tag:tag
    }
    this.setData(readyData);
  },

  getMovieList: function (url,key,tag) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      //即使返回结果为400或404，依然会执行success(),这是因为request确实执行成功了，至于执行结果是什么就不观request的事了(滴滴司机只负责把你送到机场，你赶不赶的上飞机就不关司机的事了)
      success: function (res) {
        that.processDouban(res.data,key,tag);
      },
      fail: function (res) {
      },
    })
  },
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start&count=3";

    this.getMovieList(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieList(comingSoonUrl, "comingSoon","即将上映");
    this.getMovieList(top250Url, "top250","Top250");
  },
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: './movies-detail/movies-detail?id=' + movieId
    })
  }
})