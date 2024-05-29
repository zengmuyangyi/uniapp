<script>
export default {
  // 全局语言设置
  globalData: {
    languageList: [],
  },
  onLaunch: function () {
    console.log('&&&', UNI_PROJECT)
    if (
      UNI_PROJECT !== 'liuyangfuyou' &&
      UNI_PROJECT !== 'szgbxy' &&
      UNI_PROJECT !== 'liuyangfuyou' &&
      UNI_PROJECT !== 'hbgatpark' &&
      UNI_PROJECT !== 'jilinUniversity'
    ) {
      console.log('App Launch')
      const { initData } = useStore('scenic')
      initData()

      // 静默登录，获取用户信息，如果未拿到手机号，则不算登录成功
      const { login } = useStore('user')
      login()
    }
    if (UNI_PROJECT === 'szgbxy' || UNI_PROJECT === 'jilinUniversity') {
      const { getUserInfo } = useStore('szgbxy')
      getUserInfo()
    }
  },
  onShow: function () {
    console.log('App Show')

    // uni.getLocation({
    //   type: 'gcj02',
    //   success: function (res) {
    //     console.log('%c [ res ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    //   },
    // })
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/* 每个页面公共css */
@import '@/nPro/base.scss';
@import '@/static/result.css';
@import '@/static/font/siyuan_st.css';
@import '@/static/font/siyuan_ht.css';
@import 'vk-uview-ui/index.scss';
@import '@/static/font/YRDZST-Medium.css';
/* #ifdef H5 */
uni-page-head {
  display: none;
}
uni-page-head[uni-page-head-type='default'] ~ uni-page-wrapper {
  height: 100% !important;
}

.uni-app--showtabbar {
  uni-page,
  uni-page-wrapper {
    height: calc(100vh - 100rpx) !important;
  }
}
/* #endif */
@import 'vk-uview-ui/index.scss';

body {
  font-family: 'PingFangSC-Regular', 'PingFang SC';
}
.siyuan_st {
  font-family: 'Source Han Serif CN VF';
}
.siyuan_ht {
  font-family: 'Source Han Sans Regular';
}
.yrdzst {
  font-family: 'YRDZST-Medium';
  // font-family: 'Source Han Serif CN VF';
}
.common-color {
  color: #3b2121;
}
.font-style {
  font-family: 'slideyouran', '仿宋', '微软雅黑';
}
.yahei {
  font-family: '微软雅黑';
}
.title {
  color: #735713;
  font-weight: 400;
}

.box-shadow {
  box-shadow: 0px 6px 20px 0px rgba(211, 211, 211, 0.5);
}

.green-bg {
  background: linear-gradient(90deg, #71d167 0%, #0caf83 100%);
}

.tag-bg {
  background-image: url('@/static/ui/tag-bg.png');
  background-size: cover;
}

.red-bg {
  background: linear-gradient(90deg, #e8551f 0%, #e87642 100%);
}

.yellow-bg {
  background: linear-gradient(90deg, #f2d23e 0%, #ffb735 100%);
}

.white-bg {
  backdrop-filter: blur(23rpx);
  background: rgba(255, 255, 255, 0.1);
}

/**
* 限制page的高度为100%，这样页面下直接使用scroll-view的时候，才会flex:1生效。能够继承高度
*/
/* #ifndef APP-NVUE */
page {
  height: 100%;
}

.icon {
  display: inline-block;
}

/* #endif */
$btn-color: #0caf83;

.uni-btn {
  text-align: center;
  letter-spacing: 4rpx;
  background-color: #f8f8f8;
  border: 1px solid darken(#f8f8f8, 5%);
  outline: none;
  padding: 0 20rpx;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    border: none;
  }

  &.primary {
    background-color: $btn-color;
    border-color: darken($btn-color, 5%);
    color: #fff;

    &[disabled] {
      color: #fff;
      background-color: lighten($btn-color, 15%);
      border-color: lighten($btn-color, 10%);
    }

    &.outline {
      color: darken($btn-color, 5%);
      background: transparent;

      &[disabled] {
        color: lighten($btn-color, 10%);
        border-color: lighten($btn-color, 10%);
      }
    }
  }

  &.lg {
    height: 90rpx;
    line-height: 90rpx;
    font-size: 32rpx;
  }

  &.md {
    height: 75rpx;
    line-height: 75rpx;
    font-size: 28rpx;
  }

  &.md-70 {
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
  }

  &.sm {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 26rpx;
  }
}
</style>
