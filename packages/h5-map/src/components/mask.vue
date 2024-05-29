<template>
  <view
    @click="toggleIntroduction"
    class="w-full h-100vh bg-black bg-opacity-60 absolute z-1000"
  ></view>
</template>

<script setup>
const toggleIntroduction = inject('toggleIntroduction')
</script>
