<template>
  <div class="relative bg-gray-200 h-full">
    <web-view :src="url" style="height: 100%; width: 100%"> </web-view>
  </div>
</template>

<script setup>
const url = ref('')

const { mapData } = useStore('app')

console.log('%c [ mapData ]-11', 'font-size:13px; background:pink; color:#bf2c9f;', mapData)
const { language } = useStore('scenic')
onShow(() => {
  const { extConfig } = useStore('scenic')

  const val =
    import.meta.env.MODE === 'development'
      ? 'https://tourismbackenddev.pcleartv.cn/frontend/map/index.html#/'
      : 'https://tourismbackend.pcleartv.cn/frontend/map/index.html#/'

  let href
  switch (mapData.value.type) {
    case 'path':
      href = `${val}?path=${mapData.value.value}`
      break
    case 'point':
      href = `${val}?scenic=${mapData.value.value}`
      break
    case 'tab':
      href = `${val}?index=${mapData.value.value}`
      break
    default:
      href = `${val}?a=1`
      break
  }

  url.value = href + `&language=${language.value}&project=${extConfig.value.project}`
})
</script>

<style lang="scss" scoped>
.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
