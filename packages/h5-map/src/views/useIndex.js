// @unocss-include
import useMap from './useMap'
import useMapTX from './useMapTX'
import AMapLoader from '@amap/amap-jsapi-loader'
import {
  fetchMapPOIType,
  fetchMapPOIList,
  fetchMapPath,
  fetchMapList,
  fetchScenic,
  fetchMapPOI,
  fetchMacPOI,
  fetchChildPOI,
} from '@/api/map'
import { getText, parseObject } from '@/utils'
import { useRoute } from 'vue-router'
import { emitter, getDistance } from '@/utils'
import { useApp } from '@/stores'
import { Toast } from 'vant'
import $t from '@/utils/i18n'

export default () => {
  const mapInfo = ref({})
  const {
    map,
    myLng,
    myLat,
    initMap,
    addMarkers,
    drawPath,
    clearMap,
    setCenter,
    setZoom,
    setFitView,
    addMarker,
    addDrawImageLayer,
    setLimit,
    setMarkerCluster,
    easeTo,
    setHeatMap,
  } = useMapTX()

  const checked = ref(false)
  const route = useRoute()
  // ---------------------------------- Tab ------------------------------------------------
  const active = ref(0) // 当前tab索引
  const currentPath = ref(0) // 当前路径索引
  const scenicIndex = ref(0) // 当前景点索引

  const tabs = ref([])
  const typeIdMap = ref({}) // 类型id映射，做数据缓存
  const pathList = ref([])

  // 当前类型标注列表
  const currentData = computed(() => {
    return typeIdMap.value[tabs.value[active.value]?.id] || []
  })

  const currentScenic = ref({})

  // computed(() => {
  //   return typeIdMap.value[tabs.value?.[active.value]?.id]?.[scenicIndex.value]
  // })

  // ---------------------------------数据获取------------------------------------------

  // -------------景区介绍-------------------------------
  const scenicSpot = ref({})
  const scenicList = ref([])
  const getScenic = async () => {
    const res = await fetchScenic()
    console.log('%c [ 景区介绍 ]-01', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    scenicList.value = res.list
    if (route.query.scenicIndex) {
      scenicSpot.value = res.list?.[route.query.scenicIndex]
      return
    }
    scenicSpot.value = res.list[0]
  }

  // -------------地图数据-------------------------------
  const mapList = ref([])
  function getMapInfo() {
    return fetchMapList().then((res) => {
      if (!res.list?.length) {
        Toast({
          message: $t('NoData'),
        })
        return
      }
      if (route.query.mapIndex) {
        mapInfo.value = res.list?.[route.query.mapIndex]
        return
      }
      if (res.list?.[0].menuId) {
        mapInfo.value = res.list.find((item) => item.menuId === 2)
      } else {
        mapInfo.value = res.list?.[0]
      }
      res.list.forEach((item, index) => {
        item.scenicSpot = scenicList.value[index]
      })
      mapList.value = res.list
    })
  }

  async function getTypeList() {
    const res = await fetchMapPOIType()
    console.log('%c [ 类型列表 ]-75', 'font-size:13px; background:pink; color:#bf2c9f;', res.list)

    tabs.value = res.list
  }

  async function getPOIList({ typeId, name, typeIndex }) {
    const res = await fetchMapPOIList({ typeId, name, mapId: mapInfo.value?.id })
    const currentTab = tabs.value[active.value]

    if (typeId) {
      // 为了创建marker时提供些额外数据
      res.list.forEach((item, index) => {
        item.bg = currentTab.color
        item.icon = currentTab.icon
        item.typeId = typeId
        item.typeIndex = typeIndex
        item.index = index
        item.title = getText(item.name)

        item.scenicInfo = JSON.parse(JSON.stringify(item))
      })

      typeIdMap.value[typeId] = res.list
    }

    return res.list
  }

  async function getMapPath() {
    const res = await fetchMapPath()
    res.list.forEach((point) => {
      point.poi = point.poi || []
      point.poi?.forEach((item) => {
        if (!item) return
        parseObject(item)

        item.title = getText(item.name)
        item.scenicInfo = JSON.parse(JSON.stringify(item))
      })

      parseObject(point.templateMapRoute)
    })
    pathList.value = res.list
    console.log('%c [ 路线列表 ]-52', 'font-size:13px; background:pink; color:#bf2c9f;', res.list)
  }

  //  -------------------------------------初始化标注-------------------------------
  const currentView = ref('tabPoints') // 标签对应景点标注

  const showSinglePoint = async (id) => {
    const res = await fetchMapPOI(id)
    currentScenic.value = res
    tabs.value.forEach((item, index) => {
      if (item.id === res.typeId) {
        active.value = index
      }
    })
    if (!typeIdMap.value[tabs.value[active.value]?.id]) {
      await getPOIList({ typeId: tabs.value[active.value].id, typeIndex: active.value })
    }
    console.log('&&&', res)
  }

  const showPoint = async (mac) => {
    const params = {
      pageSize: 0,
      pageNum: 0,
      status: 1,
      bluetoothMac: mac,
    }
    const res = await fetchMacPOI(params)
    if (res.total) {
      const child = await fetchChildPOI({
        pageNum: 0,
        pageSize: 0,
        status: 1,
        parentId: res.list[0].id,
      })
      res.list[0]['childList'] = child.list
    }
    currentScenic.value = res.list[0]
    tabs.value.forEach((item, index) => {
      if (item.id === res.typeId) {
        active.value = index
      }
    })
    if (!typeIdMap.value[tabs.value[active.value]?.id]) {
      await getPOIList({ typeId: tabs.value[active.value]?.id, typeIndex: active.value })
    }
    showTabPoints()
    if (!currentScenic.value) {
      Toast({
        message: $t('NoScenic'),
        position: 'middle',
      })
    } else {
      const { lng, lat } = currentScenic.value
      setCenter({ lng, lat })
      showInfo('scenic')
    }
  }
  const showView = async () => {
    switch (true) {
      case !!route.query.scenic:
        currentView.value = 'singlePoint'
        break
      case !!route.query.path:
        currentView.value = 'drawPath'
        break
      default:
        currentView.value = 'tabPoints'
    }

    // ----------根据路由设置各索引值-----------------
    active.value = route.query.index ? route.query.index - 0 : 0
    // 路线索引
    currentPath.value = route.query.path ? route.query.path - 0 : 0
    // 景点索引
    const scenic = route.query.scenic ? route.query.scenic - 0 : 0

    await showSinglePoint(scenic)
    // currentScenic.value = typeIdMap.value[tabs.value?.[0]?.id]?.find((i) => i.id === scenic)

    clearMap()
    switch (currentView.value) {
      case 'singlePoint':
        {
          if (!currentScenic.value) return
          showTabPoints()
          // const [longitude, latitude] = target
          // const marker = addMarker({ longitude, latitude })

          // setFitView(marker)

          const { lng, lat } = currentScenic.value
          setCenter({ lng, lat })
          showInfo('scenic')
        }
        break
      case 'drawPath':
        {
          drawUserPath()
          showInfo('path')
        }
        break
      default:
        hideInfo()
        showTabPoints()
        break
    }
  }

  //---------------------------------弹出层--------------------------------------------------------
  const pathInfoVisible = ref(false)
  const scenicInfoVisible = ref(false)
  const introductionVisible = ref(false)

  const showInfo = async (type) => {
    hideInfo()
    switch (type) {
      case 'scenic':
        scenicInfoVisible.value = true
        console.log('***', scenicInfoVisible.value)
        break
      case 'path':
        pathInfoVisible.value = true
        break
      case 'introduction':
        introductionVisible.value = true
        break
      default:
        break
    }
  }

  const hideInfo = () => {
    scenicInfoVisible.value = false
    pathInfoVisible.value = false
    introductionVisible.value = false
  }

  const currentIntroduction = ref({})
  const toggleIntroduction = (data) => {
    introductionVisible.value = !introductionVisible.value
    scenicInfoVisible.value = false
    pathInfoVisible.value = false
    console.log('@@@', data)
    currentIntroduction.value = data
  }
  // ---------------------------------用户操作--------------------------------------------
  // 绘制路线及标注
  const drawUserPath = () => {
    clearMap()

    const pathInfo = pathList.value[currentPath.value]
    console.log('%c [ pathInfo ]-139', 'font-size:13px; background:pink; color:#bf2c9f;', pathInfo)
    let markers = []
    let line = null

    // 景点图标和颜色从第一分类获取
    if (pathInfo.poi && pathInfo.poi?.length) {
      const currentTab = tabs.value[0]
      console.log(
        '%c [ currentTab ]-185',
        'font-size:13px; background:pink; color:#bf2c9f;',
        currentTab
      )
      pathInfo.poi = pathInfo.poi || []

      pathInfo.poi.forEach((item) => {
        if (!item) return
        item.bg = currentTab.color
        item.icon = currentTab.icon
      })

      markers = addMarkers(pathInfo.poi)
    }

    if (pathInfo.templateMapRoute.pointsLngLat && pathInfo.templateMapRoute.pointsLngLat?.length) {
      line = drawPath(pathInfo.templateMapRoute.pointsLngLat)
    }

    if (markers?.length && line) {
      setFitView([line, ...markers])
    } else if (markers?.length) {
      setFitView(markers)
      // setMarkerCluster(currentData.value)
    } else if (line) {
      setFitView(line)
    }
  }

  // 显示分类标注
  const showTabPoints = async () => {
    if (!typeIdMap.value[tabs.value[active.value]?.id]) {
      await getPOIList({ typeId: tabs.value[active.value].id, typeIndex: active.value })
    }

    hideInfo()
    clearMap()
    initFirst()

    if (route.query.cluster && JSON.parse(route.query.cluster)) {
      setMarkerCluster(currentData.value)
    } else {
      const markers = addMarkers(currentData.value)
      setFitView(markers)
    }
  }

  const handlePathChange = (e) => {
    currentPath.value = e
    console.log('%c [ e ]-151', 'font-size:13px; background:pink; color:#bf2c9f;', e)

    drawUserPath()
  }

  const togglePath = () => {
    scenicInfoVisible.value = false
    pathInfoVisible.value = !pathInfoVisible.value

    if (pathInfoVisible.value) {
      drawUserPath()
    } else {
      showTabPoints()
    }
  }

  emitter.on('markerClick', async (e) => {
    if (e.title === '我的位置') return
    console.log('%c [ 标注点击 ]-204', 'font-size:13px; background:pink; color:#bf2c9f;', e)
    scenicIndex.value = e.index
    showInfo('scenic')
    const res = await fetchChildPOI({
      pageNum: 0,
      pageSize: 0,
      status: 1,
      parentId: e.scenicInfo.id,
    })
    e.scenicInfo.childList = res.list
    currentScenic.value = e.scenicInfo
    console.log(
      '%c [ 标注点击 ]-231',
      'font-size:13px; background:pink; color:#bf2c9f;',
      currentScenic.value
    )
  })
  emitter.on('clickClusterBubble', (e) => {
    console.log('%c [ 聚合点击 ]-213', 'font-size:13px; background:red; color:#bf2c9f;', e)
    e.zoom = mapInfo.value?.maxZoom || 15
    easeTo(e)
  })

  const indoorClick = async (id) => {
    const res = await fetchMapPOI(id)
    currentScenic.value = res
  }

  // 地图点击时，隐藏弹出层
  emitter.on('map:click', () => {
    hideInfo()
  })

  const store = useApp()
  const language = computed(() => {
    return store.state.language
  })
  // ------------------------------------添加我的位置--------------------------
  const myLocation = ref({ latitude: 0, longitude: 0 })
  const scenicLocation = ref({ latitude: 0, longitude: 0 })
  const isFirst = ref(true)
  let AMap
  const initFirst = () => {
    isFirst.value = true
  }
  async function getLocation() {
    if (!AMap) {
      AMap = await AMapLoader.load({
        key: '8468b11206bc9d710ce43a9e033a5fcf', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.MoveAnimation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
    }
    AMap.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        offset: [10, 20],
      })
      geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {
          myLocation.value.latitude = result.position.lat
          myLocation.value.longitude = result.position.lng
          scenicLocation.value.latitude = mapInfo.value.centerLat
          scenicLocation.value.longitude = mapInfo.value.centerLng
          if (mapInfo.value.isLimitRange) {
            const leftBottom = mapInfo.value.leftBottom.split(',')
            const rightTop = mapInfo.value.rightTop.split(',')
            if (
              myLocation.value.longitude > leftBottom[0] &&
              myLocation.value.longitude < rightTop[0] &&
              myLocation.value.latitude > leftBottom[1] &&
              myLocation.value.latitude < rightTop[1]
            ) {
              console.log('&&&&&', leftBottom, rightTop)
              clearMap()
              const myMarker = {
                lng: myLocation.value.longitude,
                lat: myLocation.value.latitude,
                title: '我的位置',
                bg: 'red',
              }
              const tempData = JSON.parse(JSON.stringify(currentData.value))
              tempData.push(myMarker)
              const markers = addMarkers(tempData)
              if (isFirst.value) {
                setCenter({ lng: myLocation.value.longitude, lat: myLocation.value.latitude })
                setZoom(mapInfo.value?.maxZoom || 16)
              }
              isFirst.value = false
              console.log('%%%', markers)
            } else {
              Toast({
                message: $t('OutScenic'),
                position: 'middle',
              })
            }
          } else {
            const dis = getDistance(myLocation.value, scenicLocation.value)
            if (dis > 10000) {
              Toast({
                message: $t('OutScenic'),
                position: 'middle',
              })
            } else {
              clearMap()
              const myMarker = {
                lng: myLocation.value.longitude,
                lat: myLocation.value.latitude,
                title: $t('MyPlace'),
                bg: 'red',
              }
              const tempData = JSON.parse(JSON.stringify(currentData.value))
              tempData.push(myMarker)
              const markers = addMarkers(tempData)
              if (isFirst.value) {
                setCenter({ lng: myLocation.value.longitude, lat: myLocation.value.latitude })
                setZoom(mapInfo.value?.maxZoom || 16)
              }
              isFirst.value = false
              console.log('%%%', markers)
            }
          }
          console.log('location', result)
        } else {
          Toast({
            message: $t('FailGetLocation'),
            position: 'middle',
          })
          console.log('获取定位失败')
        }
      })
    })
    // const geolocation = new qq.maps.Geolocation('7DUBZ-A5OW7-WXJXQ-H6PGV-BDUWS-ZCBGI', '地图工具')
    // console.log(
    //   '%c [ geolocation ]-81',
    //   'font-size:13px; background:pink; color:#bf2c9f;',
    //   geolocation
    // )
    // geolocation.getLocation(
    //   (res) => {
    //     //
    //     myLocation.value.latitude = res.lat
    //     myLocation.value.longitude = res.lng
    //     scenicLocation.value.latitude = mapInfo.value.centerLat
    //     scenicLocation.value.longitude = mapInfo.value.centerLng
    //     if (mapInfo.value.isLimitRange) {
    //       const leftBottom = mapInfo.value.leftBottom.split(',')
    //       const rightTop = mapInfo.value.rightTop.split(',')
    //       if (
    //         res.lng > leftBottom[0] &&
    //         res.lng < rightTop[0] &&
    //         res.lat > leftBottom[1] &&
    //         res.lat < rightTop[1]
    //       ) {
    //         console.log('&&&&&', leftBottom, rightTop)
    //         clearMap()
    //         const myMarker = {
    //           lng: myLocation.value.longitude,
    //           lat: myLocation.value.latitude,
    //           title: '我的位置',
    //           bg: 'red',
    //         }
    //         const tempData = JSON.parse(JSON.stringify(currentData.value))
    //         tempData.push(myMarker)
    //         const markers = addMarkers(tempData)
    //         setCenter({ lng: myLocation.value.longitude, lat: myLocation.value.latitude })
    //         if (isFirst.value) {
    //           setZoom(mapInfo.value?.maxZoom || 16)
    //         }
    //         isFirst.value = false
    //         console.log('%%%', markers)
    //       } else {
    //         Toast({
    //           message: '不在景区范围',
    //           position: 'middle',
    //         })
    //       }
    //     } else {
    //       const dis = getDistance(myLocation.value, scenicLocation.value)
    //       if (dis > 10000) {
    //         Toast({
    //           message: '不在景区范围',
    //           position: 'middle',
    //         })
    //       } else {
    //         clearMap()
    //         const myMarker = {
    //           lng: myLocation.value.longitude,
    //           lat: myLocation.value.latitude,
    //           title: '我的位置',
    //           bg: 'red',
    //         }
    //         const tempData = JSON.parse(JSON.stringify(currentData.value))
    //         tempData.push(myMarker)
    //         const markers = addMarkers(tempData)
    //         setCenter({ lng: myLocation.value.longitude, lat: myLocation.value.latitude })
    //         if (isFirst.value) {
    //           setZoom(mapInfo.value?.maxZoom || 16)
    //         }
    //         isFirst.value = false
    //         console.log('%%%', markers)
    //       }
    //     }
    //   },
    //   (err) => {
    //     Toast({
    //       message: '获取位置失败',
    //       position: 'middle',
    //     })
    //     console.log('err', err)
    //   }
    // )
  }
  // ---------------------------------切换地图-------------------------
  const switchMap = async (item) => {
    typeIdMap.value = {}
    mapInfo.value = item
    document.title = getText(mapInfo.value.name)
    setLimit(mapInfo.value)
    console.log('&&&&&&&&', item)
    clearMap()
    await addDrawImageLayer(mapInfo.value)
    await getPOIList({ typeId: tabs.value[active.value].id, typeIndex: active.value })
    scenicSpot.value = item.scenicSpot
    showView()
  }
  watch(route, () => {
    // 地图标注中英文无法实时切换，通过页面刷新来实现
    if (language !== route.query.language) {
      window.location.reload()
      store.setLanguage(route.query.language)
    }
    showView()
  })

  onMounted(async () => {
    store.setLanguage(route.query.language || 'cn')

    await getScenic()

    await getMapInfo()

    document.title = getText(mapInfo.value.name)

    await initMap(mapInfo.value, route.query.project)

    await getTypeList()

    await getPOIList({ typeId: tabs.value[0].id, typeIndex: 0, status: 1 })

    await getMapPath()

    if (Number(route.query.heat)) {
      checked.value = true
      await setHeatMap(checked.value)
    }

    showView()
  })

  return {
    active,
    tabs,
    pathList,
    currentScenic,
    currentPath,
    scenicSpot,
    myLng,
    myLat,
    checked,

    getText,

    pathInfoVisible,
    scenicInfoVisible,
    introductionVisible,

    togglePath,
    addMarkers,
    showTabPoints,
    handlePathChange,
    toggleIntroduction,
    currentIntroduction,
    mapInfo,
    getLocation,
    showPoint,
    indoorClick,
    initFirst,
    mapList,
    switchMap,
    setHeatMap,
  }
}
