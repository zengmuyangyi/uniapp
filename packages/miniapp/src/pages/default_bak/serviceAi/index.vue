<template>
  <view class="w-full h-full overflow-hidden bg-#edf4fa">
    <scroll-view
      scroll-y
      :scroll-top="scrollTop"
      scroll-with-animation
      style="height: calc(100% - 120rpx)"
    >
      <view id="dialogue" class="pb-40rpx">
        <view v-for="(item, index) in dialogueContent" :key="index" class="mx-30rpx">
          <view class="flex pt-20rpx" :class="item.type === 'ai' ? 'justify-start' : 'justify-end'">
            <view v-if="item.type === 'ai'" class="w-80 h-80 rounded-full overflow-hidden">
              <image src="/static/ui/service-ai.png" mode="scaleToFill" class="w-full h-full" />
            </view>
            <view
              class="rounded-20rpx p-20rpx max-w-470rpx ml-30rpx relative box-border"
              style="display: inline-table"
              :style="{ backgroundColor: item.type === 'ai' ? '#fff' : '#ffde77' }"
            >
              <view class="leading-44rpx text-24 text-#303133">{{ item.content }}</view>
              <view v-if="item.type === 'ai'" class="absolute left--45rpx top-0">
                <view class="ic-outline-arrow-left text-white w-80 h-80"></view>
              </view>
              <view v-else class="absolute right--45rpx top-0">
                <view class="ic-outline-arrow-right text-#ffde77 w-80 h-80"></view>
              </view>
            </view>
            <view v-if="!(item.type === 'ai')" class="w-80 h-80 rounded-full overflow-hidden">
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="w-full h-120 flex justify-center items-center box-border">
      <view class="h-80 w-680 mx-30rpx rounded-50rpx flex items-center bg-white box-border">
        <view class="w-490 mx-30rpx text-24rpx">
          <view class="border-#dcdfe6 text-left relative flex">
            <input
              v-model="inputVal"
              type="text"
              placeholder="请输入内容"
              placeholder-style="color: #c0c4cc; font-size: 14px;"
            />
          </view>
        </view>
        <view
          class="w-120 h-60 text-26 text-white text-center leading-60rpx rounded-60rpx"
          :style="{ backgroundColor: inputVal.trim() ? '#1988ac' : '#bad7e5' }"
          @click="sendMessage"
          >发送</view
        >
      </view>
    </view>
  </view>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const { extConfig } = useStore('scenic')
const inputVal = ref('')
const dialogueContent = ref([
  {
    type: 'ai',
    content: '等你好久了哦',
  },
])
const { proxy } = getCurrentInstance()
const scrollTop = ref(0)
const signature = ref('')
// sign获取
const signQuest = () => {
  uni.request({
    url: 'https://chatbot.weixin.qq.com/openapi/sign/y0IM9g7a01GKTsyDUHFiklSSnIGj5C',
    data: {
      username: 'some persone',
      userid: 'alsjdasf12',
    },
    method: 'POST',
    success: (res) => {
      signature.value = res.data.signature
      console.log('@@@', signature.value)
    },
    fail: (err) => {
      console.log('###', err)
    },
  })
}
// 智能对话请求
const answerQuest = () => {
  uni.request({
    url: 'https://chatbot.weixin.qq.com/openapi/aibot/y0IM9g7a01GKTsyDUHFiklSSnIGj5C',
    data: {
      signature: signature.value,
      query: inputVal.value,
      env: 'debug',
    },
    method: 'POST',
    success: (res) => {
      const answer = res.data.answer
      dialogueContent.value.push({
        type: 'ai',
        content: answer,
      })
      const query = uni.createSelectorQuery().in(proxy)
      query
        .select('#dialogue')
        .boundingClientRect((data) => {
          scrollTop.value = data.height
        })
        .exec()
      inputVal.value = ''
    },
  })
}
const sendMessage = () => {
  if (inputVal.value.trim()) {
    dialogueContent.value.push({
      type: 'user',
      content: inputVal.value.trim(),
    })
    answerQuest()
  }
}
onMounted(async () => {
  await signQuest()
})
</script>

<style scoped lang="scss"></style>
