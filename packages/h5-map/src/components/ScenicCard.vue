<template>
  <div
    class="z-1001 fixed bottom-10 left-0 bg-white left-20px right-20px rounded-10px p-10px transition duration-500"
  >
    <div class="pb-10px text-16px font-bold text-gray-600 flex justify-between" @click="goDetail">
      {{ getText(data.name) }}

      <div class="i-ic-baseline-arrow-forward-ios"></div>
    </div>

    <div class="flex">
      <div
        class="w-100 h-110 bg-cover rounded-10px mr-10px"
        :style="{
          backgroundImage: `url(${getImage(data.cover) || getImage(data.images).split(',')?.[0]})`,
        }"
      ></div>

      <div class="flex flex-1 flex-col justify-between content-between">
        <div class="text-14 text-gray-500 u-line-3 h-60">
          <!-- {{ data.summary.length > 52 ? data.summary.slice(0, 51) + '...' : data.summary }} -->
          {{ getText(data.description) }}
        </div>
        <div class="flex justify-end">
          <div
            v-if="route.query.project === 'huanghelou' && data.parentId && data.childList?.length"
            class="flex items-center text-orange-400 bg-gray-100 border border-gray-200 p-3 px-10 rounded-2 text-12"
            @click="showIndoor"
          >
            <div class="i-ic-baseline-terrain"></div>
            {{ $t('indoorScenic') }}
          </div>
          <div
            v-if="route.query.project !== 'huanghelou'"
            @click="goLocation"
            class="flex items-center text-orange-400 bg-gray-100 border border-gray-200 p-3 px-10 rounded-2 text-12"
          >
            <div class="i-ic-outline-navigation"></div>
            {{ $t('travelTo') }}
          </div>

          <div
            class="flex items-center text-white bg-orange-400 border border-orange-200 p-3 px-10 rounded-2 text-12 ml-2"
            @click="listenExplaination"
            v-if="data.scenic && getText(data.voiceIntroduction)"
          >
            <div class="i-ic-sharp-headset-mic"></div>
            {{ $t('listenToExplain') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { navigateTo } from '@/utils/index'
/* eslint-disable no-undef */
import { getText, getImage } from '@/utils'
import { useRoute } from 'vue-router'
import { inject } from 'vue'
import $t from '@/utils/i18n'
const route = useRoute()
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  myLng: {
    type: Number,
    default: () => 0,
  },
  myLat: {
    type: Number,
    default: () => 0,
  },
})
const show = inject('isShow')
const handleShow = inject('handleShow')
const toggleIntroduction = inject('toggleIntroduction')
const showIndoor = inject('showIndoor')
function listenExplaination() {
  show.value = true
  handleShow(show)
}

const goDetail = () => {
  console.log('*****', route.query.project)
  if (route.query.project === 'zhumadian') {
    navigateTo({ url: `/pages/scenic/index?id=${props.data.id}` })
  } else {
    if (route.query.type === 'only') {
      toggleIntroduction(props.data)
    } else {
      uni.navigateTo({ url: `/pages/common/scenic/index?id=${props.data.id}` })
    }
  }
}

const goLocation = () => {
  const { lat: latitude, lng: longitude } = props.data
  if (route.query.project === 'zhumadian') {
    location.href = `https://uri.amap.com/navigation?from=${props.myLng + ',' + props.myLat},${$t(
      'MyPlace'
    )}&to=${longitude + ',' + latitude},${getText(props.data.name)}&callnative=1`
  } else {
    if (route.query.type === 'only') {
      location.href = `https://uri.amap.com/navigation?from=${props.myLng + ',' + props.myLat},${$t(
        'MyPlace'
      )}&to=${longitude + ',' + latitude},${getText(props.data.name)}&callnative=1`
    } else {
      uni.navigateTo({
        url: `/pages/common/location/index?latitude=${latitude}&longitude=${longitude}&name=${getText(
          props.data.name
        )}`,
      })
    }
  }

  // eslint-disable-next-line no-undef
  wx.miniProgram.openLocation({
    latitude,
    longitude,
    scale: 18,
  })
}
</script>

<style lang=""></style>
