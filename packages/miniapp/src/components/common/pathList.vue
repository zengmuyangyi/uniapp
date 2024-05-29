<template>
  <view
    id="homeList1"
    class="px-30rpx pt-40rpx"
    style="background-size: 100% 100%"
    :style="{ backgroundImage: `url(${projectStyle[props.componentStyle]?.listBg || ''})` }"
  >
    <view
      v-for="(item, index) in list"
      :key="index"
      class="flex h-210 mb-50rpx box-shadow rounded-20rpx overflow-hidden bg-white"
      :class="props.componentStyle || ''"
      @click="goMap(index)"
    >
      <image
        :src="getImage(item.templateMapRoute.coverImage)"
        mode="aspectFill"
        class="w-240 h-210 mr-35rpx"
        :class="props.componentStyle + '-cover'"
      />

      <view class="flex-1 flex flex-col justify-between content-between relative">
        <view :class="projectStyle[props.componentStyle]?.itemInfo || 'pt-48rpx pr-20rpx'">
          <view class="w-full overflow-hidden whitespace-nowrap text-ellipsis font-bold text-30">
            {{ getText(item.templateMapRoute.name) }}
          </view>

          <view class="flex flex-wrap mt-1">
            <tagGroup :model-value="getTags(item.poi)"></tagGroup>
          </view>
        </view>

        <div
          class="flex items-center text-gray-300 pb-20rpx"
          :class="props.componentStyle + '-route'"
        >
          <span class="flex items-center text-24 mr-3">
            <image src="/static/ui/time.png" mode="scaleToFill" class="w-28 h-28" />
            {{ item.templateMapRoute.length }}m
          </span>
          <span class="flex items-center text-24">
            <image src="/static/ui/location.png" mode="scaleToFill" class="w-28 h-28" />
            {{ item.templateMapRoute.duration }}min
          </span>
        </div>

        <div
          class="absolute h-48 text-white text-26 flex justify-center items-center px-20rpx right-0 rounded-bl-20rpx"
          :class="projectStyle[props.componentStyle]?.tagClass || 'green-bg'"
        >
          <view :class="projectStyle[props.componentStyle]?.tagFont || ''"
            >{{ item.poi.length }}{{ $t('spots') }}</view
          >
        </div>
      </view>
    </view>
    <blank v-if="!list.length && isLoaded"></blank>
  </view>
</template>

<script setup>
import { fetchMapPath } from '@/api/map'
import { getCurrentInstance } from 'vue'
import { getText, getImage, navigateTo } from '@/service/util'
import { parseObject } from '@/service/util'
import $t from '@/service/i18n'

const list = ref([])
const isLoaded = ref(false)
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => '',
  },
})
const { proxy } = getCurrentInstance()
const listHeight = inject('heightList')
const tabsCode = inject('tabsCode')

function getTags(data) {
  const list = data.filter(Boolean)

  if (!list.length) return []

  if (list.length === 1) {
    return [getText(list[0].name)]
  }

  const first = list[0]
  const end = list[data.length - 1]

  return [first, end].map((i) => getText(i?.name))
}

onMounted(async () => {
  const { list: listData } = await fetchMapPath()
  console.log('%c [ listData ]-55', 'font-size:13px; background:pink; color:#bf2c9f;', listData)

  listData.forEach((point) => {
    point.poi &&
      point.poi.forEach((item) => {
        parseObject(item)
      })
    point.poi = point.poi || []
    parseObject(point.templateMapRoute)
  })

  console.log('%c [ 路径列表 ]-46', 'font-size:13px; background:pink; color:#bf2c9f;', listData)
  list.value = listData
  isLoaded.value = true

  // 获取列表高度
  nextTick(() => {
    const query = uni.createSelectorQuery().in(proxy)
    query
      .select('#homeList1')
      .boundingClientRect((data) => {
        console.log('%c [ data ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        tabsCode.value.forEach((item, index) => {
          if (item === 'pathList') {
            listHeight.value[index] = data.height
          }
        })
      })
      .exec()
  })
})

const { mapData } = useStore('app')

const goMap = (index) => {
  mapData.value = {
    type: 'path',
    value: index,
  }

  navigateTo({ url: 'map/index' })
}
// ------------项目对应样式-------------
const projectStyle = {
  guyun: {
    tagClass: 'tag-bg',
  },
  qingxin: {
    tagClass: 'green-bg',
  },
  contracted: {
    tagClass: 'red-bg',
  },
  dianya: {
    listBg: 'https://pqntourism.pcleartv.cn/Fkk66tl40zAnNVgNu3WMaC2w7fgm',
    itemInfo: 'pt-0',
    tagClass: 'dianya-tag',
    tagFont: 'w-30 text-center',
  },
}
</script>

<style lang="scss" scoped>
.guyun {
  border: 2rpx solid #d4b772;
}
.qingxin {
  border: 2rpx solid #71d167;
}
.dianya {
  border-radius: 0;
  background-image: url('@/static/index/dianya/item-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 30rpx;
  box-sizing: border-box;
  background-color: transparent;
  &-cover {
    width: 150rpx;
    height: 150rpx;
  }
  &-route {
    margin-top: 10rpx;
  }
  &-tag {
    width: 90rpx;
    height: 200rpx;
    background-image: url('@/static/index/dianya/tag-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    padding: 0;
    top: -30rpx;
    font-size: 30rpx;
    font-family: '宋体';
  }
}
</style>
