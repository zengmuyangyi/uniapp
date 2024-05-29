<template>
  <div class="w-full z-99999" :class="projectStyle[props.componentStyle]?.top">
    <div :class="props.componentStyle" class="w-full box-border">
      <view :class="props.componentStyle + '-inner'" class="w-full">
        <span
          v-if="props.componentStyle === 'guyun'"
          class="text-42rpx flex-shrink-0 mr-50rpx title font-style"
          >{{ $t('Announcement') }}</span
        >
        <span v-else-if="props.componentStyle === 'qingxin'"></span>
        <view
          v-else-if="props.componentStyle === 'dianya'"
          class="w-40 h-30 mr-17rpx flex-shrink-0"
        >
          <image
            src="https://pqntourism.pcleartv.cn/Fp5qVpoXafIhhiNY3bbvMympaw3n"
            mode="scaleToFill"
            class="w-full h-full"
          />
        </view>
        <view v-else-if="props.componentStyle === 'contracted'" class="w-30 h-30 bg-cover">
          <image src="/static/ui/announce.png" mode="scaleToFill" class="w-full h-full" />
        </view>
        <span v-else class="mr-2 text-size-30">{{ $t('Announcement') }}:</span>

        <swiper
          :circular="true"
          :vertical="true"
          :autoplay="true"
          :disable-touch="true"
          class="n-flex-1 w-full"
          :style="
            projectStyle[props.componentStyle]?.swiperStyle || 'height: 34px; margin-left: 16rpx'
          "
        >
          <swiper-item v-for="(item, idx) in hints" :key="idx" class="n-flex-row n-align-center">
            <view
              class="w-full truncate box-border px-2"
              :class="projectStyle[props.componentStyle]?.contentStyle || 'text-30'"
              :style="{ fontFamily: `${props.componentStyle === 'dianya' ? '宋体' : ''}` }"
              @click="showDetail(item)"
            >
              {{ getText(item.title) }}
            </view>
          </swiper-item>
        </swiper>
        <view
          v-if="props.componentStyle === 'contracted'"
          class="ic-baseline-keyboard-arrow-right w-40 h-40 text-gray-400"
        ></view>
      </view>

      <n-popup :show="show" pos="center" width="750rpx" height="660rpx" class="z-index:999">
        <view class="bg-white rounded-3 m-3 p-3">
          <div class="text-center text-40 p-2 text-black">{{ $t('Notice') }}</div>
          <scroll-view class="h-600" scroll-y>
            <div v-for="(item, index) in hints" :key="index">
              <div class="font-bold text-30 mb-3 text-gray-800 text-center">
                {{ getText(item.title) }}
              </div>

              <mp-html :content="getText(item.content)"></mp-html>
            </div>
          </scroll-view>
          <view class="text-center">
            <n-button
              class="green-bg block rounded-30rpx"
              :text="$t('Ok')"
              text-type="inverse"
              border="none"
              radius="ll"
              @buttonClicked="show = false"
            ></n-button>
          </view>
        </view>
      </n-popup>
    </div>
  </div>
</template>

<script setup>
import { fetchAnnouncement } from '@/api/scenic'
import $t from '@/service/i18n'
import { getText, getExtConfig } from '@/service/util'
const project = getExtConfig()
const { programTree } = useStore('scenic')
const rollingData = computed(() => {
  let data
  if (programTree.value.length) {
    data = programTree.value[0].children.find((i) => i.name.en === 'Announcement')
  }
  return data
})
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => 'default',
  },
})
const hints = ref([])

async function getAnnouncement() {
  const res = await fetchAnnouncement()
  // console.log('&&&&', res.list)
  hints.value = res.list
}

getAnnouncement()

const show = ref(false)
const showDetail = (item) => {
  if (project.project === 'baoquan') {
    uni.navigateTo({
      url: `/pages/baoquan/notice/index?id=${item.id}`,
    })
  } else {
    show.value = true
  }
}
// ------------项目对应样式-------------
const projectStyle = {
  guyun: {
    top: 'top-338 absolute',
    swiperStyle: 'height: 34px',
    fontSize: '24',
    contentStyle: 'title text-24',
  },
  qingxin: {
    top: 'top-390 absolute',
    swiperStyle: 'height: 34px',
    contentStyle: 'title text-24',
  },
  contracted: {
    top: 'relative',
    contentStyle: 'text-26 font-bold',
  },
  dianya: {
    top: 'relative',
    contentStyle: 'text-28 text-white font-900',
    swiperStyle: 'margin: 0 auto; height: 34rpx',
  },
  default: {
    top: 'fixed bottom-0',
    swiperStyle: 'height: 34px; margin-left: 16rpx',
  },
}
</script>

<style scoped lang="scss">
.guyun {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 147rpx;
  background-size: contain;
  background-image: url('https://pqntourism.pcleartv.cn/Fq3OU35Mi3dpdFtGNa7zJ45MWqsh');

  &-inner {
    height: 82rpx;
    display: flex;
    padding-right: 78rpx;
    padding-left: 60rpx;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
  }
}

.qingxin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96rpx;
  padding: 0 15rpx;
  overflow: hidden;
  background-image: url('https://pqntourism.pcleartv.cn/FvD-DvXuEEwGiblowL8HLRlvXZaL');
  background-size: cover;
  background-repeat: no-repeat;

  &-inner {
    height: 82rpx;
    display: flex;
    padding-right: 50rpx;
    padding-left: 242rpx;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
  }
}

.default {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30rpx;
  background-color: rgba($color: #000000, $alpha: 0.8);
  color: white;

  &-inner {
    display: flex;
    align-items: center;
  }
}

.contracted {
  display: flex;
  background-color: white;
  padding: 0 30rpx;
  border-top: 1px solid #f8f5f8;

  &-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx 0;
  }
}

.dianya {
  height: 92rpx;
  padding: 0 30rpx;
  &-inner {
    padding: 0 25rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('@/static/index/dianya/rolling-bg.png');
    background-size: 100% 100%;
  }
}
</style>
