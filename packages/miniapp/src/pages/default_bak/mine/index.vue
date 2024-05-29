<template>
  <n-list bg-type="inverse" :down="null" :up="null" height="window" class="text-28">
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
              userInfo.avatarUrl ||
              'https://pqntourism.pcleartv.cn/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F.png'
            "
            mode="aspectFill"
            class="w-150 h-150 rounded-full"
          />

          <span v-if="userInfo.nickName || isLogined" class="text-white text-30 ml-3">
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
</template>

<script setup>
import { isLogin, getUserInfo } from '@/api/user'
import { getImage } from '@/service/util'
import $t from '@/service/i18n'

const { currentScenic } = useStore('scenic')

const bg = computed(() => {
  return getImage(currentScenic.value.images)?.split(',')?.[0]
})

const isLogined = ref(false)

const userInfo = ref({})
function checkLogin() {
  return isLogin().then((res) => {
    console.log('%c [ res ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', res)

    isLogined.value = res
  })
}

const list = computed(() => {
  const data = [
    {
      name: $t('PersonalInformation'),
      icon: '/static/ui/myIcon1.png',
      url: 'userInfo/index',
    },
    // {
    //   name: $t('MyCollection'),
    //   icon: '/static/ui/myIcon2.png',
    //   url: '/pages/scenicList/index',
    // },
    // {
    //   name: $t('BrowsingHistory'),
    //   icon: '/static/ui/myIcon3.png',
    //   url: '/pages/weather/index',
    // },
    {
      name: $t('Feedback'),
      icon: '/static/ui/myIcon4.png',
      url: `feedback/index`,
    },
  ]
  return data
})

function handleAction(item) {
  if (!isLogined.value) {
    navigateTo({ url: 'login/index' })
  } else {
    navigateTo({ url: item.url })
  }
}

// checkLogin()
onShow(async () => {
  await checkLogin()

  if (isLogined.value) {
    getUserInfo().then((res) => {
      console.log('%c [ res ]-25', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      userInfo.value = res
    })
  }
})
</script>

<style></style>
