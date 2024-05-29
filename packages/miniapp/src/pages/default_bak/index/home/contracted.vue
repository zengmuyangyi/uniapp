<template>
  <view class="bg-#F8F5F8 h-full">
    <n-list
      :down="null"
      :up="null"
      :height="screen"
      bg-type="none"
      box-style="width:100%; height: 100%"
    >
      <n-list-cell>
        <homeBannerLY :component-style="'contracted'"></homeBannerLY>
      </n-list-cell>
      <n-list-cell>
        <contractedButton :component-style="'contracted'"></contractedButton>
      </n-list-cell>
      <n-list-cell>
        <homeRolling :component-style="'contracted'"></homeRolling>
      </n-list-cell>
      <n-list-cell>
        <homeBlocks :component-style="'contracted'"></homeBlocks>
      </n-list-cell>
      <n-list-cell>
        <homeVR :component-style="'contracted'"></homeVR>
      </n-list-cell>
      <n-list-cell>
        <homeTabList :component-style="'contracted'"></homeTabList>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import homeBannerLY from './guyun/homeBannerLY.vue'
import contractedButton from './contracted/contractedButton.vue'
import homeRolling from './common/homeRolling.vue'
import homeBlocks from './default/homeBlocks.vue'
import homeVR from './default/homeVR.vue'
import homeTabList from './common/homeTabList.vue'
</script>

<style scoped lang="scss"></style>
