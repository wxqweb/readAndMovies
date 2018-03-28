// pages/movies/movie-list/movieList-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerMovies: {
      type: Array,
      value: [],
    },
    categoryTitle: {
      type: String,
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  ready() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onMoreTap(event) {
      let category = event.currentTarget.dataset.category;
      wx.navigateTo({
        url: '/pages/movies/more-movies/more-movies?category=' + category
      })
    }
  }
})
