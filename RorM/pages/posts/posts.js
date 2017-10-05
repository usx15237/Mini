var postsData=require('../../data/posts-data.js')

Page({
  data: {
  },
  //
  onLoad: function (options) {
   this.setData({
     //为contentkey绑定数据源postList
      contentkey: postsData.postList
      });
  },
  onPostTap:function(event){
/*获取当前事件对象数据源的postId属性值(不能直接获取，
需要前端以{{item.postId}}形式送至后台)*/
   var postId=event.currentTarget.dataset.postid;
   wx.navigateTo({
     url: './posts-detail/posts-detail?id='+postId
   })
  }
  
})