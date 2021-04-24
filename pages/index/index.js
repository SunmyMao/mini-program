// index.js
// 获取应用实例

import CustomPage from '../../utils/CustomPage'

const app = getApp()

CustomPage({    
  data: {
      showTopTips: false,

      jiTaiArray: [660, 1100, 1400, 1800, 4000],
      jiTaiIndex: 0,
      zhuDingDanZhongArray :[0.01716,0.03418,0.04897,0.06715,0.20368],
      dunCuDanZhongArray :[0.01913, 0.03806, 0.05426, 0.07412, 0.21976],
      zhuDingDanZhong: 0.01716,
      dunCuDanZhong:0.01913,
      yaYuWeight: 0,

      result :"",
      formData: {
      },
      rules: [
        {
            name: 'yaYuWeight',
            rules: {required: true, message: '请输入压余重量'},
        }, {
            name: 'yongDingLength',
            rules: {required: true, message: '请输入用锭长度'},
        }, {
            name: 'auxiliaryHours',
            rules: {required: true, message: '请输入辅助时间'},
        }, {
            name: 'extrusionSpeed',
            rules: {required: true, message: '请输入挤压速度'},
        }, {
            name: 'workingHours',
            rules: {required: true, message: '请输入生产时间'},
        }, {
            name: 'singleWeight',
            rules: {required: true, message: '请输入单重'},
        }, {
            name: 'dingChi',
            rules: {required: true, message: '请输入定尺'},
        }, {
          name: 'danGenDingCount',
          rules: [{required: true, message: '请输入单根锭支数'}, {required: true, message: '请输入单根锭支数'}],
      }]
  },

  formInputChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
          [`formData.${field}`]: e.detail.value
      })
  },
  bindJiTaiChange: function(e) {
      this.setData({
          jiTaiIndex: e.detail.value,
          zhuDingDanZhong: this.data.zhuDingDanZhongArray[e.detail.value],
          dunCuDanZhong: this.data.dunCuDanZhongArray[e.detail.value]
      })
  },
  bindAccountChange: function(e) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value);

      this.setData({
          accountIndex: e.detail.value
      })
  },
  bindAgreeChange: function (e) {
      this.setData({
          isAgree: !!e.detail.value.length
      });
  },
  formSubmit: function(e) {
      this.selectComponent('#form').validate((valid, errors) => {
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })
            }
        } else {
            // console.log(e.detail.value)
            
            // var jiTaiCount = this.data.jiTaiArray[this.data.jiTaiIndex]
            var zhuDingDanZhong = this.data.zhuDingDanZhongArray[this.data.jiTaiIndex]
            var dunCuDanZhong = this.data.dunCuDanZhongArray[this.data.jiTaiIndex]
            var yaYuWeight = parseFloat(e.detail.value["yaYuWeight"])
            var yongDingLength = parseFloat(e.detail.value["yongDingLength"])
            var auxiliaryHours = parseFloat(e.detail.value["auxiliaryHours"])
            var extrusionSpeed = parseFloat(e.detail.value["extrusionSpeed"])
            var workingHours = parseFloat(e.detail.value["workingHours"])
            var singleWeight = parseFloat(e.detail.value["singleWeight"])
            var dingChi = parseFloat(e.detail.value["dingChi"])
            var danGenDingCount = parseFloat(e.detail.value["danGenDingCount"])

            var yaYuThickness = yaYuWeight / dunCuDanZhong
            var dunCuHouLength = yongDingLength / (dunCuDanZhong / zhuDingDanZhong)
            var danZhiHours = (dunCuHouLength - yaYuThickness) / extrusionSpeed + auxiliaryHours
            var danBanJiChuDingShu = workingHours / danZhiHours
            var chengPinRate =  (singleWeight * dingChi * danGenDingCount) / (yongDingLength * zhuDingDanZhong)
            var danBanChanChu = danBanJiChuDingShu * yongDingLength * zhuDingDanZhong * chengPinRate
            
            var result = ""
            // result += "压余厚度: " + String(yaYuThickness.toFixed(2)) + "\n" 
            // result += "墩粗后长度: " + String(dunCuHouLength.toFixed(2)) + "\n"
            result += "单支时间: " + String(danZhiHours.toFixed(2)) + "\n"
            result += "单班挤出锭数: " + String(danBanJiChuDingShu.toFixed(2)) + "\n"
            result += "成品率: " + String(chengPinRate.toFixed(4) * 100) + "%\n"
            result += "单班产出: " + String(danBanChanChu.toFixed(2))

            this.setData({
                result: result
            })
        }
    })
  }
  /*
  ,
  submitForm() {
      this.selectComponent('#form').validate((valid, errors) => {
          // console.log('valid', valid, errors)
          if (!valid) {
              const firstError = Object.keys(errors)
              if (firstError.length) {
                  this.setData({
                      error: errors[firstError[0]].message
                  })
              } else {
                this.setData({
                    result: "12312312"
                })
              }
          }
      })
  }
  */
});
