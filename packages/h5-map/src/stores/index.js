import { defineStore } from 'pinia'

export const useApp = defineStore('map', () => {
  const language = ref('cn')

  function setLanguage(str) {
    language.value = str
  }

  return {
    language,
    setLanguage,
  }
})
