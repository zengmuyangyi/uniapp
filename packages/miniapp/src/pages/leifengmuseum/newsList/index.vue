<template>
  <view
    class="h-full"
    style="
      background-image: url('https://pqntourism.pcleartv.cn/Ftf4GJtlrrPVMfaKwKT7R8GtsVSB');
      background-size: 100%;
    "
  >
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span class="text-38 leading-42rpx font-500">资讯发布</span>
          </view>
        </n-height>
      </view>
      <view class="mt-30rpx px-40rpx w-full box-border h-66" :class="mode ? 'h-88' : 'h-66'">
        <view class="w-full h-full rounded-full flex overflow-x-auto bg-#e5e5e5">
          <view
            v-for="(item, index) in typeList"
            :key="index"
            class="h-full rounded-full flex justify-center items-center flex-shrink-0"
            style="width: calc(100% / 3)"
            :style="{ backgroundColor: currentType === index ? '#8B0500' : 'transparent' }"
            @click="handleChange(index)"
          >
            <view
              class="font-500"
              :class="mode ? 'text-40 leading-60rpx' : 'text-34 leading-42rpx'"
              :style="{ color: currentType === index ? '#fff' : '#000' }"
              >{{ getText(item.name) }}</view
            >
          </view>
        </view>
      </view>
    </n-position>
    <view class="w-full px-40rpx box-border" :class="mode ? 'pt-300rpx' : 'pt-280rpx'">
      <view
        class="w-full rounded-18rpx bg-white"
        style="box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.04)"
      >
        <n-list
          ref="list"
          bg-type="none"
          height="window-!280rpx"
          :auto-update="true"
          @down="getNewsList"
          @up="getNewsList"
        >
          <n-list-cell v-for="(item, index) in data" :key="index">
            <view
              class="w-full px-28rpx py-24rpx box-border flex flex-col justify-between"
              :class="mode ? 'h-260' : 'h-180'"
              @click="handleClick(item)"
            >
              <view
                class="font-500 w-full text-#3b2f2f u-line-2"
                :class="mode ? 'text-40 leading-60rpx' : 'text-34 leading-42rpx'"
                >{{ getText(item.title) }}</view
              >
              <view
                class="font-500 text-#7e7e7e"
                :class="mode ? 'text-32 leading-45rpx' : 'text-26 leading-27rpx'"
                >{{ item.author || '雷锋纪念馆' }} |
                {{ dayjs(item.createTime).format('YYYY-MM-DD') }}</view
              >
            </view>
          </n-list-cell>
        </n-list>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
import { fetchNewsList, fetchNewsTypeNew } from '@/api/news'
import dayjs from 'dayjs'
const { mode } = useStore('user')
const { getMenu } = useStore('scenic')
const currentType = ref(0)
const typeList = ref([])
const newsName = ref('')
const getNewsTypeList = async () => {
  const menuObj = await getMenu('news')
  const params = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
    menuId: menuObj.id,
  }
  const res = await fetchNewsTypeNew(params)
  console.log('&&&', res.list)
  typeList.value = res.list
}
const data = ref([])
const isLoaded = ref(false)
const list = ref()
const getNewsList = async (cp) => {
  const menuObj = await getMenu('news')
  const ins = list.value
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
    typeId: typeList.value[currentType.value]?.id,
    menuId: menuObj.id,
    title: newsName.value,
  }
  fetchNewsList(params).then((res) => {
    if (cp === 1) {
      data.value = res.list
    } else {
      data.value = data.value.concat(res.list)
    }
    ins.nEndSuccess(!!res.nextPage)
    isLoaded.value = true
  })
}
const handleChange = (index) => {
  currentType.value = index
  getNewsList(1)
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
const handleClick = (item) => {
  if (item.url) {
    navigateTo({
      url: `webLink/index?url=${item.url}&title=${getText(item.title)}`,
    })
  } else {
    navigateTo({
      url: `news/index?id=${item.id}`,
    })
  }
}
onLoad(async (options) => {
  if (options.name) {
    newsName.value = options.name
  }
  if (options.currentType) {
    currentType.value = Number(options.currentType)
  }
  await getNewsTypeList()
  getNewsList(1)
})
</script>

<style lang="scss" scoped></style>
