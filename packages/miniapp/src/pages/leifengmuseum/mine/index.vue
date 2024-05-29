<template>
  <view
    class="h-full"
    style="
      background-image: url('https://pqntourism.pcleartv.cn/Ftf4GJtlrrPVMfaKwKT7R8GtsVSB');
      background-size: 100%;
    "
  >
    <n-list
      :down="null"
      :up="null"
      :height="screen"
      bg-type="none"
      box-style="width: 100%; height: 100%"
    >
      <n-list-cell>
        <view class="pt-130rpx text-center font-500 text-38 leading-41rpx">我的</view>
      </n-list-cell>
      <n-list-cell>
        <view class="flex flex-col justify-center items-center mt-76rpx">
          <view
            class="w-166 h-166 rounded-full bg-cover bg-center"
            :style="{
              backgroundImage: `url(${
                userInfo?.avatarUrl || 'https://pqntourism.pcleartv.cn/FvobVc6XIw2ynzrYFQejrMGDPnc-'
              })`,
            }"
          ></view>
          <view
            class="mt-30rpx leading-45rpx font-500 tracking-1rpx"
            :class="mode ? 'text-50' : 'text-42'"
            >{{ userInfo?.nickName || '微信用户' }}</view
          >
        </view>
      </n-list-cell>
      <n-list-cell>
        <view class="mt-80rpx w-full px-40rpx box-border">
          <view class="w-full bg-white">
            <view
              v-for="(item, index) in list"
              :key="index"
              class="w-full h-110 flex justify-between items-center pl-26rpx pr-30rpx box-border"
              @click="handleAction(item)"
            >
              <view class="flex items-center">
                <image
                  :src="item.icon"
                  mode="scaleToFill"
                  class="mr-20rpx"
                  :class="mode ? 'w-50 h-50' : 'w-42 h-42'"
                />
                <view
                  class="font-500 leading-42rpx text-#3b2f2f"
                  :class="mode ? 'text-40' : 'text-34'"
                  >{{ item.name }}</view
                >
              </view>
              <view
                class="ic-baseline-chevron-right text-42 text-#3b2f2f"
                :class="mode ? 'text-48' : 'text-42'"
              ></view>
            </view>
            <!-- <view
              class="w-full h-110 flex justify-between items-center pl-26rpx pr-30rpx box-border"
            >
              <view class="flex items-center">
                <image
                  src="https://pqntourism.pcleartv.cn/FqdVuGbOq2HIIEJw8Wxe7pvsn8vI"
                  mode="scaleToFill"
                  class="mr-20rpx"
                  :class="mode ? 'w-50 h-50' : 'w-42 h-42'"
                />
                <view
                  class="font-500 leading-42rpx text-#3b2f2f "
                  :class="mode ? 'text-40' : 'text-34'"
                  >关怀模式</view
                >
              </view>
              <switch :checked="mode" color="#8B0500" @change="handleChange" />
            </view> -->
          </view>
        </view>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
const { isLogin, setMode, mode, userInfo = {} } = useStore('user')
const list = ref([
  {
    name: '个人资料',
    icon: 'https://pqntourism.pcleartv.cn/FrR3EF-nMk4jLfUnAO5ocx16gF6n',
    url: 'userInfo/index',
  },
  {
    name: '我的预约',
    icon: 'https://pqntourism.pcleartv.cn/FqNgs1ak9qXuQCH9evbWhMUIoF7e',
    shortLink: 'pages/MyOrders1',
  },
  {
    name: '购物车',
    icon: 'https://pqntourism.pcleartv.cn/FsQEg2Q5IyvH5wkF0mLK9wCevMw-',
    url: '',
  },
  {
    name: '收货地址管理',
    icon: 'https://pqntourism.pcleartv.cn/Fqm1zM89edGIuxsN9qkgqa7HJcGq',
    url: '',
  },
  // {
  //   name: '个人消息',
  //   icon: 'https://pqntourism.pcleartv.cn/FmAajmXI1Blahww3UP9O_VPugjTM',
  //   url: '/pages/leifengmuseum/lostList/index',
  // },
  {
    name: '失物招领',
    icon: 'https://pqntourism.pcleartv.cn/FqdVuGbOq2HIIEJw8Wxe7pvsn8vI',
    url: '/pages/leifengmuseum/newsList/index?currentType=2',
  },
])
function handleAction(item) {
  if (!isLogin.value) {
    navigateTo({ url: '/pages/common/login/index?from=/pages/leifengmuseum/mine/index' })
  } else {
    if (item.shortLink) {
      if (item.shortLink.indexOf('小程序') > -1) {
        uni.navigateToMiniProgram({
          shortLink: item.shortLink,
          success(res) {
            console.log(res)
          },
        })
        return
      } else {
        uni.navigateToMiniProgram({
          appId: 'wx34c0c5be57217aae',
          path: item.shortLink,
          success(res) {
            console.log(res)
          },
        })
        return
      }
    }
    if (!item.url) {
      uni.showToast({ title: '敬请期待', icon: 'none' })
      return
    }
    navigateTo({ url: item.url })
  }
}
const handleChange = (e) => {
  setMode(e.detail.value)
}
</script>

<style lang="scss" scoped></style>
