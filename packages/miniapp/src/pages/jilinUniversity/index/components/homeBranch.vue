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
        :class="index ? 'ml-43rpx' : ''"
      >
        <view
          class="w-140 h-140 rounded-full bg-cover bg-center"
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
    name: '人文学部',
    cover: 'https://pqntourism.pcleartv.cn/Fm4eIIfO1pebH8sCkpdA3WH7zesu',
  },
  {
    name: '社会科学学部',
    cover: 'https://pqntourism.pcleartv.cn/FuqkxwrEF20TOFLpNGlnLvvZgxZg',
  },
  {
    name: '理学部',
    cover: 'https://pqntourism.pcleartv.cn/Fh8QoLBF-QoZlYl7vgvcQQHVodGw',
  },
  {
    name: '工学部',
    cover: 'https://pqntourism.pcleartv.cn/FuNaL-JO6u9QDvzeQlt0JvEVVn1p',
  },
])
</script>

<style lang="scss" scoped></style>
