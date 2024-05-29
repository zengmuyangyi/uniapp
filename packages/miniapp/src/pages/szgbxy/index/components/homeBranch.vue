<template>
  <view
    class="mt-30rpx w-full h-240 px-20rpx box-border bg-contain bg-no-repeat"
    style="background-image: url(https://pqntourism.pcleartv.cn/Fji0U95hv9CLZIdbvnmMweb_i17F)"
  >
    <view class="w-full flex items-center h-full overflow-x-auto">
      <view
        v-for="(item, index) in data"
        :key="index"
        class="flex flex-col items-center"
        :class="index ? 'ml-18rpx' : ''"
      >
        <view
          class="w-172 h-96 rounded-full bg-cover bg-center"
          :style="{ backgroundImage: `url(${item.cover})` }"
        ></view>
        <view class="mt-20rpx text-26 leading-35rpx font-bold truncate yahei">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
const data = ref([
  {
    name: '市委党校',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '干部学院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '张家港分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '常熟分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '太仓分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '昆山分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '吴江分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '吴中分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '相城分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '姑苏分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '工业园区分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  {
    name: '新区分院',
    cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  },
  // {
  //   name: '常熟分院',
  //   cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  // },
  // {
  //   name: '昆山分院',
  //   cover: 'https://pqntourism.pcleartv.cn/Fp5Tt__jl8nokY84KhzY8udnaQXB',
  // },
])
</script>

<style lang="scss" scoped></style>
