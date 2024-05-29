<template>
  <uni-popup ref="popup" @maskClick="close">
    <div class="bg-white rounded-lt-20rpx rounded-rt-20rpx">
      <div class="p-20rpx font-bold flex justify-between items-center">
        {{ currentItem?.name }} - 门票详情

        <div class="ic-close" @click="close"></div>
      </div>

      <!-- 如果滚动后，不重新渲染，显示的位置会不正确 -->
      <div v-if="show" class="max-h-80vh overflow-auto p-20rpx box-border">
        <div v-for="(keyItem, index) in detailProperty" :key="index" class="mb-20rpx">
          <p class="text-green-600 mb-20rpx">{{ keyItem.title }}</p>
          <p class="content" v-html="currentItem?.[keyItem.key]"></p>
        </div>
      </div>
    </div>
  </uni-popup>
</template>

<script setup>
const detailProperty = [
  {
    key: 'purchase_notice',
    title: '购买须知',
  },
  {
    key: 'description',
    title: '使用须知',
  },
  {
    key: 'withdrawal_notice',
    title: '退改须知',
  },
  {
    key: 'other_notice',
    title: '其他须知',
  },
]

const show = ref(false)
const currentItem = ref({})
const isInitPopup = ref(false)
const popup = ref()
function open(data) {
  currentItem.value = data

  show.value = true
  if (isInitPopup.value) {
    popup.value.open('bottom')
    return
  }

  // 首次打开弹窗时，需要延迟 100ms，否则会出现弹窗无动画
  setTimeout(() => {
    popup.value.open('bottom')

    isInitPopup.value = true
  }, 100)
}

function close() {
  popup.value.close()
  setTimeout(() => {
    show.value = false
  }, 500)
}

defineExpose({
  open,
  close,
})
</script>

<style lang=""></style>
