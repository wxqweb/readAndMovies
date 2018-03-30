// pages/movies/more-movies/more-movies.js
const util = require('../../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    totalCount: 0,
    requestUrl: '',
    isEmpty : true,
    isMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      category:options.category
    })
    let dataUrl = "";
    switch(options.category) {
      case '正在热映':
        dataUrl = app.globalData.g_doubanBase + "/v2/movie/in_theaters";
        break;
      case '即将上映': 
        dataUrl = app.globalData.g_doubanBase + "/v2/movie/coming_soon";
        break;
      case '豆瓣Top250': 
        dataUrl = app.globalData.g_doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let category = this.data.category
    wx.setNavigationBarTitle({
      title: category
    })
  },
  onScrollLowerP() {
    // 上拉刷新
    let _this = this;
    let nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";

    if(this.data.isMore) {
      this.selectComponent("#moviegridId").conctrolMoreLoad(true);
      util.http(nextUrl, this.processDoubanData);
    }
    
  },
  processDoubanData(moviesDouban) {
    // 刷新执行函数
    if(moviesDouban.subjects.length < 1) {
      this.data.isMore = false;
      this.selectComponent("#moviegridId").changeLowerText();
      this.data.isEmpty || this.selectComponent("#moviegridId").conctrolMoreLoad(false);
      return;
    }
    let movies = [];
    for(let idx in moviesDouban.subjects){
      let subject = moviesDouban.subjects[idx];
      let temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: subject.title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    let totalMovies = {};
    if(!this.data.isEmpty) {

      totalMovies = this.data.movies.concat(movies);
      this.selectComponent("#moviegridId").conctrolMoreLoad(false);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }

    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    
  },
  onScrollUpperP() {
    console.log("wasai")
    // 下拉刷新
    wx.showNavigationBarLoading();
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    let requestUrl = this.data.requestUrl +
      "?start=0&count=20";
    util.http(requestUrl, this.processDoubanData);
  }
})