import { reactive } from 'vue'

export function usePager() {
  const state = reactive({
    total: 0,
    cp: 0,
    next: true,
    inLoading: false,
    triggered: false,
  })

  return {
    pager: state,
  }
}
