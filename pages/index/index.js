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

      formData: {
      },
      rules: [{
          name: 'radio',
          rules: {required: false, message: '单选列表是必选项'},
      }, {
          name: 'checkbox',
          rules: {required: true, message: '多选列表是必选项'},
      }, {
          name: 'name',
          rules: {required: true, message: '请输入姓名'},
      }, {
          name: 'qq',
          rules: {required: true, message: 'qq必填'},
      }, {
          name: 'mobile',
          rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
      }]
  },
  bindDateChange: function (e) {
      this.setData({
          date: e.detail.value,
          [`formData.date`]: e.detail.value
      })
  },
  formInputChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
          [`formData.${field}`]: e.detail.value
      })
  },
  bindJiTaiChange: function(e) {
      console.log('picker country 发生选择改变，携带值为', e.detail.value);

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
  submitForm() {
      this.selectComponent('#form').validate((valid, errors) => {
          console.log('valid', valid, errors)
          if (!valid) {
              const firstError = Object.keys(errors)
              if (firstError.length) {
                  this.setData({
                      error: errors[firstError[0]].message
                  })
              }
          } else {
              wx.showToast({
                  title: '校验通过'
              })
          }
      })
  }
});
