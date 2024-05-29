<template>
  <n-list bg-type="none" :down="null" :up="null" height="window">
    <n-list-cell>
      <view class="w-full">
        <swiper
          v-if="data.images"
          style="height: 400rpx; width: 100%"
          circular
          :indicator-dots="false"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          :current="current"
          @change="handleChange"
        >
          <swiper-item v-for="(item, index) in formatImage(data.images)" :key="index">
            <image :src="item" mode="aspectFill" class="w-full h-400" />
          </swiper-item>
        </swiper>
        <view class="flex mt-20rpx justify-center items-center">
          <view
            v-for="(item, idx) in formatImage(data.images)"
            :key="idx"
            class="w-10 h-10 rounded-full mx-6rpx"
            :style="{
              background:
                current === idx ? `linear-gradient( 315deg, #1DDBF5 0%, #4D91FF 100%)` : '#D1D1D1',
            }"
            style="box-shadow: 0px 2px 14px 3px rgba(71, 71, 71, 0.08)"
          ></view>
        </view>
      </view>
    </n-list-cell>
    <n-list-cell>
      <view class="px-28rpx py-30rpx">
        <view class="text-32 leading-36rpx font-800">{{ data.title }}</view>
        <view class="mt-36rpx">
          <mp-html :content="data.content" class="text-28 leading-48rpx text-#2b2b2b"></mp-html>
        </view>
        <view class="mt-60rpx text-24 leading-41rpx text-#777"
          >发表于 {{ dayjs(data.createTime).format('YYYY-MM-DD') }}</view
        >
      </view>
    </n-list-cell>
  </n-list>
</template>

<script setup>
import dayjs from 'dayjs'
import { formatImage } from '@/service/util'
const data = ref({
  title: '芳兰湖 满足了我对湿地的所有期待～',
  user: '星星🌟',
  avatar: 'https://pqntourism.pcleartv.cn/Fq1ugivn5bYA9QofZgqLvPWLnhKc',
  cover: 'https://pqntourism.pcleartv.cn/Fl3sghoMj7dxNpYoDCsKgsj-SbyS',
  frequency: 263,
  images:
    'https://pqntourism.pcleartv.cn/Fl3sghoMj7dxNpYoDCsKgsj-SbyS,https://pqntourism.pcleartv.cn/Fk93OEvdq069L-2NHa35mzRFf50m,https://pqntourism.pcleartv.cn/Fke16V1BiQZdyyvOFLmVl6Y5zvNE',
  content: `<p>芳兰湖湿地公园文化资源多样，内涵丰富，农耕文化、湿地饮食文化、湿地民风民俗、水利文化、人文历史文化互相融合、共生共荣，形成魅力四射的地域文化。</p><p>芳兰湖湿地公园正在创建集生态涵养、科普教育、亲水游憩、休闲娱乐、文化体验、夜间消费等功能于一体的国家级4A级旅游景区，通过不断完善景区旅游基础服务设施和服务质量，全力打造科技城新名片。</p>`,
  createTime: new Date(),
})
const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
}
const current = ref(0)

const handleChange = (e) => {
  current.value = e.target?.current || 0
}
</script>

<style lang="scss" scoped></style>
