Page({
  onTap:function(){
  
  //页面想跳转到含tab的其它页面不能用wx.navigateTo方法
  //'../movies/movies'和'../posts/posts'页面都含有tab选项
  wx.switchTab({
    url: '../news/news',
  });
  }
})