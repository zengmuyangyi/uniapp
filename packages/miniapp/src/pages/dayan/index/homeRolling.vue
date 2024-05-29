<template>
  <view class="w-full h-120 flex items-end">
    <view class="w-full mx-4 mt-4 p-1 h-88 flex items-center notice-bg">
      <view
        class="w-70 h-70 mr-2 title-notice text-white flex flex-col justify-center items-center text-24 leading-24rpx"
        @click="handleClick"
      >
        <div>旅行</div>
        <div class="mt-6rpx">贴士</div>
      </view>
      <view class="h-full flex-1">
        <swiper autoplay circular vertical="true" style="height: 100%">
          <swiper-item
            v-for="(item, index) in hints"
            :key="index"
            class="h-full"
            @click="goPage(item)"
          >
            <view
              :class="mode ? 'text-32' : 'text-28'"
              class="mx-1 text-28 text-#005b78 font-400 leading-9 text-notice"
              >{{ getText(item.title) }}</view
            >
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
import { fetchAnnouncement } from '@/api/scenic'

const { mode } = useStore('user')
const hints = ref([])

async function getAnnouncement() {
  const res = await fetchAnnouncement('')
  hints.value = res.list
}

const goPage = (item) => {
  uni.navigateTo({
    url: `/pages/baoquan/notice/index?id=${item.id}`,
  })
}
getAnnouncement()
</script>

<style scoped lang="scss">
.notice-bg {
  background-image: url('@/static/index/dayan/notice-bg.png');
  background-size: 100% 100%;
  .title-notice {
    background-image: url('@/static/index/dayan/title-notice.png');
    background-size: cover;
  }
  .text-notice {
    // font-family: '仿宋';
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
