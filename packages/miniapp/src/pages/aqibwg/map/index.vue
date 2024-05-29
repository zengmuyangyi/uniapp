<template>
  <div
    class="w-100vw h-100vh flex flex-col relative bg-contain"
    style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
  >
    <view
      class="w-full h-full bg-no-repeat"
      style="
        background-image: url(https://pqntourism.pcleartv.cn/FvYMnGGvFsY5a4-I-ADD1Svpv4tg);
        background-size: 207rpx 106rpx;
        background-position: right bottom;
      "
    >
      <!-- 顶部导航栏 -->
      <n-position pos="top" box-style="width:750rpx;">
        <view class="bg-transparent">
          <n-height height="status"></n-height>
          <n-height height="nav">
            <view class="flex h-full w-full items-center px-3 justify-center">
              <span
                class="ic-baseline-arrow-back-ios absolute left-24 text-#3b220e"
                @click="handleBack"
              ></span>
              <span class="text-32 font-bold leading-46rpx text-center text-#3b220e siyuan_st"
                >场馆地图</span
              >
            </view>
          </n-height>
        </view>
      </n-position>
      <view
        class="px-30rpx w-full h-full bg-no-repeat pt-180rpx box-border"
        style="
          background-image: url(https://pqntourism.pcleartv.cn/FuTKpvREyaWMztaVBWmfgX0Um6P4);
          background-size: 448rpx 693rpx;
        "
      >
        <div class="flex justify-between items-center relative w-full z-20">
          <div
            v-for="(item, index) in floors"
            :key="index"
            :style="{
              backgroundColor: currentFloor.id === item.id ? '#3B220E' : '#fff',
              color: currentFloor.id === item.id ? '#fff' : '#3B220E',
            }"
            class="w-210 h-72 text-center leading-72rpx text-30 font-bold siyuan_st"
            @click="changeFloor(item)"
          >
            {{ getText(item.name) }}
          </div>
        </div>
        <!-- 侧边栏 -->
        <view
          class="fixed w-84 z-9999 flex flex-col justify-between"
          style="bottom: 20%; right: 5%"
        >
          <view
            class="w-full h-90 bg-white flex flex-col justify-center items-center rounded-10rpx text-#3B220E"
            @click="goPage"
          >
            <view class="ic-outline-layers w-40 h-40"></view>
            <view class="text-#3B220E text-22 leading-30rpx">列表</view>
          </view>
          <!-- <view
        class="w-full h-90 bg-white flex flex-col justify-center items-center rounded-10rpx text-green-500"
      >
        <view class="ic-sharp-track-changes w-40 h-40"></view>
        <view class="text-#404040 text-22 leading-30rpx">输编码</view>
      </view>
      <view
        class="w-full h-90 bg-white flex flex-col justify-center items-center rounded-10rpx text-green-500"
      >
        <view class="ic-baseline-qr-code-scanner w-40 h-40"></view>
        <view class="text-#404040 text-22 leading-30rpx">扫码</view>
      </view> -->
        </view>
        <movable-area class="w-full h-full">
          <movable-view
            v-if="showMap && currentFloor"
            :inertia="true"
            :out-of-bounds="true"
            :animation="true"
            :scale="true"
            :scale-min="1"
            :scale-max="3"
            :scale-value="scale"
            direction="all"
            class="w-100% h-100% pb-20 box-border"
          >
            <div class="w-100% h-100% flex flex-col items-center justify-center">
              <div class="relative w-75% zoomIn">
                <img
                  id="img"
                  :key="currentFloor.mapPath"
                  lazy-load
                  :src="currentFloor.mapPath"
                  class="w-full block"
                  mode="widthFix"
                  @click="handleClick"
                  @load="handleLoad"
                />

                <div>
                  <div
                    v-for="(item, index) in markers"
                    :key="index"
                    :class="{ active: item.show }"
                    class="item-ani absolute w-100rpx h-130rpx bg-no-repeat bg-cover ring-2rpx ring-#6d1c1b"
                    :style="getItemStyle(item, index)"
                    @click="showMarkersInfo(item)"
                  >
                    <span
                      class="border border-10rpx w-0 h-0 border-t-#6d1c1b border-transparent text-0 absolute -bottom-20rpx left-50% -translate-x-50%"
                    ></span>
                  </div>
                </div>
              </div>
              <!-- <div class="text-center mt-10rpx">历史文化陈列展览</div> -->
            </div>
          </movable-view>
        </movable-area>
        <!-- <view class="font-bold w-full text-center fixed text-40" style="bottom: 15%"
      >历史文化陈列展厅</view
    > -->
      </view>
    </view>
  </div>
</template>

<script setup>
import { getText } from '@/service/util'
import api from '@/api/map'
const coverUrl = 'https://pqntourism.pcleartv.cn/FkfnH0kyh9m32QNf7Xf5MBh3eLiP'

const floors = ref([])
const currentFloor = ref()
const markers = ref([])
const markersMap = ref({})

getFloors()

function getFloors() {
  api.getIndoorMap().then((res) => {
    console.log('@@@', res)
    floors.value = res.list
    currentFloor.value = res.list[0]
  })
}

function getPOI() {
  if (markersMap.value[currentFloor.value.id]) {
    markers.value = markersMap.value[currentFloor.value.id]
    return
  }

  return api.getIndoorPOIList(currentFloor.value.id).then((res) => {
    console.log('$$$', res)
    markers.value = res.list.map((i) => {
      return {
        ...i,
        left: i.lat,
        top: i.lng,
      }
    })

    // 新增标注缓存
    markersMap.value[currentFloor.value.id] = markers.value
  })
}

const scale = ref(1)

const wrapEl = ref({})
function handleClick(e) {
  const { x, y } = e.detail
  const { left, top } = wrapEl.value

  const { width, height } = wrapEl.value

  const elX = (x - left) / width
  const elY = (y - top) / height

  const position = {
    x: elX * 100,
    y: elY * 100,
  }

  return position
}

function getEl(id) {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery()
    query.select(id).boundingClientRect(function (res) {
      resolve(res)
    })
    query.exec()
  })
}

function handleLoad() {
  getEl('#img').then(async (res) => {
    wrapEl.value = res
    await getPOI()
    console.log('markers', markers.value)
    markers.value.forEach((item, index) => {
      setTimeout(() => {
        item.show = true
      }, 200 + 200 * index)
    })
  })
}

const showMap = ref(true)
async function changeFloor(item) {
  currentFloor.value = item

  scale.value = 1

  await getPOI()

  markers.value.forEach((item) => {
    item.show = false
  })

  showMap.value = false
  setTimeout(() => {
    showMap.value = true
  }, 50)
}

function getItemStyle(item) {
  const style = {
    top: item.top + '%',
    left: item.left + '%',
    backgroundImage: `url(${getText(item.cover) || coverUrl})`,
  }
  return style
}
const showMarkersInfo = (data) => {
  console.log('@@@', data)
  uni.navigateTo({ url: `/pages/aqibwg/pavilion/index?id=${data.id}` })
}
const goPage = () => {
  uni.switchTab({
    url: '/pages/aqibwg/culturalRelicList/index',
  })
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.item-ani {
  // animation: item-ani 0.5s ease-in-out;
  // animation-fill-mode: forwards;
  transform: scale(0) translate(-50%, -100%);
  transition-property: transform;
  transition-duration: 0.5s;
  transform-origin: 0 0;
  &.active {
    transform: scale(1) translate(-50%, -100%);
  }
}

@keyframes item-ani {
  0% {
    transform: scale(0) translate(-50%, -100%);
  }
  100% {
    transform: scale(1) translate(-50%, -100%);
  }
}

.zoomIn {
  animation: zoomIn 0.5s ease-in-out;
  animation-fill-mode: forwards;
  transform: scale(0);
  transition-property: transform;
  transition-duration: 0.5s;
  transform-origin: 0 0;
  &.active {
    transform: scale(1);
  }
}

@keyframes zoomIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
