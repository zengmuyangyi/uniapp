import { ref } from 'vue'

export function useToast() {
  const ntoast = ref(null)

  function showToast(options) {
    ntoast.value.show(options)
  }

  return {
    ntoast,
    showToast,
  }
}

export function useLoading() {
  const nloading = ref(null)

  function showLoading(options) {
    nloading.value.show(options)
  }
  function hideLoading() {
    nloading.value.hide()
  }

  return {
    nloading,
    showLoading,
    hideLoading,
  }
}
