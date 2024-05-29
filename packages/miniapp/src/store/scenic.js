import { defineStore } from 'pinia'
import menuApi from '@/api/menu'
import { fetchCurrentScenic, fetchSliderImage, fetchLanguageList } from '@/api/scenic'
import { fetchProgramTree } from '@/api/programControl'
import { getText, parseObject } from '@/service/util'
import { getMyWeather, getCityInfo } from '@/api/weather'
// import { parseObject } from '@/service/util'
import $t from '@/service/i18n'
import { getExtConfig } from '@/service/util'

export const useScenic = defineStore('scenic', () => {
  const extConfig = ref(getExtConfig())
  console.log(
    '%c [ 项目 ]-01',
    'font-size:13px; background:blue; color:#bf2c9f;',
    extConfig.value.project
  )

  // ---------------------------根据模板类型获取菜单----------------------------------
  const menu = ref()
  const getMenu = async (templateCode) => {
    if (menu.value) {
      return menu.value.find((item) => item.templateCode === templateCode)
    }
    const res = await menuApi.getMenu()
    menu.value = res.list || []
    return menu.value.find((item) => item.templateCode === templateCode)
  }

  // ---------------------------语言列表-----------------------------------
  const language = ref(uni.getStorageSync('currentLanguage') || 'cn')

  const languageList = ref([])
  const setLanguage = (lang) => {
    language.value = lang
    uni.setStorageSync('currentLanguage', lang)
    setTabbar()
  }

  const getLanguageList = async () => {
    const res = await fetchLanguageList()
    console.log('%c [ 语言列表 ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', res.list)
    languageList.value = res.list || []

    // setTabbar() // 初始化tabbar文字
    // 全局变量
    // getApp().globalData.languageList = res.list || [] // 放在store里面可能会导致：parseObject方法里面拿语言列表时循环引用
  }

  const isLoading = ref(true)
  // TODO 待修复。不同项目tabbar语言设置可能有问题
  function setTabbar() {
    uni.setTabBarItem({
      index: 0,
      text: $t('Home'),
    })

    uni.setTabBarItem({
      index: 1,
      text: $t('Guides'),
    })

    uni.setTabBarItem({
      index: 2,
      text: $t('Profile'),
    })
  }

  // ---------------------------小程序管理-----------------------------------
  const programTree = ref([])
  const getProgramTree = async () => {
    const res = await fetchProgramTree()
    res.forEach((item) => {
      if (item.children.length) {
        item.children.forEach((el) => {
          parseObject(el)
        })
      }
    })
    programTree.value = res
    console.log('%c [ 小程序信息 ]-53', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    isLoading.value = false
    // setTabbar()
  }

  // ---------------------------景区信息-----------------------------------
  const currentScenic = ref({})
  const getCurrentScenic = async () => {
    const res = await fetchCurrentScenic()
    currentScenic.value = res.list?.[0] || {}
    console.log(
      '%c [ 景区信息 ]-49',
      'font-size:13px; background:pink; color:#bf2c9f;',
      currentScenic.value
    )
  }

  // ---------------------------轮播图-----------------------------------
  const sliderImages = ref([])
  const getSliderImages = async () => {
    const res = await fetchSliderImage()
    sliderImages.value = res.list || []
    console.log(
      '%c [ 轮播图 ]-61',
      'font-size:13px; background:pink; color:#bf2c9f;',
      sliderImages.value
    )
  }

  // ------------------------------获取天气信息-----------------------------
  const weatherInfo = ref({})
  const locationInfo = ref({})
  const getWeatherInfo = async () => {
    getMyWeather('now', currentScenic.value.lng + ',' + currentScenic.value.lat).then((res) => {
      console.log('%c [ 天气信息 ]-62', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      weatherInfo.value = res.data.now
    })
    getCityInfo(currentScenic.value.lng + ',' + currentScenic.value.lat).then((res) => {
      locationInfo.value = res.data.regeocode
      console.log('%c [ 位置信息 ]-63', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    })
  }
  // ------------------------------临时景点数据----------------------------
  const tempScenic = ref({})

  // ---------------------------初始数据-----------------------------------
  async function initData() {
    await getLanguageList()
    await getCurrentScenic()
    getSliderImages()
    getProgramTree()
    getWeatherInfo()
  }

  return {
    extConfig,
    programTree,

    initData,
    setTabbar,
    isLoading,

    tempScenic,

    language,
    languageList,

    setLanguage,

    currentScenic,

    sliderImages,
    getMenu,
    weatherInfo,
    locationInfo,
  }
})
