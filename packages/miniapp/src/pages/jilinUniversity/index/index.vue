<template>
  <view class="h-full bg-white">
    <n-list
      :down="null"
      :up="null"
      height="screen"
      bg-type="none"
      box-style="width:100%; height: 100%"
    >
      <n-list-cell>
        <homeBanner></homeBanner>
      </n-list-cell>
      <n-list-cell>
        <homeNotice></homeNotice>
      </n-list-cell>
      <n-list-cell>
        <homeBranch></homeBranch>
      </n-list-cell>
      <n-list-cell>
        <homeCourse></homeCourse>
      </n-list-cell>
      <!-- <n-list-cell>
        <homeTeacher></homeTeacher>
      </n-list-cell>
      <n-list-cell>
        <homeRank></homeRank>
      </n-list-cell> -->
      <n-list-cell>
        <view class="w-full h-60"></view>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import homeBanner from './components/homeBanner.vue'
import homeBranch from './components/homeBranch.vue'
import homeCourse from './components/homeCourse.vue'
import homeNotice from './components/homeNotice.vue'
// import homeRank from './components/homeRank.vue'
// import homeTeacher from './components/homeTeacher.vue'
</script>

<style lang="scss" scoped></style>
