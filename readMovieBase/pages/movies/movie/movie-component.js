// pages/movies/movie/movie-template.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movieDetails: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goMovieDetails(event) {
      let id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/movies/movie-details/movie-details?id=' + id
      })
    }
  }
})
