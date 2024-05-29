import { defineStore } from 'pinia'

export const useApp = defineStore('app', () => {
  const mapTabIndex = ref(0)
  const targetLnglat = ref(null)
  const pathId = ref(0)
  const mapData = ref({
    type: '',
    value: null,
  })

  return {
    mapData,
    pathId,
    mapTabIndex,
    targetLnglat,
  }
})
