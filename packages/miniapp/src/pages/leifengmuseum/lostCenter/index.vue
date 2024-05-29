<template>
  <view
    class="h-full"
    style="
      background-image: url('https://pqntourism.pcleartv.cn/Ftf4GJtlrrPVMfaKwKT7R8GtsVSB');
      background-size: 100%;
    "
  >
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span class="text-38 leading-42rpx font-500">失物招领</span>
          </view>
        </n-height>
      </view>
    </n-position>
    <view class="w-full pt-180rpx box-border">
      <n-list
        ref="list"
        bg-type="none"
        height="window-!180rpx"
        :auto-update="true"
        @down="getLostList"
        @up="getLostList"
      >
        <!-- <n-list-cell>
          <view class="w-full px-25rpx box-border flex justify-between">
            <view
              @click="handleForm"
              class="w-344 h-208 bg-cover bg-center pt-56rpx pr-49rpx pl-55rpx box-border"
              style="
                background-image: url(https://pqntourism.pcleartv.cn/FppuHtGua2su62Dwk_A0-AJ_gIX1);
              "
            >
              <view class="font-500 leading-42rpx " :class="mode ? 'text-40' : 'text-34'"
                >挂失申请</view
              >
              <view class="flex w-full justify-between items-center mt-22rpx">
                <view
                  class="font-500 text-#7e7e7e "
                  :class="mode ? 'text-34 leading-36rpx' : 'text-28 leading-30rpx'"
                  >填写挂失申请</view
                >
                <image
                  src="https://pqntourism.pcleartv.cn/FkTtOGoQFfgAA-K3Ati-V657tVjG"
                  mode="scaleToFill"
                  :class="mode ? 'w-18 h-26' : 'w-12 h-20'"
                />
              </view>
            </view>
            <view
              @click="handleProcess"
              class="w-344 h-208 bg-cover bg-center pt-56rpx pr-49rpx pl-55rpx box-border"
              style="
                background-image: url(https://pqntourism.pcleartv.cn/Fr7euh2S8a0aQ2kaqXGmHqCM7fQ-);
              "
            >
              <view class="font-500 leading-42rpx " :class="mode ? 'text-40' : 'text-34'"
                >进度查询</view
              >
              <view class="flex w-full justify-between items-center mt-22rpx">
                <view
                  class="font-500 text-#7e7e7e "
                  :class="mode ? 'text-34 leading-36rpx' : 'text-28 leading-30rpx'"
                  >查询挂失进度</view
                >
                <image
                  src="https://pqntourism.pcleartv.cn/FkTtOGoQFfgAA-K3Ati-V657tVjG"
                  mode="scaleToFill"
                  :class="mode ? 'w-18 h-26' : 'w-12 h-20'"
                />
              </view>
            </view>
          </view>
        </n-list-cell> -->
        <n-list-cell>
          <view class="w-full px-40rpx box-border">
            <view
              class="w-full mt-26rpx font-500 text-#3b2f2f"
              :class="mode ? 'text-56 leading-60rpx' : 'text-50 leading-54rpx'"
              >失物招领公告</view
            >
            <view
              :class="mode ? 'h-80' : 'h-66'"
              class="w-full bg-white rounded-full mt-44rpx px-30rpx box-border flex items-center"
            >
              <image
                src="https://pqntourism.pcleartv.cn/Fqa3RsaNsLrJZZ5cYJ583NHUxhKE"
                mode="scaleToFill"
                class="w-32 h-32 mr-19rpx"
              />
              <input
                class="flex-1"
                type="text"
                placeholder="搜索"
                :placeholderStyle="`font-size: ${
                  mode ? '34rpx' : '30rpx'
                };color: #999; font-weight: 500;line-height: ${mode ? '48rpx' : '32rpx'}`"
                @confirm="handleSearch"
              />
              <view class="w-200 h-full flex-shrink-0">
                <uni-data-select
                  v-model="currentType"
                  :localdata="localdata"
                  :clear="false"
                  @change="handleChange"
                ></uni-data-select>
              </view>
            </view>
          </view>
        </n-list-cell>
        <n-list-cell v-for="(item, index) in data" :key="index">
          <view class="w-full px-40rpx mt-40rpx">
            <view class="bg-white w-full">
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/FksgbdiQlEpwy2-I5tnm3FKZnCnB"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >景区热线：{{ currentScenic.phone }}</view
                >
              </view>
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/Frl-UFw6iK-TdcjbEkT4mSLAgoVj"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >联系人：{{ item.personName }}</view
                >
              </view>
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/FsLKMBG4dtt0HrEUcZ2k_Wj88IJv"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >物品类型：{{ item.goodsName }}</view
                >
              </view>
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/Fpy2Axixhqd3rGC0shVr0wxwcOJz"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >遗失时间：{{ dayjs(item.lostTime).format('YYYY.MM.DD HH:mm:ss') }}</view
                >
              </view>
              <view class="w-full flex px-27rpx box-border py-15rpx">
                <image
                  src="https://pqntourism.pcleartv.cn/FmVdN28FbNA1JFkI3VB36xIP59sW"
                  mode="scaleToFill"
                  class="flex-shrink-0"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >详细描述：{{ item.describe }}</view
                >
              </view>
              <view
                v-if="item.detail"
                class="w-full flex flex-wrap justify-between px-65rpx mt-6rpx"
              >
                <view
                  v-for="(image, index) in formatImage(item.detail)"
                  :key="index"
                  class="w-253 h-150 bg-cover bg-center"
                  :style="{ backgroundImage: `url(${image})` }"
                ></view>
              </view>
              <view class="w-full h-80 flex items-center px-27rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/Fj7Js1N8JA2JvykAULFw1KJqpjBw"
                  mode="scaleToFill"
                  :class="mode ? 'w-36 h-36' : 'w-26 h-26'"
                />
                <view
                  class="ml-9rpx font-500 text-#7e7e7e"
                  :class="mode ? 'text-36 leading-38rpx' : 'text-30 leading-32rpx'"
                  >联系方式：{{ item.phone }}</view
                >
              </view>
            </view>
          </view>
        </n-list-cell>
        <n-list-cell v-if="!data.length">
          <blank v-if="!data.length"></blank>
        </n-list-cell>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import { fetchLostList } from '@/api/lost'
import { fetchNewsTypeNew } from '@/api/news'
import dayjs from 'dayjs'
import { formatImage } from '@/service/util'
const { mode } = useStore('user')
const { currentScenic, getMenu } = useStore('scenic')
const currentType = ref('')
const localdata = ref([])
const getLostType = async () => {
  const menuObj = await getMenu('lost')
  const params = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
    menuId: menuObj.id,
  }
  const res = await fetchNewsTypeNew(params)
  localdata.value = res.list.map((item) => {
    return { text: item.name, value: item.name }
  })
  localdata.value.unshift({
    text: '全部',
    value: '',
  })
}
const data = ref([])
const list = ref()
const describe = ref('')
const goodsName = ref('')
const getLostList = async (cp) => {
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
    describe: describe.value,
    goodsName: goodsName.value,
  }
  const res = await fetchLostList(params)
  if (cp === 1) {
    data.value = res.list
  } else {
    data.value = data.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
const handleSearch = (e) => {
  describe.value = e.detail.value.trim()
  getLostList(1)
}
const handleChange = (e) => {
  goodsName.value = e
  getLostList(1)
}
const handleForm = () => {
  uni.navigateTo({
    url: '/pages/leifengmuseum/lostForm/index',
  })
}
const handleProcess = () => {
  uni.navigateTo({
    url: '/pages/leifengmuseum/lostList/index',
  })
}
onLoad(() => {
  getLostType()
})
</script>

<style lang="scss" scoped>
:deep(.uni-select) {
  border: 0;
  .uni-select__input-text {
    font-family: '-Medium';
  }
  .uni-select__selector-item {
    font-family: '-Medium';
  }
}
</style>
