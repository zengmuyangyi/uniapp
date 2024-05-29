<template>
  <n-list bg-type="inverse" :down="null" :up="null" height="window" class="text-28">
    <n-list-cell>
      <div class="flex justify-center flex-col items-center">
        <button
          class="w-160 h-160 p-0 m-0 rounded-full"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image
            class="w-160 h-160 rounded-full"
            mode="aspectFill"
            :src="
              form.avatarUrl ||
              'https://pqntourism.pcleartv.cn/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F.png'
            "
          ></image>
        </button>

        <div class="my-20rpx text-gray-500">点击头像进行修改</div>
      </div>

      <div class="mx-30rpx">
        <uni-forms :model-value="form">
          <uni-forms-item label="昵称" name="nickName">
            <uni-easyinput v-model="form.nickName" type="nickname" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="手机号" name="nickName">
            <div class="flex">
              <uni-easyinput
                v-model="form.phoneNumber"
                open-type="getPhoneNumber"
                placeholder="请输入手机号"
              />
              <button
                class="text-30 ml-10rpx bg-blue text-white"
                open-type="getPhoneNumber"
                @getphonenumber="getPhoneNumber"
              >
                微信授权
              </button>
            </div>
          </uni-forms-item>
          <uni-forms-item label="性别" name="gender">
            <picker
              class="border-1 border-#e5e5e5 w-full rounded-10rpx h-70rpx flex items-center justify-between"
              :value="form.gender"
              :range="array"
              @change="bindPickerChange"
            >
              <view class="uni-input w-500rpx p-20rpx">{{ array[form.gender] }}</view>
            </picker>
          </uni-forms-item>
          <uni-forms-item label="年龄" name="age">
            <uni-easyinput v-model="form.age" type="number" placeholder="请输入年龄" />
          </uni-forms-item>
        </uni-forms>

        <div class="text-center">
          <button class="text-30 ml-10rpx bg-blue text-white" @click="onSubmit">确认保存</button>
        </div>
      </div>
    </n-list-cell>
  </n-list>
</template>

<script setup>
import { getUserInfo, setPhone, setAge, directSetUserinfo } from '@/api/user'

const { updateUserInfo } = useStore('user')
const form = ref({})

function getInfo() {
  getUserInfo().then((res) => {
    console.log('%c [ res ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    form.value = res
  })
}

getInfo()

const array = ref(['男', '女'])

function bindPickerChange(e) {
  form.value.gender = e.detail.value
}

function onChooseAvatar(e) {
  console.log('%c [ e ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', e)
  const { avatarUrl } = e.detail
  form.value.avatarUrl = avatarUrl
}

function getPhoneNumber(e) {
  console.log('%c [ e ]-60', 'font-size:13px; background:pink; color:#bf2c9f;', e)
  // form.value.phoneNumber = e.detail.code

  if (!e.detail.encryptedData) {
    uni.showToast({
      title: '获取手机号失败',
      icon: 'none',
    })
    return
  }

  setPhone({
    phoneData: e.detail.encryptedData,
    phoneIv: e.detail.iv,
  }).then(() => {
    uni.showToast({
      title: '设置手机号成功',
      icon: 'none',
    })

    getInfo()
  })
}

async function onSubmit() {
  const { nickName, gender, avatarUrl, age } = form.value
  directSetUserinfo({
    nickName,
    gender,
    avatarUrl,
    watermark: { appid: 'wxb46b7abdd8681b77', timestamp: new Date().getTime() },
  }).then(async () => {
    uni.showToast({
      title: '设置成功',
      icon: 'none',
    })

    try {
      console.log('%c [ 设置年龄 ]-123', 'font-size:13px; background:pink; color:#bf2c9f;', age)
      await setAge({ age })
    } catch (e) {
      console.log('%c [ e ]-123', 'font-size:13px; background:pink; color:#bf2c9f;', e)
    }

    await updateUserInfo()
    setTimeout(() => {
      uni.navigateBack({
        delta: 1,
      })
    }, 1000)
  })
}
</script>

<style lang=""></style>
