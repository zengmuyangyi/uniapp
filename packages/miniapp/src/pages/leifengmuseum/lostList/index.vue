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
            <span class="text-38 leading-42rpx font-500">进度查询</span>
          </view>
        </n-height>
      </view>
    </n-position>
    <view class="w-full pt-180rpx box-border">
      <n-list
        ref="list"
        bg-type="none"
        height="window-!180rpx"
        :auto-update="true"
        @down="getLostList"
        @up="getLostList"
      >
        <n-list-cell v-for="(item, index) in data" :key="index">
          <view class="w-full px-40rpx" :class="index ? 'mt-40rpx' : ''" @click="handleClick(item)">
            <view class="bg-white w-full relative">
              <view
                class="absolute top-50 right-10 text-50 font-500 rotate-z-45"
                :style="{ color: getStatusObj(item.status).color }"
                >{{ getStatusObj(item.status).title }}</view
              >
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/FksgbdiQlEpwy2-I5tnm3FKZnCnB"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >景区热线：{{ currentScenic.phone }}</view
                >
              </view>
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/Frl-UFw6iK-TdcjbEkT4mSLAgoVj"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >联系人：{{ item.personName }}</view
                >
              </view>
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/FsLKMBG4dtt0HrEUcZ2k_Wj88IJv"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >物品类型：{{ item.goodsName }}</view
                >
              </view>
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/Fpy2Axixhqd3rGC0shVr0wxwcOJz"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >遗失时间：{{ dayjs(item.lostTime).format('YYYY.MM.DD HH:mm:ss') }}</view
                >
              </view>
              <view class="w-full flex px-27rpx box-border py-15rpx">
                <image
                  src="https://pqntourism.pcleartv.cn/FmVdN28FbNA1JFkI3VB36xIP59sW"
                  mode="scaleToFill"
                  class="flex-shrink-0"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >详细描述：{{ item.describe }}</view
                >
              </view>
              <view
                v-if="item.detail"
                class="w-full flex flex-wrap justify-between px-65rpx mt-6rpx"
              >
                <view
                  v-for="(image, index) in formatImage(item.detail)"
                  :key="index"
                  class="w-253 h-150 bg-cover bg-center"
                  :style="{ backgroundImage: `url(${image})` }"
                ></view>
              </view>
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/Fj7Js1N8JA2JvykAULFw1KJqpjBw"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >联系方式：{{ item.phone }}</view
                >
              </view>
            </view>
            <view
              v-if="item.status !== 2"
              class="w-full flex justify-center items-center overflow-hidden transition-all duration-500 bg-white"
              :class="item.button ? 'h-80 opacity-100' : 'h-0 opacity-0'"
            >
              <button
                v-if="item.status === 1"
                class="bg-#8B0500 h-80 w-full text-white rounded-full font-500 leading-80rpx"
                :class="mode ? 'text-36' : 'text-30'"
                @click.stop="found(item.id)"
              >
                确认领回
              </button>
              <button
                v-if="item.status === 0"
                class="bg-orange-300 h-80 text-30 w-full text-white font-500 rounded-full leading-80rpx"
                :class="mode ? 'text-36' : 'text-30'"
                @click.stop="goForm(item)"
              >
                修改信息
              </button>
            </view>
          </view>
        </n-list-cell>
      </n-list>
      <blank v-if="!data.length"></blank>
    </view>
  </view>
</template>

<script setup>
import { fetchMyLostList, lostFound } from '@/api/lost'
import dayjs from 'dayjs'
import { formatImage } from '@/service/util'
const { mode } = useStore('user')
const { currentScenic } = useStore('scenic')
const data = ref([])
const list = ref()
const getLostList = async (cp) => {
  console.log('###', cp)
  const params = {
    pageSize: 10,
    pageNum: cp,
  }
  const res = await fetchMyLostList(params)
  res.list.forEach((item) => {
    item.button = false
  })
  console.log('$$$', res)
  if (cp === 1) {
    data.value = res.list
  } else {
    data.value = data.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
const getStatusObj = (status) => {
  const statusArr = [
    {
      status: 0,
      color: 'orange',
      title: '待发布',
    },
    {
      status: 1,
      color: '#8B0500',
      title: '待取回',
    },
    {
      status: 2,
      color: 'green',
      title: '已取回',
    },
  ]
  return statusArr.find((item) => item.status === status)
}
const handleClick = (item) => {
  item.button = !item.button
}
const goForm = (formData) => {
  uni.navigateTo({ url: `/pages/leifengmuseum/lostForm/index?data=${JSON.stringify(formData)}` })
}
const found = async (id) => {
  const params = {
    idList: [id],
    project: UNI_PROJECT,
  }
  const res = lostFound(params)
  if (res.resCode === 200) {
    uni.showToast({
      title: '提交成功',
      mask: true,
    })
    setTimeout(() => {
      uni.navigateBack({
        delta: 1,
      })
    }, 2000)
  } else {
    uni.showToast({
      title: res.errInfo,
      icon: 'error',
      mask: true,
    })
  }
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped></style>
