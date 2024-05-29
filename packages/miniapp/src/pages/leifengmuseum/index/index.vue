<template>
  <view
    class="h-full"
    style="
      background-image: url('https://pqntourism.pcleartv.cn/Ftf4GJtlrrPVMfaKwKT7R8GtsVSB');
      background-size: 100%;
    "
  >
    <n-list
      :down="null"
      :up="null"
      :height="screen"
      bg-type="none"
      box-style="width: 100%; height: 100%"
    >
      <n-list-cell>
        <homeSearch></homeSearch>
      </n-list-cell>
      <n-list-cell>
        <homeBanner></homeBanner>
      </n-list-cell>
      <n-list-cell>
        <homeButton></homeButton>
      </n-list-cell>
      <n-list-cell>
        <homeNews></homeNews>
      </n-list-cell>
      <n-list-cell>
        <view class="h-40 w-full"></view>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import homeSearch from './components/homeSearch.vue'
import homeBanner from './components/homeBannner.vue'
import homeButton from './components/homeButton.vue'
import homeNews from './components/homeNews.vue'
import { getText } from '@/service/util'
const { currentScenic } = useStore('scenic')
onShareAppMessage(() => {
  const project = UNI_PROJECT || 'default'
  return {
    title: getText(currentScenic.value.name),
    path: `/pages/${project}/index/index`,
  }
})
</script>

<style lang="scss" scoped></style>
