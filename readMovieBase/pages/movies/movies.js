// pages/movies/movies.js
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchFlag: false,
    searchResult: {},
    searchTxt: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inTheatersUrl = app.globalData.g_doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    let comingSoonUrl = app.globalData.g_doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    let top250Url = app.globalData.g_doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },
  getMovieListData(url, settedKey, categoryTitle) {
    util.http(url, (data) => {
      this.processDoubanData(data, settedKey, categoryTitle);
    })

  },
  processDoubanData(moviesDouban, settedKey, categoryTitle) {
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
    
    let readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData)
  },
  onBindFocus() {
    // 获得焦点
    this.setData({
      searchFlag: true,
    })
  },
  onBindBlur(event) {
    // 失去焦点
    console.log(this.data.searchTxt);
    let text = event.detail.value;
    console.log(text)
    let searchUrl = app.globalData.g_doubanBase +
      "/v2/movie/search?q=" + text;
      this.getMovieListData(searchUrl, "searchResult", '');
  },
  onCancelImgTap() {
    // 搜索框删除按钮
    this.setData({
      searchFlag: false,
      searchTxt:'',
      searchResult: {}
    })
  }

})