const postsData=require('../../../data/posts-data.js');
const app = getApp();
Page({
    data:{
      isPlayingMusic: false,
    },

     onLoad(option) {
        let globalData = app.globalData;
        let postId = option.id;
        this.data.currentPostId=postId;
        let postData=postsData.postList[postId];//
        this.setData({
         postData:postsData.postList[postId]
        });
      //收藏开始
      //初始化代码
        let postsCollected= wx.getStorageSync('posts_collected');
        if(postsCollected){
                let postCollected= postsCollected[postId]
                this.setData({
                    collected:postCollected
                })
        }else{
            let postsCollected={}
                postsCollected[postId]=false;
                wx.setStorageSync('posts_collected', postsCollected);
            
        }
        if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
          this.setData({
            isPlayingMusic:true
          })

        }
        this.setMusicMonitor();
     },
     setMusicMonitor() {
      //点击播放图标和总控开关都会触发这个函数

        wx.onBackgroundAudioPlay(()=> {
          this.setData({
            isPlayingMusic:true
          })
          app.globalData.g_isPlayingMusic = true;
        })
        wx.onBackgroundAudioPause(()=> {
          this.setData({
            isPlayingMusic:false
          })
          app.globalData.g_isPlayingMusic = false;
        })
        
        wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            // app.globalData.g_currentMusicPostId = null;
        });
     },
     //点击时候的代码
     onColletionTap(event) {
         //拿到这个缓存的值
         let postsCollected=wx.getStorageSync('posts_collected');
         //拿到这个值
         let postCollected = postsCollected[this.data.currentPostId];
         //取反操作 收藏的变成未收藏
         postCollected=!postCollected;
         postsCollected[this.data.currentPostId]=postCollected;
         //更新文章是否的缓存值
         wx.setStorageSync('posts_collected',postsCollected);
         //更新数据绑定变量，从而实现切换图片
         this.setData({
             collected:postCollected
         })
         wx.showToast({
             title:postCollected?'收藏成功':'取消成功',
             duration:800,
             icon:'success'
         })
     },
     onShareTap() {
      let shareList = ['分享到微信', '分享到QQ', '分享到新浪微博'];
      wx.showActionSheet({
        itemList: shareList,
        success: function (res) {
          wx.showModal({
            title: '分享',
            content: '确定' + shareList[res.tapIndex] + '?',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
     },
     onMusicTap() {
       let currentPostId = this.data.currentPostId;
       let postData = postsData.postList[currentPostId]
        if (this.data.isPlayingMusic) {
          wx.pauseBackgroundAudio();
          this.setData({
            isPlayingMusic:false
          })
          app.globalData.g_isPlayingMusic = false;
        }else{
          wx.playBackgroundAudio({
            dataUrl: postData.music.url,
            title: postData.music.title,
            coverImgUrl: postData.music.coverImgUrl
          })

          this.setData({
            isPlayingMusic: true
          })
          app.globalData.g_currentMusicPostId = currentPostId;
          app.globalData.g_isPlayingMusic = true;
        }
     },






    //  onClollectionTap:function(event){
    //      let game=wx.getStorageInfoSync('key');
    //      console.log(game)
    //  },
    //  onClollectionTap2:function(event){
    //      var gme=wx.clearStorageSync();
    //     //  var game=wx.removeStorage({
    //     //     key: 'key'
    //     //缓存最大不能超过10m
    //     //     })
     //}
})