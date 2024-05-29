import { ref } from 'vue'

export function useNav() {
  const leftIcons = ref([{ icon: 'arrow-left-bold', style: 'width:44px;height:44px;' }])

  function navLeftAction() {
    uni.navigateBack({
      delta: 1,
    })
  }

  return {
    leftIcons,
    navLeftAction,
  }
}
