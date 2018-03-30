// pages/movies/movies-details/movie-details.js
const app = getApp();
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    let id = options.id;
    // /v2/movie/subject/1764796
    let detailsUrl = app.globalData.g_doubanBase + "/v2/movie/subject/" + id;
    util.http(detailsUrl, this.movieDetails);
  },
  movieDetails(data) {
    if (!data) {
        return;
    }
    let director = {
        avatar: "",
        name: "",
        id: ""
    }
    if (data.directors[0] != null) {
        if (data.directors[0].avatars != null) {
            director.avatar = data.directors[0].avatars.large

        }
        director.name = data.directors[0].name;
        director.id = data.directors[0].id;
    }
    let movie = {
        movieImg: data.images ? data.images.large : "",
        country: data.countries[0],
        title: data.title,
        originalTitle: data.original_title,
        wishCount: data.wish_count,
        commentCount: data.comments_count,
        year: data.year,
        generes: data.genres.join("、"),
        stars: util.convertToStarsArray(data.rating.stars),
        score: data.rating.average,
        director: director,
        casts: util.convertToCastString(data.casts),
        castsInfo: util.convertToCastInfos(data.casts),
        summary: data.summary
    }
    this.setData({
      movie: movie
    })
  },
  viewMoviePostImg(event) {
    let url = event.currentTarget.dataset.src;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }

})