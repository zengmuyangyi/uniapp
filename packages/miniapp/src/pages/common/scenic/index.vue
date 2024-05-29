<template>
  <div v-if="data" class="relative">
    <!-- 刘邦故里ui -->
    <view v-if="extConfig.project === 'liubangguli'" class="relative">
      <n-list bg-type="inverse" :down="null" :up="null" height="window" @scroll="handleScroll">
        <n-list-cell>
          <view class="h-500 w-full bg-gray-100 relative">
            <swiper
              v-if="images.length"
              style="height: 500rpx; width: 100%"
              circular
              :indicator-dots="indicatorDots"
              :autoplay="data?.video ? false : autoplay"
              :interval="interval"
              :duration="duration"
              @change="handleChange"
            >
              <swiper-item v-if="data?.video">
                <video :src="data.video" class="w-full h-500" />
              </swiper-item>
              <swiper-item v-for="(item, index) in images" :key="index">
                <image :src="item" mode="aspectFill" class="w-full h-500" />
              </swiper-item>
            </swiper>
            <blank v-else hide-text></blank>
            <view class="absolute bottom-20 right-32 text-30 leading-42rpx font-600 text-white">{{
              current + 1 + '/' + (data?.video ? images.length + 1 : images.length)
            }}</view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="w-full box-border py-37rpx">
            <view class="px-32rpx text-34 font-600 leading-48rpx">{{ getText(data.name) }}</view>
            <view class="px-32rpx flex mt-22rpx">
              <view class="flex-1">
                <view class="flex">
                  <view
                    v-if="!data.tags.length"
                    class="py-4rpx px-10rpx bg-#f5f5f5 text-24 leading-33rpx text-#525252 mr-20rpx"
                    >无标签</view
                  >
                  <view
                    v-for="(item, index) in data?.tags"
                    :key="index"
                    class="py-4rpx px-10rpx bg-#f5f5f5 text-24 leading-33rpx text-#525252 mr-20rpx"
                    >{{ item }}</view
                  >
                </view>
                <view
                  v-if="data?.location || getText(data?.address)"
                  class="mt-27rpx font-600 leading-40rpx text-28 w-450 truncate"
                  >{{ data?.location || getText(data?.address) }}</view
                >
              </view>
              <view class="flex py-14rpx flex-shrink-0">
                <view class="flex flex-col items-center" @click="goLocation">
                  <view class="w-80 h-80">
                    <image
                      src="/static/ui/scenic-location.png"
                      mode="scaleToFill"
                      class="w-full h-full"
                    />
                  </view>
                  <view class="mt-14rpx text-24 leading-33rpx">导航</view>
                </view>
                <view
                  v-if="data?.bookingInformation || data?.phone"
                  class="flex flex-col items-center ml-30rpx"
                  @click="
                    takePhone(data.bookingInformation ? data?.bookingInformation : data?.phone)
                  "
                >
                  <view class="w-80 h-80">
                    <image
                      src="/static/ui/scenic-phone.png"
                      mode="scaleToFill"
                      class="w-full h-full"
                    />
                  </view>
                  <view class="mt-14rpx text-24 leading-33rpx">电话</view>
                </view>
              </view>
            </view>
            <view v-if="getText(data.voiceIntroduction)" class="w-full h-1 bg-#e7e7e7"></view>
            <luch-audio
              v-if="getText(data.voiceIntroduction)"
              v-model:play="audioPlay"
              :autoplay="true"
              :name="getText(data.name)"
              :src="getText(data.voiceIntroduction)"
              :poster="getImage(data.cover)"
              audio-style="constract"
            ></luch-audio>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="w-full h-20 bg-#f4f5f7"></view>
        </n-list-cell>
        <n-list-cell>
          <view class="w-full px-32rpx py-40rpx bg-white box-border">
            <view class="text-34 font-600 leading-48rpx">{{ getText(data.name) }}</view>
            <mp-html class="mt-20rpx" :content="getText(data.introduction)" />
          </view>
        </n-list-cell>
        <n-list-cell>
          <div class="h-120"></div>
        </n-list-cell>
      </n-list>
      <n-position pos="top" box-style="width:750rpx;">
        <div
          class="bg-blue text-white"
          :style="{
            background: `linear-gradient(90deg, rgba(203, 113, 118,${opacity}), rgba(170, 39, 46, ${opacity}))`,
          }"
        >
          <n-height height="status"></n-height>
          <n-height height="nav">
            <div class="flex h-full w-full items-center px-3 justify-center text-shadow-sm">
              <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
              <span :style="{ opacity: opacity }">{{ getText(data.name) }}</span>
            </div>
          </n-height>
        </div>
      </n-position>
      <view v-if="currentId" class="fixed bottom-0 w-full h-120 flex justify-center bg-white">
        <view
          v-if="data.buyUrl"
          class="w-50% h-full flex justify-center items-center text-white"
          style="
            background-image: linear-gradient(90deg, rgba(203, 113, 118, 1), rgba(170, 39, 46, 1));
          "
          @click="goBuyUrl(data.buyUrl)"
        >
          <view class="w-50 h-50">
            <image src="/static/ui/scenic-book.png" mode="scaleToFill" class="w-full h-full" />
          </view>
          <view class="ml-24rpx text-30 font-bold">预定</view>
        </view>
        <view class="w-50% h-full flex justify-center items-center bg-white" @click="collectScenic">
          <view class="w-50 h-50">
            <image
              v-if="isCollect"
              src="/static/ui/scenic-collect-true.png"
              mode="scaleToFill"
              class="w-full h-full"
            />
            <image
              v-else
              src="/static/ui/scenic-collect-false.png"
              mode="scaleToFill"
              class="w-full h-full"
            />
          </view>
          <view class="ml-24rpx text-30 font-bold" :style="{ color: isCollect ? '#AA272E' : '' }">{{
            isCollect ? '已收藏' : '收藏'
          }}</view>
        </view>
      </view>
    </view>
    <!-- 大堰镇ui -->
    <view v-else-if="extConfig.project === 'dayan'" class="relative pb-100rpx">
      <image
        v-if="currentId"
        mode="widthFix"
        class="w-full"
        src="https://pqncdn.cleartv.cn/pres/resources/b1cda255657415e7972c562e99901c1e_PrAT3oVg_231229191215.png"
      ></image>
      <image
        v-else
        mode="widthFix"
        class="w-full"
        src="https://pqncdn.cleartv.cn/pres/resources/b716eb4226467cfa1adf5589b499ac41_6etjvJqp_231229184939.png"
      ></image>

      <view class="fixed bottom-0 w-full h-100 flex justify-center bg-white">
        <view
          class="w-50% h-full flex justify-center items-center text-white bg-#1988ac"
          @click="goBuyUrl(data.buyUrl)"
        >
          <view class="ic-outline-shopping-cart w-40 h-40"></view>
          <view class="ml-2 text-30">预定</view>
        </view>
        <view class="w-50% h-full flex justify-center items-center bg-white" @click="collectScenic">
          <view
            :class="isCollect ? 'ic-baseline-star text-red' : 'ic-baseline-star-border'"
            class="w-40 h-40"
          ></view>
          <view class="ml-2 text-30">{{ isCollect ? '已收藏' : '收藏' }}</view>
        </view>
      </view>
    </view>
    <!-- 上犹县ui -->
    <view v-else-if="extConfig.project === 'shangyouxian'" class="w-full relative bg-#f5f5f5">
      <n-list bg-type="shangyouxian" :down="null" :up="null" height="window" @scroll="handleScroll">
        <n-list-cell>
          <view class="w-full h-430">
            <swiper
              v-if="images.length"
              style="height: 430rpx; width: 100%"
              circular
              :indicator-dots="indicatorDots"
              :autoplay="data?.video ? false : autoplay"
              :interval="interval"
              :duration="duration"
            >
              <swiper-item v-if="data?.video">
                <video :src="data.video" class="w-full h-430" />
              </swiper-item>
              <swiper-item v-for="(item, index) in images" :key="index">
                <image :src="item" mode="aspectFill" class="w-full h-430" />
              </swiper-item>
            </swiper>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="px-20rpx w-full box-border">
            <view class="translate-y--70rpx">
              <view
                class="w-full bg-white rounded-24rpx p-30rpx pb-47rpx"
                style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
              >
                <view>
                  <span class="text-36 leading-50rpx font-800 relative text-#333">
                    {{ getText(data.name) }}
                    <view
                      class="absolute left-0 bottom-0 w-full h-18 rounded-10rpx bg-opacity-20 bg-#299627"
                    ></view>
                  </span>
                </view>
                <view v-if="data?.tags" class="mt-35rpx flex">
                  <view
                    v-for="(tag, index) in data.tags"
                    :key="index"
                    class="border-2 rounded-2rpx py-1rpx px-14rpx mr-8rpx"
                    :style="{ borderColor: `${index ? '#ff7f19' : '#79b872'}` }"
                  >
                    <view
                      class="text-center leading-36rpx text-24"
                      :style="{ color: `${index ? '#ff7f19' : '#79b872'}` }"
                      >{{ tag }}</view
                    >
                  </view>
                </view>
                <view
                  v-if="getText(data?.address) || data?.location"
                  class="mt-30rpx flex items-center w-full"
                >
                  <view class="w-34 h-34 mr-13rpx flex-shrink-0">
                    <image
                      src="/static/ui/location2.png"
                      mode="scaleToFill"
                      class="w-full h-full"
                    />
                  </view>
                  <view class="truncate flex-1 text-30 leading-42rpx text-#666" @click="goLocation"
                    >地理位置：{{ getText(data?.address) || data?.location }}</view
                  >
                </view>
                <view
                  v-if="data?.phone || data?.bookingInformation"
                  class="mt-30rpx flex items-center w-full"
                  @click="
                    takePhone(data.bookingInformation ? data?.bookingInformation : data?.phone)
                  "
                >
                  <view class="w-34 h-34 mr-13rpx flex-shrink-0">
                    <image src="/static/ui/phone.png" mode="scaleToFill" class="w-full h-full" />
                  </view>
                  <view class="truncate flex-1 text-30 leading-42rpx text-#666"
                    >联系电话：{{ data?.phone || data?.bookingInformation }}</view
                  >
                </view>
                <view
                  v-if="data?.openTime || data?.businessTime"
                  class="mt-30rpx flex items-center w-full"
                >
                  <view class="w-34 h-34 mr-13rpx flex-shrink-0">
                    <image src="/static/ui/clock.png" mode="scaleToFill" class="w-full h-full" />
                  </view>
                  <view class="truncate flex-1 text-30 leading-42rpx text-#666"
                    >开放时间：{{ data?.openTime || data?.businessTime }}</view
                  >
                </view>
              </view>
              <view
                class="w-full bg-white rounded-24rpx p-10rpx mt-26rpx"
                style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
              >
                <view
                  class="w-full p-20rpx box-border rounded-24rpx"
                  :style="{ border: `${type ? '' : '2rpx solid #9DC374'}` }"
                >
                  <view class="text-36 leading-50rpx font-800 relative text-#333"
                    >详细介绍<view
                      class="absolute left-0 bottom-0 w-142 h-18 rounded-10rpx bg-opacity-20 bg-#299627"
                    ></view
                  ></view>
                  <view
                    :style="{ height: `${type && !isShowFull ? '300rpx' : 'auto'}` }"
                    class="mt-30rpx leading-60rpx text-30 overflow-hidden relative text-#666"
                  >
                    <view
                      v-if="type && !isShowFull"
                      class="w-full h-80 absolute left-0 bottom-0"
                      style="
                        background-image: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff);
                      "
                    ></view>
                    <mp-html class="mt-20rpx" :content="getText(data?.introduction)" />
                  </view>
                  <view
                    v-if="type"
                    class="w-full flex items-center justify-center"
                    @click="isShowFull = !isShowFull"
                  >
                    <view class="text-30 leading-42rpx tracking-3rpx">{{
                      isShowFull ? '关闭' : '展开'
                    }}</view>
                    <view
                      :class="
                        isShowFull
                          ? 'ic-outline-keyboard-arrow-up'
                          : 'ic-outline-keyboard-arrow-down'
                      "
                      class="text-40"
                    ></view>
                  </view>
                </view>
              </view>
              <view
                v-if="type"
                class="w-full bg-white rounded-24rpx p-30rpx pb-38rpx mt-18rpx"
                style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
              >
                <view class="w-full">
                  <view class="w-full flex items-center justify-between">
                    <view class="text-36 leading-50rpx font-800 relative text-#333"
                      >推荐菜品<view
                        class="absolute left-0 bottom-0 w-142 h-18 rounded-10rpx bg-opacity-20 bg-#299627"
                      ></view
                    ></view>
                    <view class="flex items-center" @click="goMore">
                      <view class="text-30 tracking-3rpx leading-42rpx">更多</view>
                      <view class="ic-baseline-keyboard-arrow-right text-40"></view>
                    </view>
                  </view>
                  <view class="mt-20rpx w-full">
                    <scroll-view scroll-x :show-scrollbar="false">
                      <view class="flex">
                        <view
                          v-for="item in recommendData"
                          :key="item.id"
                          class="w-300 mr-30rpx flex-shrink-0"
                        >
                          <view
                            class="w-full h-220 rounded-10rpx bg-cover bg-center"
                            :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
                          ></view>
                          <view class="mt-16rpx text-28 leading-40rpx font-600 w-full truncate">{{
                            getText(item.name)
                          }}</view>
                        </view>
                      </view>
                    </scroll-view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view v-if="currentId" class="w-full h-120"></view>
        </n-list-cell>
      </n-list>
      <view v-if="currentId" class="fixed bottom-0 w-full h-146 flex justify-center bg-white">
        <view
          v-if="data.buyUrl"
          class="w-50% h-full flex justify-center items-center text-white bg-#79b872"
          @click="goBuyUrl(data.buyUrl)"
        >
          <view class="w-50 h-50">
            <image src="/static/ui/scenic-book.png" mode="scaleToFill" class="w-full h-full" />
          </view>
          <view class="ml-20rpx text-36 font-800 leading-50rpx">预定</view>
        </view>
        <view class="w-50% h-full flex justify-center items-center bg-white" @click="collectScenic">
          <view class="w-50 h-50">
            <image
              v-if="isCollect"
              src="/static/ui/scenic-collect-true2.png"
              mode="scaleToFill"
              class="w-full h-full"
            />
            <image
              v-else
              src="/static/ui/scenic-collect-false.png"
              mode="scaleToFill"
              class="w-full h-full"
            />
          </view>
          <view
            class="ml-20rpx text-36 font-bold leading-50rpx"
            :style="{ color: isCollect ? '#79B872' : '' }"
            >{{ isCollect ? '已收藏' : '收藏' }}</view
          >
        </view>
      </view>
    </view>
    <!-- 芳兰湖ui -->
    <view v-else-if="extConfig.project === 'fanglanhu'">
      <n-list bg-type="none" :down="null" :up="null" height="window">
        <n-list-cell>
          <view class="w-full">
            <swiper
              v-if="images.length"
              style="height: 400rpx; width: 100%"
              circular
              :indicator-dots="false"
              :autoplay="data?.video ? false : autoplay"
              :interval="interval"
              :duration="duration"
              :current="current"
              @change="handleChange"
            >
              <swiper-item v-if="data?.video">
                <video :src="data.video" controls class="w-full h-400"></video>
              </swiper-item>
              <swiper-item v-for="(item, index) in images" :key="index">
                <image :src="item" mode="aspectFill" class="w-full h-400" />
              </swiper-item>
            </swiper>
            <view class="flex mt-20rpx justify-center items-center">
              <view
                v-for="(item, idx) in indicatorDotsData(images, data?.video)"
                :key="idx"
                class="w-10 h-10 rounded-full mx-6rpx"
                :style="{
                  background:
                    current === idx
                      ? `linear-gradient( 315deg, #1DDBF5 0%, #4D91FF 100%)`
                      : '#D1D1D1',
                }"
                style="box-shadow: 0px 2px 14px 3px rgba(71, 71, 71, 0.08)"
              ></view>
            </view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="px-28rpx w-full box-border py-30rpx">
            <view class="text-32 leading-36rpx font-800">{{ getText(data.name) }}</view>
            <view class="mt-20rpx flex">
              <view
                v-for="(tag, index) in data.tags"
                :key="index"
                class="px-10rpx h-30 leading-30rpx text-20 rounded-8rpx border-1 border-solid"
                :style="{ borderColor: fanglanhuTag[index], color: fanglanhuTag[index] }"
                >{{ tag }}</view
              >
            </view>
            <view
              class="mt-30rpx flex items-center w-full"
              @click="takePhone(data.bookingInformation ? data?.bookingInformation : data?.phone)"
            >
              <image
                src="/static/ui/phone.png"
                mode="scaleToFill"
                class="w-24 h-24 mr-12rpx flex-shrink-0"
              />
              <view class="truncate flex-1 text-26 leading-37rpx text-#666"
                >联系电话：{{ data?.phone || data?.bookingInformation }}</view
              >
            </view>
            <view
              v-if="getText(data?.address) || data?.location"
              class="mt-10rpx flex items-center w-full mb-45rpx"
              @click="goLocation"
            >
              <image
                src="/static/ui/location2.png"
                mode="scaleToFill"
                class="w-24 h-24 mr-12rpx flex-shrink-0"
              />
              <view class="truncate flex-1 text-26 leading-37rpx text-#666"
                >地理位置：{{ getText(data?.address) || data?.location }}</view
              >
            </view>
            <luch-audio
              v-if="getText(data.voiceIntroduction)"
              v-model:play="audioPlay"
              :autoplay="true"
              :name="getText(data.name)"
              :src="getText(data.voiceIntroduction)"
              :poster="getImage(data.cover)"
              audio-style="baoquan"
            ></luch-audio>
            <view class="mt-45rpx">
              <mp-html
                class="text-28 leading-48rpx text-#2b2b2b"
                :content="getText(data.introduction)"
              />
            </view>
          </view>
        </n-list-cell>
      </n-list>
    </view>
    <!-- 雷锋纪念馆ui -->
    <view
      v-else-if="extConfig.project === 'leifengmuseum'"
      style="
        background-image: url('https://pqntourism.pcleartv.cn/Ftf4GJtlrrPVMfaKwKT7R8GtsVSB');
        background-size: 100%;
      "
    >
      <n-list bg-type="none" :down="null" :up="null" height="window">
        <n-list-cell>
          <view class="px-40rpx mt-180rpx w-full box-border">
            <view class="w-full h-420 rounded-20rpx overflow-hidden">
              <swiper
                indicator-dots
                autoplay
                circular
                indicator-active-color="#fff"
                indicator-color="rgba(255,255,255,0.48)"
                class="w-full h-full"
              >
                <swiper-item v-for="(item, index) in images" :key="index">
                  <view
                    class="w-full h-full bg-cover bg-center"
                    :style="{ backgroundImage: `url(${item})` }"
                  ></view>
                </swiper-item>
              </swiper>
            </view>
            <view class="mt-40rpx w-full flex justify-between items-center">
              <view
                class="font-500 text-#3b2f2f"
                :class="mode ? 'text-56 leading-60rpx' : 'text-50 leading-54rpx'"
                >{{ getText(data.name) }}</view
              >
              <!-- #ifdef MP-WEIXIN -->
              <button
                plain
                open-type="share"
                class="p-0 m-0 flex items-center"
                style="border: none"
              >
                <image
                  src="https://pqntourism.pcleartv.cn/FlJc4BWefYu52vZkCVUnnzN1z4gq"
                  mode="scaleToFill"
                  :class="mode ? 'w-50 h-50' : 'w-40 h-40'"
                />
                <view
                  class="font-500 ml-8rpx text-#8b0500"
                  :class="mode ? 'text-38 leading-42rpx' : 'text-32 leading-35rpx'"
                  >分享</view
                >
              </button>
              <!-- #endif -->
            </view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view @click="goLocation" class="mt-44rpx">
            <view class="px-36rpx flex items-center">
              <image
                src="https://pqntourism.pcleartv.cn/Fng6c_xdAFD8FSxyJYl8AKPIqccd"
                mode="scaleToFill"
                class="mr-7rpx"
                :class="mode ? 'w-50 h-50' : 'w-40 h-40'"
              />
              <view
                class="font-500 text-#8b0500"
                :class="mode ? 'text-38 leading-42rpx' : 'text-32 leading-35rpx'"
                >景区地址</view
              >
            </view>
            <view
              class="mt-37rpx px-40rpx font-500 text-#3b2f2f"
              :class="mode ? 'text-40 leading-48rpx' : 'text-34 leading-42rpx'"
              >{{ getText(data?.address) || data?.location }}</view
            >
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="mt-58rpx">
            <view class="px-36rpx flex items-center">
              <image
                src="https://pqntourism.pcleartv.cn/FrJ5j5HvxTvOwCE45AkeV1eHw7e7"
                mode="scaleToFill"
                class="mr-7rpx"
                :class="mode ? 'w-50 h-50' : 'w-40 h-40'"
              />
              <view
                class="font-500 text-#8b0500"
                :class="mode ? 'text-38 leading-42rpx' : 'text-32 leading-35rpx'"
                >联系电话</view
              >
            </view>
            <view
              class="mt-37rpx px-40rpx font-500 text-#3b2f2f"
              :class="mode ? 'text-40 leading-48rpx' : 'text-34 leading-42rpx'"
              >{{ data.phone || data.bookingInformation }}</view
            >
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="mt-58rpx">
            <view class="px-36rpx flex items-center">
              <image
                src="https://pqntourism.pcleartv.cn/FgMZWV_T7zp0anuHtToAGgGX4smC"
                mode="scaleToFill"
                class="mr-7rpx"
                :class="mode ? 'w-50 h-50' : 'w-40 h-40'"
              />
              <view
                class="font-500 text-#8b0500"
                :class="mode ? 'text-38 leading-42rpx' : 'text-32 leading-35rpx'"
                >开放时间</view
              >
            </view>
            <view
              class="mt-37rpx px-40rpx font-500 text-#3b2f2f"
              :class="mode ? 'text-40 leading-48rpx' : 'text-34 leading-42rpx'"
              >{{ data.openTime }}</view
            >
          </view>
        </n-list-cell>
        <n-list-cell v-if="getText(data.trafficWay)">
          <view class="mt-58rpx">
            <view class="px-36rpx flex items-center">
              <image
                src="https://pqntourism.pcleartv.cn/Fuu2vxreyIX0ZgOw6k8JHUfwVrso"
                mode="scaleToFill"
                class="mr-7rpx"
                :class="mode ? 'w-50 h-50' : 'w-40 h-40'"
              />
              <view
                class="font-500 text-#8b0500"
                :class="mode ? 'text-38 leading-42rpx' : 'text-32 leading-35rpx'"
                >交通线路</view
              >
            </view>
            <view
              class="mt-37rpx px-40rpx font-500 text-#3b2f2f"
              :class="mode ? 'text-40 leading-48rpx' : 'text-34 leading-42rpx'"
              >{{ getText(data.trafficWay) }}</view
            >
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="mt-58rpx pb-40rpx">
            <view class="px-36rpx flex items-center">
              <image
                src="https://pqntourism.pcleartv.cn/FnnFUPVIBqvpNJIdLFIdg2Vd-HMJ"
                mode="scaleToFill"
                class="mr-7rpx"
                :class="mode ? 'w-50 h-50' : 'w-40 h-40'"
              />
              <view
                class="font-500 text-#8b0500"
                :class="mode ? 'text-38 leading-42rpx' : 'text-32 leading-35rpx'"
                >景区介绍</view
              >
            </view>
            <view class="mt-37rpx px-40rpx">
              <mp-html
                class="font-500 text-#3b2f2f"
                :class="mode ? 'text-40 leading-48rpx' : 'text-34 leading-42rpx'"
                :content="getText(data.introduction)"
              />
            </view>
          </view>
        </n-list-cell>
      </n-list>
      <!-- 顶部导航栏 -->
      <n-position pos="top" box-style="width:750rpx;">
        <view class="bg-transparent">
          <n-height height="status"></n-height>
          <n-height height="nav">
            <view class="flex h-full w-full items-center px-3 justify-center">
              <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
              <span class="text-38 leading-42rpx font-500">{{ getText(data.name) }}</span>
            </view>
          </n-height>
        </view>
      </n-position>
    </view>
    <!-- 宝泉ui -->
    <view v-else-if="extConfig.project === 'baoquan'" class="w-full relative bg-#f3f3f3">
      <n-list bg-type="none" :down="null" :up="null" height="window" @scroll="handleScroll">
        <n-list-cell>
          <view class="w-full h-377">
            <swiper
              v-if="images.length"
              style="height: 377rpx; width: 100%"
              circular
              :indicator-dots="indicatorDots"
              :autoplay="data?.video ? false : autoplay"
              :interval="interval"
              :duration="duration"
            >
              <swiper-item v-if="data?.video">
                <video :src="data.video" class="w-full h-430" />
              </swiper-item>
              <swiper-item v-for="(item, index) in images" :key="index">
                <image :src="item" mode="aspectFill" class="w-full h-430" />
              </swiper-item>
            </swiper>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view class="my-20rpx bg-white w-full py-25rpx px-40rpx">
            <view>
              <span class="text-36 leading-50rpx font-800 relative">
                {{ getText(data.name) }}
                <view
                  class="absolute left-0 bottom-0 w-full h-18 rounded-10rpx bg-opacity-25 bg-#99C775"
                ></view>
              </span>
            </view>
            <view v-if="data?.tags" class="mt-20rpx flex">
              <view
                v-for="(tag, index) in data.tags"
                :key="index"
                class="border-2 rounded-2rpx py-1rpx px-20rpx mr-8rpx"
                :style="{ borderColor: `${index ? '#FF7F19' : '#85BE60'}` }"
              >
                <view
                  class="text-center leading-36rpx text-26"
                  :style="{ color: `${index ? '#FF7F19' : '#85BE60'}` }"
                  >{{ tag }}</view
                >
              </view>
            </view>
            <view
              v-if="getText(data?.address) || data?.location"
              class="mt-25rpx flex items-center w-full"
            >
              <view class="w-34 h-34 mr-13rpx flex-shrink-0">
                <image src="/static/ui/location2.png" mode="scaleToFill" class="w-full h-full" />
              </view>
              <view class="truncate flex-1 text-26 leading-37rpx text-#666" @click="goLocation"
                >地理位置：{{ getText(data?.address) || data?.location }}</view
              >
            </view>
            <view
              v-if="data?.phone || data?.bookingInformation"
              class="mt-20rpx flex items-center w-full"
            >
              <view class="w-34 h-34 mr-13rpx flex-shrink-0">
                <image src="/static/ui/phone.png" mode="scaleToFill" class="w-full h-full" />
              </view>
              <view class="truncate flex-1 text-26 leading-37rpx text-#666"
                >联系电话：{{ data?.phone || data?.bookingInformation }}</view
              >
            </view>
            <view
              v-if="data?.openTime || data?.businessTime"
              class="mt-20rpx flex items-center w-full"
            >
              <view class="w-34 h-34 mr-13rpx flex-shrink-0">
                <image src="/static/ui/clock.png" mode="scaleToFill" class="w-full h-full" />
              </view>
              <view class="truncate flex-1 text-26 leading-37rpx text-#666"
                >开放时间：{{ data?.openTime || data?.businessTime }}</view
              >
            </view>
            <luch-audio
              v-if="getText(data.voiceIntroduction)"
              v-model:play="audioPlay"
              :autoplay="true"
              :name="getText(data.name)"
              :src="getText(data.voiceIntroduction)"
              :poster="getImage(data.cover)"
              audio-style="baoquan"
            ></luch-audio>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view
            class="bg-white px-48rpx w-full py-20rpx box-border"
            :class="isMessage ? '' : 'mb-20rpx'"
          >
            <view>
              <span @click="isMessage = false" class="text-34 leading-50rpx font-600 relative"
                >详情<view
                  v-show="!isMessage"
                  class="absolute left-0 bottom-0 w-full h-10 rounded-10rpx bg-opacity-25 bg-#99C775"
                ></view
              ></span>
              <span
                v-if="currentId"
                @click="isMessage = true"
                class="text-34 leading-48rpx font-600 relative ml-42rpx"
                >评论<view
                  v-show="isMessage"
                  class="absolute left-0 bottom-0 w-full h-10 rounded-10rpx bg-opacity-25 bg-#99C775"
                ></view
              ></span>
            </view>
            <view v-show="!isMessage" class="mt-36rpx w-full">
              <mp-html
                class="text-28 leading-48rpx text-#666"
                :content="getText(data?.introduction)"
              />
            </view>
            <view v-show="isMessage" class="mt-42rpx w-full">
              <n-list
                ref="list"
                bg-type="none"
                height="window"
                :auto-update="true"
                @down="getMessageList"
                @up="getMessageList"
              >
                <n-list-cell>
                  <view v-for="(item, index) in messageList" :key="item.id">
                    <view class="flex items-center">
                      <view
                        class="w-67 h-67 rounded-full bg-cover bg-no-repeat bg-center"
                        :style="{
                          backgroundImage: `url(${
                            item.userImage
                              ? item.userImage
                              : 'https://pqntourism.pcleartv.cn/FkZthmrQ_sGZAsqSwUmG65d83tV8'
                          })`,
                        }"
                      ></view>
                      <view class="ml-15rpx">
                        <view class="text-26 font-600 leading-37rpx mb-11rpx">{{
                          item.nickName || '匿名用户'
                        }}</view>
                        <view class="text-22 leading-30rpx text-#666">{{ item.createTime }}</view>
                      </view>
                    </view>
                    <view class="mt-24rpx leading-40rpx text-28">{{ item.content }}</view>
                    <view
                      v-if="formatImage(item.image).length > 1"
                      class="w-full flex items-center flex-wrap"
                    >
                      <view
                        v-for="(image, index) in formatImage(item.image)"
                        :key="index"
                        class="w-205 h-205 bg-gray-300 bg-cover bg-center"
                        @click="preview(image, formatImage(item.image))"
                        :class="index % 3 ? 'ml-10rpx' : ''"
                        :style="{
                          backgroundImage: `url(${image})`,
                          marginTop: index > 2 ? '10rpx' : '',
                        }"
                      ></view>
                    </view>
                    <view
                      v-else
                      class="w-460 h-460 bg-gray-300 bg-cover bg-center"
                      @click="preview(item.image, formatImage(item.image))"
                      :style="{ backgroundImage: `url(${item.image})` }"
                    ></view>
                    <view
                      v-if="item.reply"
                      class="w-full p-20rpx box-border rounded-8rpx text-26 mt-13rpx text-#666 bg-#fafafa"
                    >
                      <view class="leading-37rpx font-600">景区回复</view>
                      <view class="leading-37rpx">{{ item.reply }}</view>
                    </view>
                    <view
                      v-if="index !== messageList.length - 1"
                      class="w-full h-1 my-25rpx bg-#efefef"
                    ></view>
                  </view>
                </n-list-cell>
                <blank v-if="!messageList.length"></blank>
              </n-list>
            </view>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view v-if="currentId" class="w-full h-146"></view>
        </n-list-cell>
      </n-list>
      <view
        v-if="currentId && !isMessage"
        class="fixed bottom-0 w-full h-146 flex justify-center bg-white"
      >
        <view
          v-if="data.buyUrl"
          class="w-50% h-full flex justify-center items-center text-white"
          style="background-image: linear-gradient(90deg, #9dca79 0%, #85be60 100%)"
          @click="goBuyUrl(data.buyUrl)"
        >
          <view class="w-50 h-50">
            <image src="/static/ui/scenic-book.png" mode="scaleToFill" class="w-full h-full" />
          </view>
          <view class="ml-20rpx text-36 font-800 leading-50rpx">预定</view>
        </view>
        <view class="w-50% h-full flex justify-center items-center bg-white" @click="collectScenic">
          <view class="w-50 h-50">
            <image
              v-if="isCollect"
              src="/static/ui/scenic-collect-true2.png"
              mode="scaleToFill"
              class="w-full h-full"
            />
            <image
              v-else
              src="/static/ui/scenic-collect-false.png"
              mode="scaleToFill"
              class="w-full h-full"
            />
          </view>
          <view
            class="ml-20rpx text-36 font-bold leading-50rpx"
            :style="{ color: isCollect ? '#79B872' : '' }"
            >{{ isCollect ? '已收藏' : '收藏' }}</view
          >
        </view>
      </view>
      <view
        v-if="currentId && isMessage"
        @click="goMessage"
        class="fixed bottom-0 w-full h-118 flex justify-center items-center text-white"
        style="background-image: linear-gradient(90deg, #9dca79 0%, #85be60 100%)"
      >
        <view class="w-50 h-50">
          <image src="/static/ui/message.png" mode="scaleToFill" class="w-full h-full" />
        </view>
        <view class="ml-20rpx text-36 font-800 leading-50rpx">去留言</view>
      </view>
    </view>
    <view v-else class="relative">
      <n-list bg-type="shangyouxian" :down="null" :up="null" height="window" @scroll="handleScroll">
        <n-list-cell>
          <div
            style="height: 600rpx"
            class="h-600 flex w-full justify-center items-end bg-gray-100"
          >
            <swiper
              v-if="images.length"
              style="height: 600rpx; width: 100%"
              circular
              :indicator-dots="indicatorDots"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration"
              @change="handleChange"
            >
              <swiper-item v-for="(item, index) in images" :key="index">
                <image :src="item" mode="aspectFill" class="w-full h-600" />
              </swiper-item>
            </swiper>

            <blank v-else hide-text></blank>
          </div>
        </n-list-cell>
        <n-list-cell>
          <div class="relative">
            <div class="bg-white rounded-3 text-40 font-bold -mt-3 p-3 flex justify-between">
              {{ getText(data.name) }}

              <!-- #ifdef MP-WEIXIN -->
              <button
                plain
                open-type="share"
                class="w-56 h-48 p-0 m-0"
                style="
                  border: none;
                  background: url(https://pqntourism.pcleartv.cn/share.png) no-repeat center center;
                  background-size: 100% 100%;
                "
              >
                <!-- <image src="/static/ui/share.png" class="w-56 h-48"></image> -->
              </button>
              <!-- #endif -->
            </div>
          </div>
        </n-list-cell>
        <n-list-cell>
          <div class="p-3 pt-0">
            <div class="mb-3">
              <luch-audio
                v-if="getText(data.voiceIntroduction)"
                v-model:play="audioPlay"
                :autoplay="true"
                :src="getText(data.voiceIntroduction)"
              ></luch-audio>
            </div>

            <div v-if="data.openTime" class="font-bold mb-1 py-3">
              <div class="flex items-center text-30 mb-25rpx">
                <!-- <span class="text-yellow-500 ic-baseline-access-time-filled mr-1"></span> -->
                开放时间
              </div>

              <div class="text-gray-500 font-normal text-26">
                {{ data.openTime }}
              </div>
            </div>

            <div v-if="data.phone || data.bookingInformation" class="font-bold mb-1 py-3">
              <div class="flex items-center text-30 mb-25rpx">
                <!-- <span class="text-yellow-500 ic-baseline-local-phone mr-1"></span> -->
                联系电话
              </div>

              <div class="text-gray-500 font-normal text-26">
                {{ data.phone || data.bookingInformation }}
              </div>
            </div>

            <div v-if="data.address || data.location" class="font-bold mb-1 py-3">
              <div class="flex items-center text-30 mb-25rpx">
                <!-- <span class="text-yellow-500 ic-round-location-on mr-1"></span> -->
                地理位置
              </div>

              <div class="text-gray-500 font-normal text-26">
                {{ getText(data.address) || data.location }}
              </div>
            </div>

            <div class="py-3">
              <div class="font-bold flex items-center text-30 mb-25rpx">
                <!-- <span class="text-yellow-500 ic-baseline-info mr-1"></span> -->
                景点介绍
              </div>

              <mp-html class="text-gray-600" :content="getText(data.introduction)" />
            </div>

            <div
              v-if="extConfig.project !== 'kunshanopera'"
              class="relative overflow-hidden rounded-3"
              @click="goMap(data)"
            >
              <image :src="vr" mode="aspectFill" class="image w-full h-240 block" />

              <div v-if="currentId" class="green-bg icon px-2 py-1 rounded-2">
                <div class="majesticons-map-marker-area mr-2"></div>
                查看地图
              </div>
              <div v-else class="green-bg px-2 py-1 rounded-2 icon">
                <div class="majesticons-map-marker-area mr-2"></div>
                景区导览
              </div>
            </div>
          </div>
        </n-list-cell>

        <n-list-cell>
          <div class="h-100"></div>
        </n-list-cell>
      </n-list>

      <n-position pos="top" box-style="width:750rpx;">
        <div class="bg-blue text-white" :style="{ background: `rgba(234, 179, 8,${opacity})` }">
          <n-height height="status"></n-height>
          <n-height height="nav">
            <div class="flex h-full w-full items-center px-3 justify-center text-shadow-sm">
              <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
              <span :style="{ opacity: opacity }">{{ getText(data.name) }}</span>
            </div>
          </n-height>
        </div>
      </n-position>
      <view v-if="currentId" class="fixed bottom-0 w-full h-100 flex justify-center bg-white">
        <view
          v-if="data.buyUrl"
          class="w-50% h-full flex justify-center items-center text-white bg-#1988ac"
          @click="goBuyUrl(data.buyUrl)"
        >
          <view class="ic-outline-shopping-cart w-40 h-40"></view>
          <view class="ml-2 text-30">预定</view>
        </view>
        <view class="w-50% h-full flex justify-center items-center bg-white" @click="collectScenic">
          <view
            :class="isCollect ? 'ic-baseline-star text-red' : 'ic-baseline-star-border'"
            class="w-40 h-40"
          ></view>
          <view class="ml-2 text-30">{{ isCollect ? '已收藏' : '收藏' }}</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script setup>
// import singleData from './data'
import { fetchMapPOI, fetchMapPOIChildren } from '@/api/map'
import { getHeight } from '@/nPro/utils/system.js'
import { getImage, getText, navigateTo, getExtConfig } from '@/service/util'
import { ifCollect, saveCollect, cancelCollect } from '@/api/collect'
import { fetchPoiMessage } from '@/api/message'
import { formatImage } from '@/service/util'
// import $t from '@/service/i18n'
const { currentScenic } = useStore('scenic')
const { mode } = useStore('user')
const fanglanhuTag = ['#FF7426', '#459CFD', '#22C991']
const panoramic = computed(() => {
  return currentScenic.value.panoramic
})

const vr = computed(() => {
  return currentScenic.value.vr || getImage(currentScenic.value.images)?.split(',')?.[0]
})

const currentId = ref()
const singleInfo = ref({})
const data = computed(() => {
  if (!currentId.value) {
    uni.setNavigationBarTitle({ title: getText(currentScenic.value.name) })
  }
  return currentId.value ? singleInfo.value : currentScenic.value
})

const scollTop = ref(0)
const opacity = computed(() => {
  const op = scollTop.value / (getHeight('status-nav') + 100)
  return op > 1 ? 1 : op
})

const current = ref(0)

const handleChange = (e) => {
  current.value = e.target?.current || 0
}
// ------------自定义指示点数据处理------------------
const indicatorDotsData = (images, video) => {
  const list = JSON.parse(JSON.stringify(images))
  if (video) {
    return list.unshift(video)
  }
  return list
}

const images = ref([])
watchEffect(() => {
  const imageList = getImage(data.value.images)
  console.log('%c [ imageList ]-141', 'font-size:13px; background:pink; color:#bf2c9f;', imageList)
  images.value = imageList ? imageList?.split(',') : []
})

const audioPlay = ref(true)

const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
}

const handleBack = () => {
  uni.navigateBack()
}
// ---------------------------收藏--------------------------
const isCollect = ref(false)
const extConfig = getExtConfig()
const collectScenic = async () => {
  const params = {
    project: extConfig.project,
    collectType: 'MAP_POI',
    collectId: currentId.value + '',
  }
  if (isCollect.value) {
    cancelCollect(params).then(
      (res) => {
        ifCollect(params).then(
          (res) => {
            isCollect.value = res
          },
          (err) => {
            console.log('$$$', err)
          }
        )
      },
      (err) => {
        console.log(err)
      }
    )
  } else {
    saveCollect(params).then(
      (res) => {
        ifCollect(params).then(
          (res) => {
            isCollect.value = res
          },
          (err) => {
            console.log('$$$', err)
          }
        )
      },
      (err) => {
        if (err.data.indexOf('access denied') > -1) {
          uni.navigateTo({ url: '/pages/common/login/index' })
        }
      }
    )
  }
}
const goMore = () => {
  uni.navigateTo({
    url: `/pagesShangyou/pages/foodRecommand/index?parentId=${currentId.value}`,
  })
}
const type = ref(false)
const recommendData = ref([])
const isShowFull = ref(false)
onLoad(async (options) => {
  console.log('%c [ options ]-95', 'font-size:13px; background:pink; color:#bf2c9f;', options)

  if (options?.title) {
    uni.setNavigationBarTitle({ title: options.title })
  }
  if (options?.type) {
    type.value = true
  }
  if (options?.id) {
    if (options?.type) {
      const params = {
        recommend: 1,
        status: 1,
        pageSize: 0,
        pageNum: 0,
        parentId: options.id - 0,
      }
      fetchMapPOIChildren(params).then((res) => {
        console.log('$$$$$$', res)
        recommendData.value = res.list
      })
    }
    currentId.value = options?.id - 0
    const res = await fetchMapPOI(currentId.value)
    res.tags = res.tag?.split(',').filter(Boolean)
    ifCollect({ projetct: extConfig.project, collectType: 'MAP_POI', collectId: options.id }).then(
      (res) => {
        isCollect.value = res
      },
      (err) => {
        console.log('$$$', err)
      }
    )
    singleInfo.value = res
    // if (extConfig.project === 'baoquan') {
    //   getMessageList()
    // }
  }
})

const handleScroll = (e) => {
  scollTop.value = e.detail.scrollTop
}

const { mapData } = useStore('app')

const goMap = () => {
  mapData.value = {
    type: 'point',
    value: data.value.id,
  }

  navigateTo({ url: 'map/index' })
}

const handleShare = () => {
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 1,
    success: function (res) {
      console.log('success:' + JSON.stringify(res))
    },
    fail: function (err) {
      console.log('fail:' + JSON.stringify(err))
    },
  })
}

onShareAppMessage(() => {
  return {
    title: getText(data.value.name),
    path: `pages/scenic/index${currentId.value ? '?id=' + currentId.value : ''}`,
  }
})
// 购票链接
const goBuyUrl = (path) => {
  if (path.indexOf('小程序') > -1) {
    uni.navigateToMiniProgram({
      shortLink: path,
      success(res) {
        console.log(res)
      },
    })
  } else if (path.indexOf('?') > -1) {
    const temp = path.split('?')
    uni.navigateTo({
      url: `/pages/common/webLink/index?url=${temp[0]}&${temp[1]}`,
    })
  } else {
    uni.navigateTo({ url: `/pages/common/webLink/index?url=${path}` })
  }
}
// ------------------------跳转导航-------------------------
const goLocation = () => {
  uni.navigateTo({
    url: `/pages/common/location/index?longitude=${data.value.lng}&latitude=${
      data.value.lat
    }&name=${getText(data.value.name)}`,
  })
}
// ----------------------------拨打电话-------------------
const takePhone = (phone) => {
  console.log('*****', phone + '')
  uni.makePhoneCall({
    phoneNumber: phone + '',
  })
}
// ----------------------------留言-------------------
const isMessage = ref(false)
const { isLogin, userInfo = {} } = useStore('user')
const messageList = ref([])
const list = ref()
const getMessageList = async (cp) => {
  if (extConfig.project !== 'baoquan') return
  const ins = list.value
  const params = {
    pageSize: 10,
    pageNum: cp,
    type: 'poi',
    status: '1',
    poiId: currentId.value,
    isOnline: 1,
  }
  const res = await fetchPoiMessage(params)
  if (cp === 1) {
    messageList.value = res.list
  } else {
    messageList.value = messageList.value.concat(res.list)
  }
  ins.nEndSuccess(!!res.nextPage)
}
const goMessage = () => {
  if (!isLogin.value) {
    navigateTo({ url: 'login/index' })
  } else {
    uni.navigateTo({
      url: `/pages/baoquan/message/index?poiId=${data.value.id}&type=poi`,
    })
  }
}
const preview = (url, images) => {
  uni.previewImage({
    current: url, // 当前显示图片的http链接
    urls: images, // 需要预览的图片http链接列表
  })
}
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
