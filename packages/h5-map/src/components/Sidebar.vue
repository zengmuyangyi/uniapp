<template>
  <div
    class="flex flex-col place-content-between absolute right-10 top-50% z-1001 bg-white p-10 rounded-5 bg-light-50 -translate-y-1/2 z-2000"
    :class="route.query.project === 'nalati' ? 'top-70%' : ''"
  >
    <div class="flex flex-col text-12 justify-center items-center" @click="introductionPage">
      <img src="@/assets/Introduction.png" class="w-25 h-25" />
      <span class="mt-5 text-#b1b1b1">{{ $t('introduction') }}</span>
    </div>
    <div
      v-if="route.query.project === 'nalati'"
      class="flex flex-col text-12 justify-center items-center mt-10"
      @click="toggleSwitch"
    >
      <img src="@/assets/switch.png" class="w-25 h-25" />
      <span class="mt-5 text-gray-600">{{ $t('switchMap') }}</span>
    </div>
    <!-- <div class="flex flex-col text-12 justify-center items-center relative" @click="changeLanguage">
      <img src="@/assets/language.png" />
      <span class="mt-5 text-gray-600">{{ getText(language) }}</span>
      <ul
        class="absolute bg-blue-400 right-40 flex flex-col justify-center rounded-3xl py-5 w-50 justify-items-center"
        v-if="false"
      >
        <li class="mt-5 text-white w-full text-center border-dashed m-0" id="language">国语</li>
        <li class="mt-5 text-white w-full text-center m-0">English</li>
      </ul>
    </div> -->
    <div
      v-else-if="'leifengmuseum'"
      class="flex flex-col text-12 justify-center items-center mt-10"
      @click="getRoute"
    >
      <img src="@/assets/new_route.png" class="w-25 h-25" />
      <span class="mt-5 text-#b1b1b1">{{ $t('itinerary') }}</span>
    </div>
    <div v-else class="flex flex-col text-12 justify-center items-center mt-10" @click="getRoute">
      <img src="@/assets/route.png" class="w-25 h-25" />
      <span class="mt-5 text-#b1b1b1">{{ $t('itinerary') }}</span>
    </div>
    <!-- <div class="flex flex-col text-12 justify-center items-center">
      <img src="@/assets/Interpretation.png" />
      <span class="mt-5 text-gray-600">{{ getText(interpretation) }}</span>
    </div> -->
  </div>
</template>

<script setup>
import { navigateTo } from '@/utils/index'
import { useRoute } from 'vue-router'
import { getText } from '@/utils'
import $t from '@/utils/i18n'
const props = defineProps({
  scenicSpot: {
    type: Object,
    default: () => ({}),
  },
})
const route = useRoute()
const togglePath = inject('togglePath')
const toggleIntroduction = inject('toggleIntroduction')
const showMap = inject('showMap')
function getRoute() {
  togglePath()
}
function introductionPage() {
  if (route.query.project === 'zhumadian') {
    navigateTo({ url: '/pages/scenic/index' })
  } else {
    if (route.query.type === 'only') {
      toggleIntroduction(props.scenicSpot)
    } else {
      uni.navigateTo({ url: '/pages/common/scenic/index' })
    }
  }
}
const toggleSwitch = () => {
  showMap()
}
</script>

<style>
#language {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
