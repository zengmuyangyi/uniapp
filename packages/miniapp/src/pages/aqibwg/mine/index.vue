<template>
  <view
    class="w-full h-full bg-contain"
    style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
  >
    <view
      class="w-full h-full bg-no-repeat"
      style="
        background-image: url(https://pqntourism.pcleartv.cn/FvYMnGGvFsY5a4-I-ADD1Svpv4tg);
        background-size: 207rpx 106rpx;
        background-position: right bottom;
      "
    >
      <!-- 顶部导航栏 -->
      <n-position pos="top" box-style="width:750rpx;">
        <view class="bg-transparent">
          <n-height height="status"></n-height>
          <n-height height="nav">
            <view class="flex h-full w-full items-center px-3 justify-center">
              <span class="text-32 font-bold leading-46rpx text-center text-#3b220e siyuan_st"
                >个人中心</span
              >
            </view>
          </n-height>
        </view>
      </n-position>
      <view
        class="px-30rpx w-full h-full bg-no-repeat pt-180rpx box-border"
        style="
          background-image: url(https://pqntourism.pcleartv.cn/FuTKpvREyaWMztaVBWmfgX0Um6P4);
          background-size: 448rpx 693rpx;
        "
      >
        <view class="w-full h-100"></view>
        <view class="flex flex-col w-full items-center">
          <view
            class="w-110 h-110 bg-cover bg-center rounded-full"
            :style="{
              backgroundImage: `url(${
                userInfo?.avatarUrl || 'https://pqntourism.pcleartv.cn/FgbE1ffZvM3XOa-Z6udf9v1fgdaE'
              })`,
            }"
          ></view>
          <view class="mt-26rpx text-32 font-bold leading-46rpx text-#3b220e siyuan_st">{{
            userInfo?.nickName || '微信用户'
          }}</view>
          <view class="mt-90rpx w-full px-40rpx box-border">
            <view
              v-for="(item, index) in list"
              :key="index"
              class="w-full h-110 flex justify-between items-center pl-22rpx pr-29rpx"
              style="box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(59, 47, 47, 0.26)"
              @click="handleAction(item)"
            >
              <view class="flex items-center">
                <image :src="item.icon" mode="scaleToFill" class="w-50 h-50 mr-16rpx" />
                <view class="text-32 font-bold leading-42rpx text-#3b2f2f siyuan_st">{{
                  item.name
                }}</view>
              </view>
              <image
                src="https://pqntourism.pcleartv.cn/Fl3LdREg4mosuydp_-cKq5B67Ijr"
                mode="scaleToFill"
                class="w-12 h-20"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const { isLogin, userInfo = {} } = useStore('user')
const list = ref([
  {
    name: '个人资料',
    icon: 'https://pqntourism.pcleartv.cn/Fhf74wgFuxD73Nefy1OU_cQ1OHy5',
    url: 'userInfo/index',
  },
  {
    name: '我的收藏',
    icon: 'https://pqntourism.pcleartv.cn/FjNFsILDjyh2qEwViTGYpauYmpOD',
    url: 'myCollect/index',
  },
  {
    name: '意见反馈',
    icon: 'https://pqntourism.pcleartv.cn/Fm-L_WAy7c2Ub9moR6yQLo8upaMo',
    url: '/pagesShangyou/pages/feedbackFirst/index',
  },
])
function handleAction(item) {
  if (!isLogin.value) {
    navigateTo({ url: '/pages/common/login/index?from=/pages/aqibwg/mine/index' })
  } else {
    if (!item.url) {
      uni.showToast({ title: '敬请期待', icon: 'none' })
      return
    }
    navigateTo({ url: item.url })
  }
}

onShow(() => {
  const curPages = getCurrentPages()[0] // 获取当前页面实例
  if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
    curPages.getTabBar().setData({
      selected: 3, // 表示当前菜单的索引，该值在不同的页面表示不同
    })
  }
})
</script>

<style lang="scss" scoped></style>
