<template>
  <view>
    <view v-if="extConfig.project === 'kunshanopera'">
      <n-list bg-type="inverse" :down="null" :up="null" height="window" class="text-28">
        <n-list-cell>
          <view class="mt-75rpx">
            <view class="w-188 h-188 mx-auto">
              <image
                :src="
                  userInfo?.avatarUrl ||
                  'https://pqntourism.pcleartv.cn/FkZthmrQ_sGZAsqSwUmG65d83tV8'
                "
                mode="aspectFill"
                class="w-188 h-188 rounded-full"
              />
            </view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="mt-45rpx">
            <view class="flex justify-center">
              <span v-if="userInfo?.nickName || isLogin" class="text-40 font-600">
                {{ userInfo.nickName || '微信用户' }}
              </span>
              <span
                v-else
                class="inline-block border p-2 px-4 text-40 font-600"
                @click="handleAction('login')"
              >
                {{ $t('login') }} / {{ $t('register') }}
              </span>
            </view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="mt-10rpx mb-70rpx text-26 text-#727272 flex justify-center"
            >欢迎来到昆山戏曲百戏博物馆～</view
          >
        </n-list-cell>
        <n-list-cell>
          <div
            v-for="(item, index) in list"
            :key="index"
            class="flex justify-between items-center p-6 border-b border-gray-100"
            @click="handleAction(item)"
          >
            <div class="flex items-center">
              <image :src="item.icon" mode="scaleToFill" class="w-34 h-40 mr-5" /> {{ item.name }}
            </div>
            <span class="ic-baseline-chevron-right text-gray"></span>
          </div>
        </n-list-cell>
      </n-list>
    </view>
    <view
      v-else-if="['shangyouxian', 'dayan'].includes(extConfig.project)"
      style="background-image: url('https://pqntourism.pcleartv.cn/FghjJIagweE5jZulZ2ELRoeAzeGB')"
    >
      <n-list bg-type="none" :down="null" :up="null" height="window" class="text-28">
        <n-list-cell>
          <view class="mt-155rpx">
            <view class="text-36 leading-50rpx font-800 text-center">我的</view>
            <view class="w-180 h-180 mt-45rpx mx-auto">
              <image
                :src="
                  userInfo?.avatarUrl ||
                  'https://pqntourism.pcleartv.cn/FkZthmrQ_sGZAsqSwUmG65d83tV8'
                "
                mode="aspectFill"
                class="w-180 h-180 rounded-full"
              />
            </view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="mt-20rpx">
            <view class="flex justify-center">
              <span v-if="userInfo?.nickName || isLogin" class="text-32 font-600">
                {{ userInfo.nickName || '微信用户' }}
              </span>
              <span
                v-else
                class="inline-block border p-2 px-4 text-32 font-600"
                @click="handleAction('login')"
              >
                {{ $t('login') }} / {{ $t('register') }}
              </span>
            </view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="px-20rpx mt-50rpx w-full box-border">
            <view
              class="bg-white rounded-24rpx w-full px-30rpx box-border"
              style="box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.1)"
            >
              <view v-for="(item, index) in list" :key="index">
                <view v-if="index" class="w-full h-2 bg-#e8e8e8"></view>
                <view
                  class="flex justify-between items-center py-42rpx"
                  @click="handleAction(item)"
                >
                  <view class="flex items-center">
                    <image :src="item.icon" mode="scaleToFill" class="w-40 h-40 mr-20rpx" />
                    <view class="leading-45rpx text-32"> {{ item.name }}</view>
                  </view>
                  <span class="ic-baseline-chevron-right text-gray"></span>
                </view>
              </view>
            </view>
          </view>
        </n-list-cell>
      </n-list>
    </view>
    <n-list v-else bg-type="inverse" :down="null" :up="null" height="window" class="text-28">
      <n-list-cell>
        <div
          class="h-350 flex items-center relative overflow-hidden bg-gray mb-2"
          style="padding-bottom: 30rpx"
        >
          <div
            class="absolute w-full h-full bg-opacity-20 bg-bottom scale-105"
            :style="{
              background: `url(${bg}) 100% 100% `,
              backgroundSize: 'cover',
              filter: 'blur(10rpx)',
            }"
          ></div>

          <div class="p-10 flex items-center relative mt-10">
            <image
              :src="
                userInfo?.avatarUrl ||
                'https://pqntourism.pcleartv.cn/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F.png'
              "
              mode="aspectFill"
              class="w-150 h-150 rounded-full"
            />

            <span v-if="userInfo?.nickName || isLogin" class="text-white text-30 ml-3">
              {{ userInfo.nickName || '微信用户' }}
            </span>

            <span
              v-else
              class="inline-block border border-white p-2 px-4 rounded-full text-white text-30 ml-3"
              @click="handleAction('login')"
            >
              {{ $t('login') }} / {{ $t('register') }}
            </span>
          </div>

          <div
            class="h-30 rounded-lt-10 rounded-rt-10 bg-white absolute bottom--1 w-full z-999"
          ></div>
        </div>
      </n-list-cell>
      <n-list-cell>
        <div
          v-for="(item, index) in list"
          :key="index"
          class="flex justify-between items-center p-6 border-b border-gray-100"
          @click="handleAction(item)"
        >
          <div class="flex items-center">
            <image :src="item.icon" mode="scaleToFill" class="w-40 h-40 mr-5" /> {{ item.name }}
          </div>
          <span class="ic-baseline-chevron-right text-gray"></span>
        </div>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import { getImage, getExtConfig } from '@/service/util'
import $t from '@/service/i18n'

const extConfig = getExtConfig()
const { currentScenic } = useStore('scenic')

const bg = computed(() => {
  return getImage(currentScenic.value.images)?.split(',')?.[0]
})

const { isLogin, userInfo = {} } = useStore('user')

const list = computed(() => {
  const data = []
  if (['shangyouxian', 'dayan'].includes(UNI_PROJECT)) {
    data.push({
      name: $t('PersonalInformation'),
      icon: '/static/ui/myInfo.png',
      url: 'userInfo/index',
    })
  } else {
    data.push({
      name: $t('PersonalInformation'),
      icon:
        extConfig.project === 'kunshanopera'
          ? '/static/ui/bwg-icon1.png'
          : '/static/ui/myIcon1.png',
      url: 'userInfo/index',
    })
  }
  if (extConfig.project !== 'kunshanopera') {
    data.push({
      name: $t('MyCollection'),
      icon: ['shangyouxian', 'dayan'].includes(UNI_PROJECT)
        ? '/static/ui/myCollection.png'
        : '/static/ui/myIcon2.png',
      url: 'myCollect/index',
    })
  }
  if (
    extConfig.project === 'baoquan' ||
    extConfig.project === 'demo' ||
    extConfig.project === 'liubangguli'
  ) {
    data.push({
      name: $t('Feedback'),
      icon: '/static/ui/myIcon4.png',
      url: `/pagesCustom/pages/feedbackFirst/index`,
    })
  } else if (
    extConfig.project === 'kunshanopera' ||
    ['shangyouxian', 'dayan'].includes(UNI_PROJECT)
  ) {
    data.push({
      name: $t('Feedback'),
      icon: '/static/ui/bwg-icon2.png',
      url:
        extConfig.project === 'kunshanopera'
          ? `/pagesCustom/pages/feedbackFirst/index`
          : '/pagesShangyou/pages/feedbackFirst/index',
    })
  } else {
    data.push({
      name: $t('Feedback'),
      icon: '/static/ui/myIcon4.png',
      url: `feedback/index`,
    })
  }
  if (UNI_PROJECT === 'taohuayuan') {
    data.push({
      name: '入园申请',
      icon: '/static/ui/myIcon3.png',
      url: `/pages/taohuayuan/reserve/index`,
    })
  }
  return data
})

function handleAction(item) {
  if (!isLogin.value) {
    navigateTo({ url: 'login/index' })
  } else {
    navigateTo({ url: item.url })
  }
}
</script>

<style></style>
