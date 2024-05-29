<template>
  <div class="p-20rpx">
    <div class="mb-10rpx font-bold text-30rpx">门票</div>

    <div v-if="categoryList.length > 1" class="flex flex-wrap items-center mb-10rpx">
      <div
        v-for="(tag, index) in categoryList"
        :key="index"
        :class="activeGroup === tag.id ? 'green-bg text-white' : 'ring-green-200'"
        class="mr-10rpx mb-10rpx py-5rpx px-20rpx rounded-30rpx text-24rpx"
        @click="activeGroup = tag.id"
      >
        {{ tag.name }}
      </div>
    </div>

    <div class="bg-white rounded-10rpx">
      <blank v-if="!ticketList.length"></blank>

      <div
        v-for="(item, index) in ticketList"
        :key="index"
        class="bg-white p-20rpx flex justify-between items-center"
      >
        <div>
          <div class="font-bold text-28rpx mb-20rpx">
            {{ item.name }}
          </div>

          <div class="text-green-500 flex items-center" @click="popup.open(item)">
            <div class="ic-twotone-quiz mr-10rpx"></div>
            门票详情
          </div>
        </div>
        <div class="flex-shrink-0 flex justify-center flex-col items-center">
          <div class="text-green-500 text-26rpx font-bold">
            ￥<span class="text-2em">{{ item.lowest_price || item.price }}</span> 起
          </div>
          <div class="uni-btn primary sm" @tap.stop="toOrder(item)">立即预订</div>
        </div>
      </div>
    </div>

    <ticket-detail ref="popup"></ticket-detail>
  </div>
</template>

<script setup>
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import cticketApi from '@/api/cticket'
import { inject, onMounted, watch } from 'vue'
import data from './data'

const popup = ref()

const activeGroup = ref(0)
// const ticketList = data.ticketList.list

const ticketList = ref([])
const currentScenic = inject('currentScenic', null)
// 根据选中的景点切换景点下的票
watch(
  () => currentScenic.value,
  (val) => {
    if (val?.id) {
      const style = 'font-size:13px; background:pink; color:#bf2c9f;'
      console.log('%c [景点id切换]: ', style, val.id)
      fetchTicketTypesByScenicID(val.id)
    }
  }
)

const toOrder = (ticket) => {
  uni.navigateTo({
    url: `/pages/cticket/ticketOrder/index?id=${ticket?.id}`,
  })
}

const fetchTicketTypesByScenicID = (scenicId) => {
  cticketApi.getTicketType(scenicId).then((res) => (ticketList.value = res?.data?.extraInfo?.list))
}

onMounted(() => {
  /**
   * fetchTicketTypesByScenicID(currentScenic.id)
   *  这样写可能会在 currentScenic.id 为空时，把当前所有景点的票都列出了，造成错乱
   */
  const retryDelay = 3000 // 重试延迟时间，单位：毫秒
  const maxRetryCount = 3 // 最大重试次数
  let retryCount = 0 // 当前重试次数

  const fetchTicketTypes = () => {
    if (currentScenic.id) {
      fetchTicketTypesByScenicID(currentScenic.id)
    } else {
      retryCount++
      if (retryCount <= maxRetryCount) {
        setTimeout(fetchTicketTypes, retryDelay)
      } else {
        console.error('Failed to fetch ticket types. Max retry count exceeded.')
      }
    }
  }

  fetchTicketTypes()
})

// TODO: 票种分类

const tickets = computed(() => {
  const target = groupTicketsList.find((i) => i.category.id === activeGroup.value)
  return target ? target.tickets : []
})

// 门票分组列表
const groupTicketsList = computed(() => {
  return ticketsStore.value?.groupTickets
})

// 分类列表
const categoryList = computed(() => {
  return ticketsStore.value?.categoryList
})

const ticketsStore = computed(() => {
  // return groupTickets(ticketList)
  // ticketList改为ref
  return groupTickets(ticketList.value)
})

watch(
  categoryList,
  (val) => {
    activeGroup.value = val?.[0]?.id
  },
  { immediate: true }
)

// 对门票按分类进行分组
function groupTickets(data) {
  // 有分类的票种
  const ticketTypeList = data.filter(
    (i) => i.category.status !== 'deleted' && i.category.status !== 'inactive'
  )

  // 无分类的票种
  const noCategoryTicketTypeList = data.filter(
    (i) => i.category.status === 'deleted' || i.category.status === 'inactive'
  )

  const tickets = groupBy(ticketTypeList, (item) => item.category.id)

  const categoryList = uniqBy(
    ticketTypeList.map((i) => i.category),
    (i) => i.id
  ).filter((i) => i.id)
  categoryList.sort((a, b) => a.seq - b.seq)

  const targetIdx = categoryList.findIndex((i) => i.name && i.name.indexOf('秒杀') > -1)

  if (targetIdx > -1) {
    categoryList.unshift(categoryList.splice(targetIdx, 1)[0])
  }

  const groupTickets = categoryList.map((item) => {
    return {
      category: item,
      tickets: tickets[item.id] || [],
    }
  })

  if (noCategoryTicketTypeList.length > 0) {
    // 插入未分类票种
    groupTickets.push({
      category: { name: '其它', id: 0 },
      tickets: noCategoryTicketTypeList,
    })
    categoryList.push({ name: '其它', id: 0 })
  }

  return { groupTickets, categoryList, tickets: data }
}
</script>

<style lang=""></style>
