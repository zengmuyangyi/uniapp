<template>
  <view
    :class="['n-position-relative', 'n-bg-' + bgType, 'n-border-' + border, 'n-radius-' + radius]"
    :style="boxStyle"
  >
    <!-- 先布局顶部线条体 -->
    <view
      class="n-flex-row n-align-center n-justify-center n-wrap-nowrap"
      :style="'width:' + width + ';height:' + iconSize + ';' + linesBoxStyle"
    >
      <view :style="'width:' + left + ';'"></view>
      <view :style="'width:' + space + ';'"></view>
      <view
        v-for="(item, index) in num"
        :key="index"
        class="n-flex-row n-align-center n-wrap-nowrap n-flex-1"
        :style="'height:' + iconSize + ';'"
      >
        <view
          :class="[
            'n-flex-1',
            'n-bg-' + (current >= index ? activeLineBgType || lineBgType : lineBgType),
          ]"
          :style="'height:' + lineHeight + ';'"
        ></view>
        <view
          :class="[
            'n-flex-1',
            'n-bg-' + (current >= index + 1 ? activeLineBgType || lineBgType : lineBgType),
          ]"
          :style="'height:' + lineHeight + ';'"
        ></view>
        <view :style="'width:' + space + ';'"></view>
      </view>
      <view :style="'width:' + left + ';'"></view>
    </view>
    <!-- 注意：如果active的时候步骤条线条的高度不一样，这里可以再复制一份线条的样式覆盖在上面.暂不考虑 -->
    <!-- 这里放items.items在width里面是左右无间距的 -->
    <view
      class="n-position-absolute n-flex-row n-justify-between n-wrap-nowrap"
      :style="'left:0;top:0;width:' + width + ';' + itemsBoxStyle"
    >
      <view
        v-for="(item, idx) in items"
        :key="idx"
        class="n-flex-column n-align-center"
        :style="'width:' + itemWidth + ';'"
        bubble="true"
        @click.stop="toItem(idx, item)"
      >
        <view
          :class="[
            'n-bg-' + (current >= idx ? activeIconBgType || iconBgType : iconBgType),
            'n-flex-column',
            'n-align-center',
            'n-justify-center',
            'n-radius-ll',
          ]"
          :style="'width:' + iconSize + ';height:' + iconSize + ';' + iconBoxStyle"
        >
          <n-icon
            v-if="iconLabel"
            :name="
              current >= idx
                ? activeIconLabel
                  ? item[activeIconLabel]
                  : item[iconLabel]
                : item[iconLabel]
            "
            :type="current >= idx ? activeIconType || iconType : iconType"
            :iconStyle="
              'width:' +
              iconSize +
              ';height:' +
              iconSize +
              ';line-height:' +
              iconSize +
              ';' +
              iconStyle
            "
          ></n-icon>
          <!--
					<image v-if="iconLabel" :src="current>=idx?(activeIconLabel?item[activeIconLabel]:item[iconLabel]):item[iconLabel]" :style="'width:'+iconSize+';height:'+iconSize+';'+iconStyle"></image>
					-->
        </view>
        <text
          v-if="hasText"
          :class="[
            'n-color-' + (current >= idx ? activeTextType || textType : textType),
            'n-size-' + textSize,
            'n-lh-' + textSize,
          ]"
          :style="'margin-top:' + iconTextSpace + ';' + textStyle"
          >{{ textLabel ? item[textLabel] : item }}</text
        >
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 一体式的步骤条
 */
import { computed } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['items', []],
    ['current', 0],
    ['width', '750rpx'],
    ['left', '84rpx'],
    ['space', '48rpx'],
    ['lineHeight', '6rpx'],
    'iconLabel',
    'activeIconLabel',
    ['lineBgType', 'middle'],
    ['activeLineBgType', 'primary'],
    ['hasText', true],
    'textLabel',
    ['iconTextSpace', '18rpx'],
    ['iconSize', '48rpx'],
    ['iconType', 'inverse'],
    ['activeIconType', 'inverse'],
    ['iconRadius', 'll'],
    'iconBgType',
    'activeIconBgType',
    'iconStyle',
    'iconBoxStyle',
    'bgType',
    'border',
    'radius',
    ['textType', 'second'],
    ['activeTextType', 'text'],
    ['textSize', 'base'],
    'textStyle',
    'boxStyle',
    'linesBoxStyle',
    'itemsBoxStyle',
  ])
)
const emit = defineEmits(['itemClicked'])

const itemWidth = computed(() => {
  // 暂时只支持rpx，不支持px
  return parseFloat(props.left) * 2 + parseFloat(props.space) + 'rpx'
})
const num = computed(() => {
  return props.items.length - 1
})

function toItem(idx, item) {
  emit('itemClicked', { index: idx, item: item })
}
</script>

<style></style>
