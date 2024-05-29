<template>
  <view :class="props.componentStyle">
    <n-tabs-h
      space="5rpx"
      :value="current"
      :is-tap="true"
      :hover-top="false"
      :items="tabs"
      :delay="50"
      :bg-type="projectStyle[props.componentStyle]?.bgType || ''"
      :text-size="projectStyle[props.componentStyle]?.textSize || ''"
      :text-type="projectStyle[props.componentStyle]?.textType || ''"
      :text-style="projectStyle[props.componentStyle]?.textStyle || ''"
      :active-text-size="projectStyle[props.componentStyle]?.activeTextSize || ''"
      :active-text-type="projectStyle[props.componentStyle]?.activeTextType || 'text'"
      :active-text-style="projectStyle[props.componentStyle]?.activeTextStyle || ''"
      :left="projectStyle[props.componentStyle]?.left || '14rpx'"
      :right="projectStyle[props.componentStyle]?.right || '14rpx'"
      :justify="projectStyle[props.componentStyle]?.justify || 'center'"
      :width="projectStyle[props.componentStyle]?.width || '245rpx'"
      :height="projectStyle[props.componentStyle]?.height || '120rpx'"
      :indicator-type="projectStyle[props.componentStyle]?.indicatorType || 'success'"
      :indicator-width="projectStyle[props.componentStyle]?.indicatorWidth || '60rpx'"
      :indicator-height="projectStyle[props.componentStyle]?.indicatorHeight || '10rpx'"
      :indicator-style="projectStyle[props.componentStyle]?.indicatorStyle || 'bottom:10rpx'"
      @change="toChangeTab"
    ></n-tabs-h>

    <swiper
      :style="{ height: `${height || 0}px` }"
      :current="current"
      style="width: 100%; flex: 1"
      @change="toSwiperChange"
    >
      <swiper-item v-for="(tab, index) in tabData?.children" :key="index">
        <pathList v-if="tab.code === 'pathList'" :component-style="props.componentStyle"></pathList>
        <recommendList
          v-else-if="tab.code === 'recommendList'"
          :component-style="props.componentStyle"
        ></recommendList>
        <hotList
          v-else-if="tab.code === 'hotList'"
          :component-style="props.componentStyle"
        ></hotList>
        <dongtaiList
          v-else-if="tab.code === 'dongtaiList'"
          :component-style="props.componentStyle"
        ></dongtaiList>
        <gonglueList
          v-else-if="tab.code === 'gonglue'"
          :component-style="props.componentStyle"
        ></gonglueList>
      </swiper-item>
    </swiper>
    <div class="h-100"></div>
  </view>
</template>

<script setup>
import pathList from '@/components/common/pathList.vue'
import recommendList from '@/components/common/recommendList.vue'
import hotList from '@/components/common/hotList.vue'
import dongtaiList from '@/components/common/dongtaiList.vue'
import gonglueList from '@/components/common/gonglueList.vue'
import { getText } from '@/service/util'
import { computed, provide } from 'vue'

const current = ref(0)
const { programTree } = useStore('scenic')
const tabData = computed(() => {
  let data
  if (programTree.value.length) {
    data = programTree.value[0].children.find((i) => i.code === 'homeTabList')
  }
  // console.log('###', data)
  return data
})
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => 'default',
  },
})
const projectStyle = {
  guyun: {
    textSize: 'xl',
    textType: 'tab',
    textStyle: "font-family: 'slideyouran'",
    activeTextSize: 'xl',
    activeTextType: 'active-tab',
    indicatorType: 'active-tab',
    indicatorWidth: '40rpx',
    indicatorHeight: '3rpx',
  },
  qingxin: {
    textSize: 'll',
    textType: 'tab',
    activeTextSize: 'll',
    activeTextType: 'nav-title',
    activeTextStyle: 'font-weight: bold',
    indicatorType: 'gradient-green',
    indicatorWidth: '55rpx',
    indicatorHeight: '4rpx',
  },
  contracted: {
    textSize: 'll',
    textType: 'tab',
    activeTextSize: 'll',
    activeTextType: 'nav-title',
    activeTextStyle: 'font-weight: bold',
    indicatorType: 'jianyue',
    indicatorWidth: '55rpx',
    indicatorHeight: '4rpx',
  },
  dianya: {
    textSize: 'dianya',
    activeTextSize: 'dianya',
    textStyle: "font-family: '宋体';",
    activeTextStyle: 'font-weight: 900',
    indicatorType: 'dianya',
    indicatorWidth: '138rpx',
    indicatorHeight: '20rpx',
    indicatorStyle: 'bottom: 37rpx',
  },
}
const tabs = computed(() => {
  return tabData.value?.children.map((i) => getText(JSON.parse(i.name)))
})
const tabsCode = computed(() => {
  return tabData.value?.children.map((i) => i.code)
})
function toChangeTab(i) {
  current.value = i
}

function toSwiperChange(e) {
  current.value = e.detail.current
}

const heightList = ref([0, 0, 0])
provide('heightList', heightList)
provide('tabsCode', tabsCode)

const height = computed(() => {
  return heightList.value[current.value]
})
</script>

<style lang="scss"></style>
