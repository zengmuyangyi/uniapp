<template>
  <view class="w-full relative">
    <view class="w-full h-450">
      <video
        id="myVideo"
        :src="data?.downloadUrl"
        class="w-full h-full"
        :initial-time="data.learnDuration ? data.learnDuration : 0"
        @timeupdate="timeupdate"
        @ended="ended"
      ></video>
    </view>
    <view class="flex w-full mb-20rpx">
      <view
        v-for="(item, index) in tabList"
        :key="index"
        class="h-90 flex justify-center items-center relative w-50%"
        @click="handleTab(index)"
      >
        <view
          class="text-28 font-600 leading-40rpx"
          :style="{ color: currentTab === index ? '#0052D9' : '#000' }"
          >{{ item }}</view
        >
        <view
          v-if="currentTab === index"
          class="w-36 h-5 absolute bottom-14 translate-x--50% left-50% bg-#0052D9"
        ></view>
      </view>
    </view>
    <!-- 简介详情 -->
    <view v-if="currentTab === 0">
      <view class="px-20rpx">
        <!-- 课程名称 -->
        <view class="text-36 leading-50rpx font-600">{{ data?.name }}</view>
        <!-- 课程信息 -->
        <view class="mt-20rpx flex flex-wrap items-center">
          <view class="text-24 leading-40rpx tracking-1rpx mr-46rpx mb-10rpx yahei"
            >课程时长：<span class="text-#0052D9">{{ (data?.duration / 60).toFixed(1) }}</span
            >分钟</view
          >
          <view class="text-24 leading-40rpx tracking-1rpx mr-46rpx mb-10rpx yahei"
            >总学时：<span class="text-#0052D9">{{ data?.classHours }}</span></view
          >
          <view class="text-24 leading-40rpx tracking-1rpx mr-46rpx mb-10rpx yahei"
            >报名人数：<span class="text-#0052D9">{{ data?.actuallySignUpNum }}</span></view
          >
          <!-- <view class="text-24 leading-40rpx tracking-1rpx mr-46rpx mb-10rpx yahei"
            >课程提供机构：{{ data?.courseProvider }}</view
          >
          <view class="text-24 leading-40rpx tracking-1rpx mr-46rpx mb-10rpx yahei"
            >考核方式：<span class="text-#B10701">{{
              data?.checkMode ? '有考核' : '无考核'
            }}</span></view
          > -->
        </view>
        <!-- 教师简介 -->
        <view class="flex items-center mt-60rpx">
          <image
            src="https://pqntourism.pcleartv.cn/Fm_kOpcfhMqim7huc9fQnzKUvs1x"
            mode="scaleToFill"
            class="w-32 h-32 mr-8rpx"
          />
          <view class="text-32 leading-45rpx font-600">教师简介</view>
        </view>
        <!-- 教师详情 -->
        <view class="w-full flex justify-between flex-wrap">
          <view
            v-for="(item, index) in data?.courseTeacherVOList"
            :key="index"
            class="mt-23rpx w-348 h-145 flex items-center px-25rpx box-border rounded-18rpx bg-#f7f7f7"
          >
            <view class="w-74 h-74 rounded-full">
              <image
                src="https://pqntourism.pcleartv.cn/FsSmf_DTy3bxef9GRCpGVySgEq6W"
                mode="scaleToFill"
                class="w-full h-full"
              />
            </view>
            <view class="ml-40rpx">
              <view class="text-28 leading-40rpx tracking-2rpx yahei">{{ item.name }}</view>
              <view class="mt-2rpx text-24 leading-40rpx tracking-1rpx yahei text-#7c7c7c">{{
                item.officeLevel
              }}</view>
            </view>
          </view>
        </view>
        <!-- 课程介绍 -->
        <view class="flex items-center mt-60rpx">
          <image
            src="https://pqntourism.pcleartv.cn/FlnT48WaslJX0nwQAemuOtEyjYME"
            mode="scaleToFill"
            class="w-32 h-32 mr-8rpx"
          />
          <view class="text-32 leading-45rpx font-600">课程介绍</view>
        </view>
        <!-- 课程详情 -->
        <view class="mt-30rpx text-26 leading-40rpx tracking-1rpx yahei">{{
          data.description
        }}</view>
      </view>
    </view>
    <!-- 评价列表 -->
    <view v-else>
      <view class="px-20rpx w-full box-border">
        <!-- 总评价评分 -->
        <view class="flex items-center ml-14rpx">
          <view class="text-64 font-600 leading-90rpx text-#0052D9">{{
            data.avgScore ? data.avgScore : 0
          }}</view>
          <view class="ml-30rpx">
            <view class="flex mb-14rpx">
              <image
                v-for="(item, index) in data.avgScore ? intNumber(data.avgScore) : 0"
                :key="index"
                src="https://pqntourism.pcleartv.cn/Fm9XZ2ZAowQF-u7lMYoO10GYNKSW"
                mode="scaleToFill"
                class="w-36 h-36 mr-8rpx"
              />
              <image
                v-for="(item, index) in 5 - (data.avgScore ? intNumber(data.avgScore) : 0)"
                :key="index"
                src="https://pqntourism.pcleartv.cn/FgsIl2hEnh37Dcpx9rPmLpHJEPnx"
                mode="scaleToFill"
                class="w-36 h-36 mr-8rpx"
              />
            </view>
            <view class="text-24 leading-40rpx tracking-1rpx text-#676767 yahei"
              >共{{ data.courseEvaluateVOList?.length }}条评价</view
            >
          </view>
        </view>
        <view class="w-full mt-20rpx">
          <n-list bg-type="none" height="window-!250rpx" :down="null" :up="null">
            <n-list-cell v-for="(item, index) in data.courseEvaluateVOList" :key="index">
              <view
                class="w-full pt-12rpx pb-25rpx"
                style="box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(190, 190, 190, 0.5)"
              >
                <view class="flex items-center">
                  <view
                    class="w-64 h-64 bg-cover bg-center rounded-full bg-white"
                    :style="{
                      backgroundImage: `url(${
                        item.avatar || 'https://pqntourism.pcleartv.cn/Fs7BhGhRZZhTB0IDBbjXC65iMcyj'
                      })`,
                    }"
                  ></view>
                  <view class="text-26 leading-40rpx tracking-1rpx ml-29rpx yahei">{{
                    item.studentName
                  }}</view>
                  <view class="flex ml-18rpx">
                    <image
                      v-for="(item, index) in intNumber(item.score)"
                      :key="index"
                      src="https://pqntourism.pcleartv.cn/Fm9XZ2ZAowQF-u7lMYoO10GYNKSW"
                      mode="scaleToFill"
                      class="w-18 h-18 mr-4rpx"
                    />
                    <image
                      v-for="(item, index) in 5 - intNumber(item.score)"
                      :key="index"
                      src="https://pqntourism.pcleartv.cn/FgsIl2hEnh37Dcpx9rPmLpHJEPnx"
                      mode="scaleToFill"
                      class="w-18 h-18 mr-4rpx"
                    />
                  </view>
                </view>
                <!-- 评价内容 -->
                <view class="ml-93rpx text-26 leading-40rpx tracking-1rpx yahei">{{
                  item.content
                }}</view>
                <!-- 发表时间 -->
                <view class="ml-93rpx mt-36rpx text-24 leading-40rpx tracking-1rpx text-#676767"
                  >发表于{{ item.createTime }}</view
                >
              </view>
            </n-list-cell>
            <blank v-if="!data.courseEvaluateVOList.length"></blank>
          </n-list>
        </view>
        <view
          @click="handlePopup"
          class="fixed w-118 h-118 rounded-full right-40 bottom-158 flex flex-col justify-center items-center bg-#0052D9"
        >
          <image
            src="https://pqntourism.pcleartv.cn/FoT7PSIHgEHEsA-AYUkejhFOfBb8"
            mode="scaleToFill"
            class="w-32 h-32 mb-5rpx"
          />
          <view class="text-22 font-bold text-white leading-40rpx tracking-1rpx yahei">写评价</view>
        </view>
      </view>
    </view>
    <view class="w-full h-120"></view>
    <!-- 底部收藏按钮 -->
    <view class="fixed bottom-0 left-0 w-full h-90 flex bg-white">
      <view @click="collectOrNot" class="w-168 h-full flex flex-col justify-center items-center">
        <image
          :src="
            data.isCollected
              ? 'https://pqntourism.pcleartv.cn/Fm9XZ2ZAowQF-u7lMYoO10GYNKSW'
              : 'https://pqntourism.pcleartv.cn/FgsIl2hEnh37Dcpx9rPmLpHJEPnx'
          "
          mode="scaleToFill"
          class="w-40 h-40"
        />
        <view
          class="text-22 leading-40rpx tracking-1rpx yahei"
          :style="{ color: data.isCollected ? '#0052D9' : '' }"
          >{{ data.isCollected ? '已收藏' : '收藏' }}</view
        >
      </view>
      <view @click="signUp" class="flex-1 h-full flex justify-center items-center bg-#0052D9">
        <view class="text-30 font-600 leading-42rpx text-white tracking-1rpx">{{
          data.isSignUp ? '已选课' : '我要选课'
        }}</view>
      </view>
    </view>
    <!-- 写评论弹窗 -->
    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <view class="pt-60rpx pb-20rpx px-40rpx">
        <view class="flex items-center mb-20rpx">
          <view class="text-28 leading-40rpx tracking-2rpx mr-43rpx yahei">立场观点正确</view>
          <uni-rate
            v-model="evaluateParams.viewpoint"
            activeColor="#0052D9"
            color="#ddd"
            size="29"
          />
        </view>
        <view class="flex items-center mb-20rpx">
          <view class="text-28 leading-40rpx tracking-2rpx mr-43rpx yahei">注重问题导向</view>
          <uni-rate
            v-model="evaluateParams.problemOriented"
            activeColor="#0052D9"
            color="#ddd"
            size="29"
          />
        </view>
        <view class="flex items-center mb-20rpx">
          <view class="text-28 leading-40rpx tracking-2rpx mr-43rpx yahei">内容丰富全面</view>
          <uni-rate
            v-model="evaluateParams.contentRichness"
            activeColor="#0052D9"
            color="#ddd"
            size="29"
          />
        </view>
        <view class="flex items-center mb-20rpx">
          <view class="text-28 leading-40rpx tracking-2rpx mr-43rpx yahei">课程生动形象</view>
          <uni-rate
            v-model="evaluateParams.courseVivid"
            activeColor="#0052D9"
            color="#ddd"
            size="29"
          />
        </view>
        <view class="flex items-center mb-20rpx">
          <view class="text-28 leading-40rpx tracking-2rpx mr-43rpx yahei">教学切实有效</view>
          <uni-rate
            v-model="evaluateParams.practical"
            activeColor="#0052D9"
            color="#ddd"
            size="29"
          />
        </view>
        <view class="mt-60rpx">
          <uni-easyinput
            type="textarea"
            autoHeight
            v-model="evaluateParams.content"
            placeholder="请输入内容"
            :inputBorder="false"
            :maxlength="-1"
            placeholderStyle="font-size: 30rpx;letter-spacing: 2px;line-height: 40rpx;color: #A5A5A5;font-family: 'MicrosoftYaHei'"
          ></uni-easyinput>
        </view>
        <view @click="submit" class="w-full h-90 flex justify-center items-center bg-#0052D9">
          <view class="font-600 text-30 text-white leading-42rpx">提交评价</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import {
  fetchCourseById,
  evaluateCourse,
  saveCourseLearnRecord,
  signUpCourse,
  collectCourse,
} from '@/api/szgbxy'
const courseId = ref(0)
const videoTime = ref(0)
const watchTime = ref(0)
const videoContext = uni.createVideoContext('myVideo')
const timeupdate = (e) => {
  if (watchTime.value && !e.detail.currentTime) return
  videoTime.value = parseInt(e.detail.duration)
  // 记录用户当前视频进度
  const jumpTime = parseInt(e.detail.currentTime)
  // 判断用户当前视频进度比实际观看时间差别
  if (jumpTime - watchTime.value > 3 && !data.value.isFinishedLearning) {
    console.log('***')
    // 差别过大，调用seek方法跳转到实际观看时间
    videoContext.seek(watchTime.value)
  } else {
    watchTime.value = parseInt(e.detail.currentTime)
    if (
      watchTime.value - data.value.learnDuration >= 60 ||
      data.value.learnDuration > watchTime.value
    ) {
      console.log('&&&')
      data.value.learnDuration = watchTime.value
      saveLearnRecord()
    }
  }
}
const ended = () => {
  // 用户把进度条拉到最后，但是实际观看时间不够，跳转回去会自动暂停。
  if (watchTime.value < videoTime.value && !data.value.isFinishedLearning) {
    videoContext.play()
  } else {
    saveLearnRecord()
  }
}
// ---------------------------保存学习记录-----------------
const saveLearnRecord = async () => {
  if (!data.value.isSignUp) return
  const params = {
    courseId: courseId.value,
    learnDuration: watchTime.value,
  }
  saveCourseLearnRecord(params).then((res) => {})
}
// ------------------简介+评价-------------
const tabList = ref(['简介', '评价'])
const currentTab = ref(0)
const handleTab = (index) => {
  currentTab.value = index
}
// ------------------评论弹窗------------
const popup = ref()
const handlePopup = () => {
  popup.value.open()
}
const evaluateParams = ref({
  viewpoint: 0,
  problemOriented: 0,
  contentRichness: 0,
  courseVivid: 0,
  practical: 0,
  content: '',
})
const submit = () => {
  const totalScore =
    (evaluateParams.value.viewpoint +
      evaluateParams.value.problemOriented +
      evaluateParams.value.contentRichness +
      evaluateParams.value.courseVivid +
      evaluateParams.value.practical) /
    5
  const params = {
    courseId: courseId.value,
    score: totalScore,
    content: evaluateParams.value.content,
  }
  evaluateCourse(params)
    .then((res) => {
      uni.showToast({
        title: '评价提交成功',
        icon: 'none',
      })
      popup.value.close()
    })
    .catch((err) => {
      uni.showToast({
        title: err.data.msg,
        icon: 'none',
      })
      console.log(err)
    })
}

// -----------------------获取课程详情----------------------
const data = ref({})
const getCourse = async (id) => {
  const res = await fetchCourseById(id)
  watchTime.value = res.learnDuration ? res.learnDuration : 0
  data.value = res
  console.log('@@@', res)
}
onLoad((options) => {
  courseId.value = options.id - 0
  getCourse(options.id)
})
const intNumber = (num) => {
  return Math.round(num)
}
// --------------------------报名课程------------------------
const signUp = () => {
  if (!data.value.isSignUp) {
    signUpCourse(courseId.value)
      .then((res) => {
        uni.showToast({
          title: '课程报名成功',
          icon: 'none',
        })
        getCourse(courseId.value)
      })
      .catch((err) => {
        uni.showToast({
          title: err.data.msg,
          icon: 'none',
        })
      })
  }
}
// ------------------------收藏或取消收藏---------------------------
const collectOrNot = () => {
  collectCourse(courseId.value)
    .then((res) => {
      console.log(res)
      getCourse(courseId.value)
    })
    .catch((err) => {
      uni.showToast({
        title: err.data.msg,
        icon: 'none',
      })
    })
}
</script>

<style lang="scss" scoped></style>
