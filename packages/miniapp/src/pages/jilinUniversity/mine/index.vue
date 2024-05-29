<template>
  <view class="w-full">
    <view
      class="w-full h-500 bg-contain pt-40rpx box-border flex flex-col items-center"
      style="background-image: url(https://pqntourism.pcleartv.cn/Fs2r5XHeV9KmOy0cgzoEiszgx7td)"
    >
      <view
        class="w-150 h-150 bg-white rounded-full flex justify-center items-center flex-shrink-0"
      >
        <view
          v-if="userInfo?.headImage"
          class="w-full h-full bg-center bg-cover rounded-full"
          :style="{ backgroundImage: `url(${userInfo.headImage})` }"
        ></view>
        <image
          v-else
          src="https://pqntourism.pcleartv.cn/Fs7BhGhRZZhTB0IDBbjXC65iMcyj"
          mode="scaleToFill"
          class="w-full h-full"
        />
      </view>
      <view
        @click="goLogin"
        class="text-34 font-bold text-white tracking-2rpx mt-26rpx leading-34rpx siyuan_ht"
        >{{ userInfo ? `欢迎${userInfo.name}同学` : '点击登录' }}</view
      >
      <view @click="goUserInfo" class="flex items-center mt-28rpx">
        <image
          src="https://pqntourism.pcleartv.cn/FjB31RvBmIqbSKfsBlYvMHjEF4bV"
          mode="scaleToFill"
          class="w-24 h-24 mr-10rpx"
        />
        <view class="text-26 text-white tracking-2rpx leading-26rpx siyuan_ht">查看个人信息</view>
      </view>
      <view class="mt-30rpx h-164 w-full overflow-hidden">
        <uni-grid :column="3" :showBorder="false" :highlight="false" :square="false" class="w-full">
          <uni-grid-item>
            <view class="h-164 flex flex-col items-center justify-center pt-10rpx box-border">
              <view class="text-32 font-bold tracking-2rpx text-#f8e71c siyuan_ht"
                >{{ userInfo?.trainClassHours + userInfo?.courseClassHours || 0 }}学时</view
              >
              <view class="text-28 font-500 tracking-2rpx text-white mt-25rpx siyuan_ht"
                >总学时</view
              >
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="h-164 flex flex-col items-center justify-center pt-10rpx box-border">
              <view class="text-32 font-bold tracking-2rpx text-#f8e71c siyuan_ht"
                >{{ userInfo?.trainClassHours || 0 }}学时</view
              >
              <view class="text-28 font-500 tracking-2rpx text-white mt-25rpx siyuan_ht"
                >集中培训学时</view
              >
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="h-164 flex flex-col items-center justify-center pt-10rpx box-border">
              <view class="text-32 font-bold tracking-2rpx text-#f8e71c siyuan_ht"
                >{{ userInfo?.courseClassHours || 0 }}学时</view
              >
              <view class="text-28 font-500 tracking-2rpx text-white mt-25rpx siyuan_ht"
                >网络自学学时</view
              >
            </view>
          </uni-grid-item>
        </uni-grid>
      </view>
    </view>
    <view
      class="w-full h-120 px-40rpx flex justify-between items-center"
      v-for="(item, index) in list"
      :key="index"
      @click="handleClick(item)"
    >
      <view class="flex items-center">
        <image :src="item.icon" mode="scaleToFill" class="w-50 h-50 mr-20rpx" />
        <view class="text-28 leading-37rpx tracking-1rpx yahei">{{ item.name }}</view>
      </view>
      <view v-if="item.name !== '退出登录'" class="ic-baseline-chevron-right text-42"></view>
    </view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        content="确定退出登录吗？"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
const { isLog, userInfo, cleanToken } = useStore('szgbxy')
console.log('***', isLog.value)
const list = computed(() => {
  const temp = [
    {
      name: '我的课程',
      icon: 'https://pqntourism.pcleartv.cn/FqlcPUMhcwYLVdteb7CzEyfVpy8G',
      url: '/pages/jilinUniversity/myCourse/index',
      needLog: true,
    },
    {
      name: '我的培训',
      icon: 'https://pqntourism.pcleartv.cn/FnMkaFFTyyXNnqa7e_JrP76-TwyY',
      url: '/pages/jilinUniversity/myTraining/list',
      needLog: true,
    },
    {
      name: '我的测试',
      icon: 'https://pqntourism.pcleartv.cn/FpVb633mI813unF9-eUrft2JC3RN',
      url: '',
      needLog: true,
    },
    {
      name: '学习通知',
      icon: 'https://pqntourism.pcleartv.cn/Fu86SR43VzniwHUSvRG9WNBm2zFC',
      url: ``,
      needLog: true,
    },
    {
      name: '用户手册',
      icon: 'https://pqntourism.pcleartv.cn/FptXtjtnymzVWXWjQjeot8OTlyct',
      url: '',
    },
  ]
  if (isLog.value) {
    temp.push({
      name: '退出登录',
      icon: 'https://pqntourism.pcleartv.cn/FkaPe1wCDBAqrfCOMmvZXUl-6Q9y',
    })
  }
  return temp
})
const goUserInfo = () => {
  if (!isLog.value) return goLogin()
  uni.navigateTo({
    url: '/pages/jilinUniversity/userInfo/index',
  })
}
const handleClick = (item) => {
  if (item.needLog && !isLog.value) return goLogin()
  if (item.name === '退出登录') {
    popup.value.open()
    return
  }
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
  } else {
    uni.showToast({
      title: '正在建设中，敬请期待...',
      icon: 'none',
    })
  }
}
const goLogin = () => {
  if (isLog.value) return
  uni.navigateTo({
    url: '/pages/jilinUniversity/login/index',
  })
}
const popup = ref()
const close = () => {
  popup.value.close()
}

const confirm = async () => {
  await cleanToken()
  popup.value.close()
}
</script>

<style lang="scss" scoped></style>
