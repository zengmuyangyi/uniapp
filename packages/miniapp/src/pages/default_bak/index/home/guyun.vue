<template>
  <view class="bg-#F3EEE4 h-full">
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
        <homeRolling :component-style="'guyun'"></homeRolling>
      </n-list-cell>
      <n-list-cell>
        <homeBlocksLY :component-style="'guyun'"></homeBlocksLY>
      </n-list-cell>
      <n-list-cell>
        <homeButton :component-style="'guyun'"></homeButton>
      </n-list-cell>
      <n-list-cell>
        <homeTabList :component-style="'guyun'"></homeTabList>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import homeRolling from './common/homeRolling.vue'
import homeTabList from './common/homeTabList.vue'
import homeBannerLY from './guyun/homeBannerLY.vue'
import homeBlocksLY from './guyun/homeBlocksLY.vue'
import homeButton from './guyun/homeButton.vue'
</script>

<style scoped lang="scss"></style>
