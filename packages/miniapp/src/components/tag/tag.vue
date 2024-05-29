<template>
  <uni-tag
    :text="getTagTitle(props.status)"
    :type="getTagColor(props.status)"
    size="small"
  ></uni-tag>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    default: () => '',
  },
})
const tagList = [
  {
    status: 'Canceled',
    title: '已撤回',
    color: 'default',
  },
  {
    status: 'Wait-Approval',
    title: '待审核',
    color: 'warning',
  },
  {
    status: 'Accepted',
    title: '已通过',
    color: 'success',
  },
  {
    status: 'Refused',
    title: '已驳回',
    color: 'error',
  },
]
const getTagTitle = (status) => {
  const temp = tagList.find((item) => item.status === status)
  return temp?.title
}
const getTagColor = (status) => {
  const temp = tagList.find((item) => item.status === status)
  return temp?.color
}
</script>
