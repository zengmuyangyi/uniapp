<template>
  <view
    class="w-full min-h-100vh bg-contain bg-no-repeat relative bg-#f6f8fb"
    style="background-image: url('https://pqntourism.pcleartv.cn/Fi1gQJUkPrdNTODjJzovU7SfDdHN')"
  >
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span class="text-30 leading-42rpx font-800">我的游记</span>
          </view>
        </n-height>
      </view>
    </n-position>
    <view class="w-full px-20rpx pt-180rpx box-border">
      <view class="flex items-center ml-48rpx">
        <view
          class="w-124 h-124 rounded-full bg-center bg-cover"
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
      <view class="mt-60rpx flex">
        <view
          v-for="(item, index) in tabList"
          :key="index"
          class="w-186 h-56 rounded-28rpx flex justify-center items-center"
          :class="index ? 'ml-20rpx' : ''"
          :style="{
            background:
              currentTab === index ? 'linear-gradient( 315deg, #1DDBF5 0%, #4D91FF 100%)' : '#fff',
            color: currentTab === index ? '#fff' : '#777',
          }"
          @click="handleClick(index)"
        >
          <view class="text-24 leading-36rpx font-600">{{ `${item.name} （${item.num}）` }}</view>
        </view>
      </view>
      <view class="mt-30rpx">
        <n-waterfall
          ref="list"
          bg-type="none"
          :auto-update="true"
          :column-count="2"
          height="window-!450rpx"
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
  </view>
</template>

<script setup>
const { userInfo = {} } = useStore('user')
const currentTab = ref(0)
const tabList = ref([
  {
    name: '短视频',
    num: 3,
  },
  {
    name: '图文',
    num: 2,
  },
])
const handleClick = (index) => {
  currentTab.value = index
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
</script>

<style lang="scss" scoped></style>
