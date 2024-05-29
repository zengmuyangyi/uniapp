<template>
  <view
    class="w-full min-h-100vh bg-contain bg-no-repeat relative bg-#f6f8fb"
    style="background-image: url('https://pqntourism.pcleartv.cn/Fi1gQJUkPrdNTODjJzovU7SfDdHN')"
  >
    <view class="pt-176rpx pl-68rpx flex items-center">
      <view
        class="w-124 h-124 rounded-full bg-cover bg-center"
        :style="{
          backgroundImage: `url(${
            userInfo?.avatarUrl || 'https://pqntourism.pcleartv.cn/FtkM4EBh__uN28a_JbzxpOmH6i3c'
          })`,
        }"
      ></view>
      <view class="ml-32rpx text-36 leading-50rpx font-800">{{
        userInfo.nickName || '微信用户'
      }}</view>
    </view>
    <view class="mt-50rpx w-full px-20rpx box-border">
      <view class="w-full bg-white px-25rpx box-border rounded-12rpx">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="w-full h-120 flex justify-between items-center"
          @click="handleAction(item)"
        >
          <view class="flex items-center">
            <image :src="item.icon" mode="scaleToFill" class="w-50 h-50" />
            <view class="ml-20rpx text-30 leading-42rpx text-#3e3e3e">{{ item.name }}</view>
          </view>
          <view class="flex items-center">
            <view
              v-if="item.name === '通知消息'"
              class="w-30 h-30 rounded-full text-center leading-30rpx text-21 font-600 text-white mr-24rpx bg-#ff7c66"
              >99</view
            >
            <view class="ic-baseline-chevron-right w-42 h-42"></view>
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
    name: '个人信息',
    icon: 'https://pqntourism.pcleartv.cn/FmDAWxAjs3tdOnIP4YWRtDtauOdL',
    url: 'userInfo/index',
  },
  {
    name: '通知消息',
    icon: 'https://pqntourism.pcleartv.cn/FnF825HExYyrOAL7sWCVyLDJuIIC',
    url: '',
  },
  {
    name: '我的游记',
    icon: 'https://pqntourism.pcleartv.cn/FsNUyfZ46YQE57O2n0uZeCB5DeM1',
    url: '/pages/fanglanhu/myStrategy/index',
  },
  {
    name: '智能客服',
    icon: 'https://pqntourism.pcleartv.cn/Fqj2ObSPfPJlQrJenK89bEJ0qsnS',
    url: '/pagesCustom/pages/serviceAi/index',
  },
  {
    name: '订单管理',
    icon: 'https://pqntourism.pcleartv.cn/FmZ49YJzOl6z07azchNIDOX7QtAC',
    url: '',
  },
  {
    name: '一键救援',
    icon: 'https://pqntourism.pcleartv.cn/FgLn8Jm11SPWVbo88Mwu3rfcQpTm',
    url: 'rescue/index',
  },
])
function handleAction(item) {
  if (!isLogin.value) {
    navigateTo({ url: '/pages/common/login/index?from=/pages/fanglanhu/mine/index' })
  } else {
    if (!item.url) {
      uni.showToast({ title: '敬请期待', icon: 'none' })
      return
    }
    navigateTo({ url: item.url })
  }
}
</script>

<style lang="scss" scoped></style>
