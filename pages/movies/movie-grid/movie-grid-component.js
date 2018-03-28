// pages/movies/movie-grid/movie-grid-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerMovies: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: true,
    moreload:false,
    lowerText:'上划加载更多',
  },
  create() {
    wx.showLoading();
  },
  ready() {
    this.setData({
      loading: false
    })
    wx.hideLoading();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onScrollLower() {
      // console.log("zujianye")
      this.triggerEvent('scrollLower', {}, {})
    },
    onScrollUpper() {
      this.triggerEvent('scrolltoupper', {}, {})
    },
    conctrolMoreLoad(bool) {
      this.setData({
        moreload: bool
      })
    },
    changeLowerText() {
      this.setData({
        lowerText: '没有更多了~'
      })
    }
  }
})
