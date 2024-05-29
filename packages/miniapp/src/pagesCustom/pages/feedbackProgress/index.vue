<template>
  <view class="w-full p-20rpx box-border min-h-full bg-#f5f5f5">
    <blank v-if="!data.length"></blank>
    <view
      v-for="(item, index) in data"
      :key="item.id"
      class="w-full bg-white rounded-24rpx pt-32rpx pb-48rpx pl-40rpx pr-50rpx text-32"
      :class="index ? 'mt-30rpx' : ''"
      style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
    >
      <view class="leading-45rpx">建议时间：{{ item.createTime }}</view>
      <view class="flex mt-62rpx">
        <view class="flex-shrink-0 leading-45rpx w-220">问题标题</view>
        <view class="leading-45rpx text-#cecece">{{ item.title }}</view>
      </view>
      <view class="flex mt-30rpx">
        <view class="flex-shrink-0 leading-45rpx w-220">联系人姓名</view>
        <view class="leading-45rpx text-#cecece">{{ item.contactName }}</view>
      </view>
      <view class="flex mt-30rpx">
        <view class="flex-shrink-0 leading-45rpx w-220">联系人电话</view>
        <view class="leading-45rpx text-#cecece">{{ item.concactPhone }}</view>
      </view>
      <view class="flex mt-30rpx">
        <view class="flex-shrink-0 leading-45rpx w-220">详细内容</view>
        <view>
          <view v-show="item?.isOpen" class="text-#CECECE mb-30rpx">
            <view class="leading-45rpx">{{ item.content }}</view>
            <view v-if="item.images?.length" class="flex flex-wrap mt-30rpx w-full justify-between">
              <view
                v-for="(image, indx) in item.images"
                :key="indx"
                class="w-190 h-190 flex-shrink-0"
              >
                <image :src="image" mode="scaleToFill" class="w-full h-full" />
              </view>
            </view>
          </view>
          <view class="font-600 flex items-center font-600" @click="handleClick(index)">
            <view class="leading-45rpx">{{ item?.isOpen ? '收起' : '展开' }}</view>
            <image
              v-if="item?.isOpen"
              src="../../static/up.png"
              mode="scaleToFill"
              class="w-30 h-30 ml-8rpx"
            />
            <image
              v-else
              src="../../static/down.png"
              mode="scaleToFill"
              class="w-30 h-30 ml-8rpx"
            />
          </view>
        </view>
      </view>
      <view class="w-full h-1 my-40rpx bg-#e8e8e8"></view>
      <view class="flex">
        <view class="flex-shrink-0 leading-45rpx w-220">处理状态</view>
        <view
          class="leading-45rpx font-600 text-#cecece"
          :style="{ color: item.checkStatus ? '#79B872' : '#E06161' }"
          >{{ item.checkStatus ? '已核实' : '审核中' }}</view
        >
      </view>
      <view v-if="item.checkDetail" class="flex mt-30rpx">
        <view class="flex-shrink-0 leading-45rpx w-220">回复信息</view>
        <view class="leading-45rpx text-#cecece">{{ item.checkDetail }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchFeedBack } from '@/api/user'
const { userInfo } = useStore('user')
const data = ref([])
const handleClick = (index) => {
  data.value[index].isOpen = !data.value[index].isOpen
}
const params = {
  userId: userInfo.value.phoneNumber,
  pageSize: 0,
  pageNum: 0,
}
fetchFeedBack(params).then((res) => {
  console.log('%%%%', res)
  res.list.forEach((item) => {
    item.isOpen = false
    if (item.images) {
      item.images = item.images.split(',')
    }
  })
  data.value = res.list
})
</script>

<style scoped lang="scss"></style>
