<template>
  <view
    class="w-full min-h-100vh bg-contain bg-no-repeat relative bg-#f6f8fb"
    style="background-image: url('https://pqntourism.pcleartv.cn/Fi1gQJUkPrdNTODjJzovU7SfDdHN')"
  >
    <view class="w-full px-20rpx box-border pt-140rpx">
      <view class="flex">
        <view
          v-for="(item, index) in typeList"
          :key="index"
          :class="index ? 'ml-20rpx' : ''"
          class="py-10rpx px-41rpx rounded-28rpx text-24 leading-36rpx font-600"
          :style="{
            background:
              currentType === index ? 'linear-gradient( 315deg, #1DDBF5 0%, #4D91FF 100%)' : '#fff',
            color: currentType === index ? '#fff' : '#777',
          }"
          @click="changeType(index)"
          >{{ item.name }}</view
        >
      </view>
      <view class="w-full my-30rpx">
        <n-waterfall
          ref="list"
          bg-type="none"
          :auto-update="true"
          :column-count="2"
          height="window-!200rpx"
          column-gap="20rpx"
          @down="getStrategyList"
          @up="getStrategyList"
        >
          <n-waterfall-view ref="water" column-gap="20rpx" :calculator="null">
            <template #left="{ lefts }">
              <view v-for="(item, idx) in lefts" :key="idx">
                <view
                  @click="goDetail(item)"
                  class="bg-white rounded-8rpx w-full overflow-hidden pb-20rpx"
                  :class="idx ? 'mt-20rpx' : ''"
                >
                  <image :src="item.cover" mode="widthFix" class="w-full" />
                  <view
                    class="mt-20rpx w-full px-24rpx box-border text-26 font-800 leading-36rpx"
                    >{{ item.title }}</view
                  >
                  <view
                    class="mt-24rpx w-full px-24rpx box-border flex justify-between items-center"
                  >
                    <view class="flex items-center">
                      <view
                        class="w-36 h-36 rounded-full bg-gray-200 bg-cover bg-center"
                        :style="{ backgroundImage: `url(${item.avatar})` }"
                      ></view>
                      <view class="ml-6rpx text-22 leading-36rpx text-#656565">{{
                        item.user
                      }}</view>
                    </view>
                    <view class="flex items-center text-#656565">
                      <view class="w-36 h-36 ic-outline-remove-red-eye"></view>
                      <view class="text-22 leading-36rpx">{{ item.frequency }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </template>
            <template #right="{ rights }">
              <view v-for="(item, idx) in rights" :key="idx">
                <view
                  @click="goDetail(item)"
                  class="bg-white rounded-8rpx w-full overflow-hidden pb-20rpx"
                  :class="idx ? 'mt-20rpx' : ''"
                >
                  <image :src="item.cover" mode="widthFix" class="w-full" />
                  <view
                    class="mt-20rpx w-full px-24rpx box-border text-26 font-800 leading-36rpx"
                    >{{ item.title }}</view
                  >
                  <view
                    class="mt-24rpx w-full px-24rpx box-border flex justify-between items-center"
                  >
                    <view class="flex items-center">
                      <view
                        class="w-36 h-36 rounded-full bg-gray-200 bg-cover bg-center"
                        :style="{ backgroundImage: `url(${item.avatar})` }"
                      ></view>
                      <view class="ml-6rpx text-22 leading-36rpx text-#656565">{{
                        item.user
                      }}</view>
                    </view>
                    <view class="flex items-center text-#656565">
                      <view class="w-36 h-36 ic-outline-remove-red-eye"></view>
                      <view class="text-22 leading-36rpx">{{ item.frequency }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </template>
          </n-waterfall-view>
        </n-waterfall>
      </view>
    </view>
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span class="text-30 leading-42rpx font-800">游记攻略</span>
          </view>
        </n-height>
      </view>
    </n-position>
    <!-- 右下角“+”内容 -->
    <view
      class="w-130 h-130 fixed right-30 bottom-135 rounded-full"
      style="
        background: linear-gradient(315deg, #1ddbf5 0%, #4d91ff 100%);
        box-shadow: 0px 2px 14px 3px rgba(71, 71, 71, 0.08);
      "
      @click.stop="handleShow"
    >
      <view class="w-full h-full relative flex justify-center items-center">
        <view
          class="w-100 h-100 text-white transition-all duration-300 ic-baseline-plus"
          :class="isShow ? 'rotate-45' : ''"
        ></view>
        <view
          class="absolute w-316 bottom-140 right-8 transition-all duration-300 px-34rpx pt-25rpx pb-46rpx box-border overflow-hidden"
          :class="isShow ? 'h-222 opacity-100' : 'h-0 opacity-0'"
          style="
            background-image: url('https://pqntourism.pcleartv.cn/FtPamsHZVr2hDoSV8-79xFvWWdct');
            background-size: 100% 100%;
          "
        >
          <view class="flex flex-col justify-between h-full">
            <view @click="addStrategy('image', '发布图文')" class="flex items-center">
              <image
                src="https://pqntourism.pcleartv.cn/FuxhmoiZRWKrwSK2CcLQMYpnwEcN"
                mode="scaleToFill"
                class="w-50 h-50"
              />
              <view class="text-30 leading-36rpx text-white ml-13rpx">发布图文</view>
            </view>
            <view @click="addStrategy('video', '发布短视频')" class="flex items-center">
              <image
                src="https://pqntourism.pcleartv.cn/Fk5F_gN5BAN9IkBvmeSKlv-32T32"
                mode="scaleToFill"
                class="w-50 h-50"
              />
              <view class="text-30 leading-36rpx text-white ml-13rpx">发布短视频</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const typeList = ref([
  {
    name: '攻略',
  },
  {
    name: '游记',
  },
])
const currentType = ref(0)
const changeType = (index) => {
  currentType.value = index
}
// ---------------------------获取游记攻略列表----------------------
const list = ref()
const water = ref()
const getStrategyList = async (cp) => {
  const ins = list.value
  const res = {
    nextPage: 0,
    list: [
      {
        title: '芳兰湖湿地公园休闲半日游',
        user: '星星🌟',
        avatar: 'https://pqntourism.pcleartv.cn/Fq1ugivn5bYA9QofZgqLvPWLnhKc',
        cover: 'https://pqntourism.pcleartv.cn/Fl3sghoMj7dxNpYoDCsKgsj-SbyS',
        frequency: 263,
      },
      {
        title: '湿地公园休闲二日游',
        user: '白杨树树',
        avatar: 'https://pqntourism.pcleartv.cn/Fny_baqv1Vt4E91OuEllsGpUniYS',
        cover: 'https://pqntourism.pcleartv.cn/Fk93OEvdq069L-2NHa35mzRFf50m',
        frequency: 203,
      },
      {
        title: '湿地公园休闲一日游',
        user: '燕子',
        avatar: 'https://pqntourism.pcleartv.cn/FgpeJL_ir7hJOg0fMioqFAq2lMzD',
        cover: 'https://pqntourism.pcleartv.cn/Fke16V1BiQZdyyvOFLmVl6Y5zvNE',
        frequency: 183,
      },
      {
        title: '湿地公园休闲三日游',
        user: '小太阳',
        avatar: 'https://pqntourism.pcleartv.cn/Fhb-HhtXSNNgoqkSWOnCGYHs7jra',
        cover: 'https://pqntourism.pcleartv.cn/FtuCCMD6q9z0V9SxFCjAcZulFCVy',
        frequency: 167,
      },
    ],
  }
  if (cp === 1) {
    water.value.clear()
    water.value.set(res.list)
  } else {
    water.value.concat(res.list)
  }
  console.log('***', water)
  ins.nEndSuccess(!!res.nextPage)
}
const goDetail = () => {
  uni.navigateTo({
    url: `/pages/fanglanhu/strategy/detail`,
  })
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
// ---------------------------右下角“+”号功能----------------------
const isShow = ref(false)
const handleShow = () => {
  isShow.value = !isShow.value
}
const addStrategy = (type, title) => {
  console.log('&&&')
  uni.navigateTo({
    url: `/pages/fanglanhu/release/index?type=${type}&title=${title}`,
  })
}
</script>

<style lang="scss" scoped></style>
