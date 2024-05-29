<template>
  <div class="relative bg-gray-200 h-full">
    <web-view :src="panoramic" style="height: 100%; width: 100%"> </web-view>
  </div>
</template>

<script setup>
const { currentScenic } = useStore('scenic')

const panoramic = computed(() => {
  return currentScenic.value.panoramic
})
</script>
