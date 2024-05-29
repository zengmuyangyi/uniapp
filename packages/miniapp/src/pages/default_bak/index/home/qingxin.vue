<template>
  <view class="bg-#white h-full">
    <n-list
      :down="null"
      :up="null"
      :height="screen"
      bg-type="none"
      box-style="width:100%; height: 100%"
    >
      <n-list-cell>
        <homeBannerLY :component-style="'guyun'"></homeBannerLY>
      </n-list-cell>
      <n-list-cell>
        <homeRolling :component-style="'qingxin'"></homeRolling>
      </n-list-cell>
      <n-list-cell>
        <homeBlocksLY :component-style="'qingxin'"></homeBlocksLY>
      </n-list-cell>
      <n-list-cell>
        <ticket :component-style="'qingxin'"></ticket>
      </n-list-cell>
      <n-list-cell>
        <tour :component-style="'qingxin'"></tour>
      </n-list-cell>
      <n-list-cell>
        <homeTabList :component-style="'qingxin'"></homeTabList>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import homeRolling from './common/homeRolling.vue'
import homeTabList from './common/homeTabList.vue'
import homeBannerLY from './guyun/homeBannerLY.vue'
import homeBlocksLY from './guyun/homeBlocksLY.vue'
import ticket from './qingxin/ticket.vue'
import tour from './qingxin/tour.vue'
</script>

<style scoped lang="scss"></style>
