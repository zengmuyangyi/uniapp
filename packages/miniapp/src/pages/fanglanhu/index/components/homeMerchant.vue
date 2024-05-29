<template>
  <view class="mt-50rpx w-full px-20rpx">
    <view
      class="w-full rounded-12rpx p-20rpx box-border"
      style="background: linear-gradient(180deg, #ff5264 0%, #ffe9bc 100%)"
    >
      <image
        src="https://pqntourism.pcleartv.cn/FouGuxqy7kd50pPT-BjfkUJfVYte"
        mode="scaleToFill"
        class="w-full h-124"
      />
      <view class="w-full flex justify-between mt-20rpx">
        <view
          v-for="(item, index) in data"
          :key="index"
          class="w-210 h-240 rounded-12rpx bg-cover bg-center relative flex flex-col justify-end"
          :style="{ backgroundImage: `url(${item.cover})` }"
        >
          <view
            class="w-full px-25rpx py-14rpx box-border bg-black bg-opacity-30 text-28 leading-36rpx text-white font-800 truncate tracking-1rpx rounded-b-12rpx"
            >{{ item.name }}</view
          >
          <view
            class="w-62 h-82 absolute left--11 top--3 bg-cover bg-center flex flex-col justify-center items-center"
            :style="{ backgroundImage: `url(${topList[index]})` }"
          >
            <view class="text-18 leading-25rpx font-600 text-white">TOP</view>
            <view class="text-30 leading-42rpx font-600 text-white">{{ index + 1 }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const data = ref([
  {
    name: '商户一',
    cover: 'https://pqntourism.pcleartv.cn/Fl3sghoMj7dxNpYoDCsKgsj-SbyS',
  },
  {
    name: '商户二',
    cover: 'https://pqntourism.pcleartv.cn/Fk93OEvdq069L-2NHa35mzRFf50m',
  },
  {
    name: '商户三',
    cover: 'https://pqntourism.pcleartv.cn/Fke16V1BiQZdyyvOFLmVl6Y5zvNE',
  },
])
const topList = [
  'https://pqntourism.pcleartv.cn/FhSFL_LlUjQul5cQ53aesZCpHoli',
  'https://pqntourism.pcleartv.cn/FjTXwnrV6zbMQbtueY5BFVD-vsPo',
  'https://pqntourism.pcleartv.cn/FsVDSDyWgU7JtP-Q1s6oof8y1DA-',
]
</script>

<style lang="scss" scoped></style>
