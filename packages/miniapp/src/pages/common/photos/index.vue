<template>
  <n-list bg-type="inverse" :down="null" :up="null" height="window">
    <n-list-cell>
      <div class="flex flex-wrap p-3 justify-between">
        <div
          v-for="(item, index) in photoAlbum"
          :key="index"
          class="relative rounded-2 overflow-hidden shadow shadow-md mb-5"
          style="width: 47%"
          @click="handleClick(item)"
        >
          <image
            :src="getImage(item.coverImage)"
            mode="aspectFill"
            class="w-full h-280 block"
          ></image>
          <span
            class="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white overflow-hidden whitespace-nowrap text-ellipsis"
            >{{ getText(item.name) }}</span
          >
        </div>
      </div>
    </n-list-cell>

    <blank v-if="!photoAlbum.length && isLoaded"></blank>
  </n-list>
</template>

<script setup>
import { fetchPhotoAlbum, fetchPhotoList } from '@/api/photos'
import $t from '@/service/i18n'
import { getImage, getText } from '@/service/util'

const photoAlbum = ref([])
const isLoaded = ref(false)

async function getPhotoAlbum() {
  uni.showLoading({ mask: true })
  const res = await fetchPhotoAlbum()
  console.log('%c [ res ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', res)
  photoAlbum.value = res.list
  uni.hideLoading()

  isLoaded.value = true
}

getPhotoAlbum()

async function handleClick(item) {
  const res = await fetchPhotoList(item.id)

  console.log('%c [ 照片 ]-46', 'font-size:13px; background:pink; color:#bf2c9f;', res)
  if (!res.list.length) {
    uni.showToast({
      title: '暂无照片',
      icon: 'none',
    })
    return
  }
  uni.previewImage({
    urls: res.list.map((i) => getImage(i.image)),
  })
}

onLoad((options) => {
  uni.setNavigationBarTitle({
    title: options.title || $t('Photos'),
  })
})
</script>

<style lang=""></style>
