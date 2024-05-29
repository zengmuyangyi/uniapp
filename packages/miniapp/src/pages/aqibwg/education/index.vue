<template>
  <view
    class="w-full h-full bg-white bg-contain"
    style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
  >
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="text-32 font-bold leading-46rpx text-center text-#3b220e siyuan_st"
              >教育研学</span
            >
          </view>
        </n-height>
      </view>
    </n-position>
    <view
      class="w-full h-full bg-no-repeat pt-180rpx px-30rpx box-border"
      style="
        background-image: url(https://pqntourism.pcleartv.cn/FuTKpvREyaWMztaVBWmfgX0Um6P4);
        background-size: 448rpx 693rpx;
      "
    >
      <view class="text-32 leading-46rpx font-bold text-#3b220e siyuan_st">研学视频</view>
      <view class="w-full mt-30rpx">
        <n-list
          ref="list"
          bg-type="none"
          height="window-!450rpx"
          :auto-update="true"
          @down="getVideoList"
          @up="getVideoList"
        >
          <n-list-cell v-for="(item, index) in data" :key="index">
            <view
              class="w-full h-500 rounded-16rpx overflow-hidden bg-#BFAB93"
              @click="handleClick(item)"
            >
              <view
                class="w-full h-366 bg-cover bg-center"
                :style="{ backgroundImage: `url(${getText(item.coverImage)})` }"
              ></view>
              <view
                class="mt-23rpx w-full px-30rpx box-border truncate text-30 leading-42rpx font-400 tracking-1rpx text-#3b220e"
                >{{ getText(item.name) }}</view
              >
              <view
                class="mt-14rpx w-full px-30rpx box-border text-24 leading-33rpx tracking-1rpx font-400 text-#3b220e"
                >{{ typeFormat(typeList, item.typeId, true) }}</view
              >
            </view>
          </n-list-cell>
        </n-list>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchVideoList, fetchVideoType } from '@/api/video'
import { getText, typeFormat } from '@/service/util'
const { getMenu } = useStore('scenic')
const data = ref([])
const typeList = ref([])
const list = ref()
const getVideoList = async (cp) => {
  const menuObj = await getMenu('video')
  const ins = list.value
  const params = {
    pageNum: cp,
    pageSize: 10,
    status: 1,
    menuId: menuObj.id,
  }
  const res = await fetchVideoList(params)
  console.log('&&&&', res)
  if (cp === 1) {
    data.value = res.list
  } else {
    data.value = data.value.concat(res.list)
  }
  ins.nEndSuccess(!!res.nextPage)
}
const getVideoType = async () => {
  const menuObj = await getMenu('video')
  const params = {
    pageNum: 0,
    pageSize: 0,
    status: 1,
    menuId: menuObj.id,
  }
  const res = await fetchVideoType(params)
  typeList.value = res.list
  console.log('@@@', res)
}
getVideoType()

const handleClick = (item) => {
  uni.navigateTo({
    url: `/pages/common/video/videoDetail?id=${item.id}&title=${getText(data.name)}`,
  })
}

onShow(() => {
  const curPages = getCurrentPages()[0] // 获取当前页面实例
  if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
    curPages.getTabBar().setData({
      selected: 1, // 表示当前菜单的索引，该值在不同的页面表示不同
    })
  }
})
</script>

<style lang="scss" scoped></style>
