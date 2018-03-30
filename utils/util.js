const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const convertToStarsArray = stars => {
  let arr = [];
  let half = Number(stars) % 10;
  let num = String(stars).substr(0,1);
  for(let i = 1; i <= 5; i++) {
    if(i <= num) {
      arr.push(1);
    }else{
      arr.push(0);
    }
  }
  half && (arr[Number(num)] = 2);
  return arr;
}

let http = (url, callback) => {
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {},
      header: {
          'content-type': 'application/xml' // 默认值
      },
      success: function(res) {
        callback(res.data);
      },
      fail: function(err) {
        console.log("error")
        console.log(err);
      }
    })
}
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString:convertToCastString,
  convertToCastInfos: convertToCastInfos
}
