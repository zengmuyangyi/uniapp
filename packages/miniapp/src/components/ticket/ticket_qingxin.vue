<template>
  <view v-if="currentScenic.ticketUrl" class="p-30rpx w-full box-border">
    <view
      class="w-full h-170 rounded-26rpx overflow-hidden p-10rpx box-border bg-cover"
      style="background-image: url('https://pqntourism.pcleartv.cn/Fu3kBlWcbVk4F79VQtaOnvgCZNe1')"
      @click="goPage(currentScenic.ticketUrl)"
    >
      <view
        class="w-full h-full border-2 border-solid border-white rounded-24rpx box-border flex justify-center items-center"
      >
        <view class="flex items-center text-white text-46">
          <view class="tracking-9rpx">{{ $t('BuyTicket') }}</view>
          <view class="ml-57rpx w-50 h-50">
            <image src="/static/index/next.png" mode="scaleToFill" class="w-full h-full" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import $t from '@/service/i18n'

const { programTree, currentScenic } = useStore('scenic')
const ticket = computed(() => {
  const data = programTree.value[0].children.find((i) => i.code === 'ticket')
  return data
})

const { isLogin } = useStore('user')

const goPage = (path) => {
  // 获取到用户手机才算登录成功
  // if (!isLogin.value) {
  //   const project = UNI_PROJECT || 'default'
  //   uni.navigateTo({
  //     url: `/pages/common/login/index?from=/pages/${project}/index/index`,
  //   })
  //   return
  // }
  // 购票链接
  if (path.indexOf('小程序') > -1) {
    uni.navigateToMiniProgram({
      shortLink: path,
      success(res) {
        console.log(res)
      },
    })
  } else {
    if (path.indexOf('?') > -1) {
      const temp = path.split('?')
      uni.navigateTo({
        url: `/pages/common/webLink/index?url=${temp[0]}&${temp[1]}`,
      })
    } else {
      uni.navigateTo({ url: `/pages/common/webLink/index?url=${path}` })
    }
  }
  // const isDev = import.meta.env.MODE === 'development'
  // switch (true) {
  //   case path.includes('小程序'):
  //     if (isDev) {
  //       // 测试时无法跳转小程序
  //       uni.navigateTo({ url: '/pages/cticket/index/index' })
  //       return
  //     }
  //     uni.navigateToMiniProgram({
  //       shortLink: path,
  //       success(res) {
  //         console.log(res)
  //       },
  //     })
  //     break
  //   case path.includes('http'):
  //     uni.navigateTo({ url: `/pages/common/webLink/index?title=购票&url=${path}` })
  //     break
  //   case path.includes('wx'):
  //     uni.navigateToMiniProgram({
  //       appId: path,
  //       success(res) {
  //         console.log(res)
  //       },
  //     })
  //     break
  //   default:
  //     uni.navigateTo({ url: '/pages/cticket/index/index' })
  //     break
  // }
}
</script>

<style lang="scss" scoped></style>
