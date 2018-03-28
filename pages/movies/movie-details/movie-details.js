// pages/movies/movies-details/movie-details.js
const app = getApp();
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let id = options.id;
    // /v2/movie/subject/1764796
    let detailsUrl = app.globalData.g_doubanBase + "/v2/movie/subject/" + id;
    util.http(detailsUrl, this.movieDetails);
  },
  movieDetails(details) {
    console.log(details)
  }

})