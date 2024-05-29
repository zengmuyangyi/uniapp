<template>
  <view class="bg-#white h-full">
    <n-list
      :down="null"
      :up="null"
      :height="scrollH"
      bg-type="none"
      box-style="width:100%; height: 100%"
    >
      <n-list-cell>
        <homeBanner :component-style="'default'"></homeBanner>
      </n-list-cell>
      <n-list-cell>
        <toggle :component-style="'default'"></toggle>
      </n-list-cell>
      <n-list-cell>
        <homeBlocks :component-style="'default'"></homeBlocks>
      </n-list-cell>
      <n-list-cell>
        <homeVR :component-style="'default'"></homeVR>
      </n-list-cell>
      <n-list-cell>
        <homeRolling :component-style="'default'"></homeRolling>
      </n-list-cell>
      <n-list-cell>
        <homeTabList :component-style="'default'"></homeTabList>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import homeRolling from './common/homeRolling.vue'
import homeTabList from './common/homeTabList.vue'
import homeBanner from './default/homeBanner.vue'
import homeBlocks from './default/homeBlocks.vue'
import homeVR from './default/homeVR.vue'
import toggle from './default/toggle.vue'
</script>

<style scoped lang="scss"></style>
