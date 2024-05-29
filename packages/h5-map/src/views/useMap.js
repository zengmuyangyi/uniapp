// @unocss-include
import AMapLoader from '@amap/amap-jsapi-loader'
import { emitter } from '@/utils'
import { getText } from '@/utils'

export default () => {
  let AMap
  const map = shallowRef()

  const myLng = ref(0)
  const myLat = ref(0)

  const initMap = async (data) => {
    const mapInfo = data
    console.log('mapInfo', mapInfo)
    AMap = await AMapLoader.load({
      key: '0adb66125c475caaf9aacd3c67ca3280', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.MoveAnimation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })

    AMap.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: false,
        offset: [10, 20],
      })
      geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {
          // onComplete(result)
          myLng.value = result.position.lng
          myLat.value = result.position.lat
          console.log('location', result)
        } else {
          console.log('获取定位失败')
          // onError(result)
        }
      })
    })

    const mapOptions = {}

    if (mapInfo.minZoom && mapInfo.maxZoom) {
      mapOptions.zooms = [mapInfo.minZoom, mapInfo.maxZoom]
    }

    if (mapInfo.initZoom) {
      mapOptions.zoom = 13 || mapInfo.initZoom
    }

    if (mapInfo.centerLng && mapInfo.centerLat) {
      mapOptions.center = [mapInfo.centerLng, mapInfo.centerLat]
    }

    map.value = new AMap.Map('container', mapOptions)

    if (mapInfo.mapPath) {
      if (mapInfo.isLimitRange) {
        mapInfo.rightTop = mapInfo.rightTop.split(',')
        mapInfo.leftBottom = mapInfo.leftBottom.split(',')
        // 设置地图边界
        setLimit(
          { lng: mapInfo.rightTop[0], lat: mapInfo.rightTop[1] },
          { lng: mapInfo.leftBottom[0], lat: mapInfo.leftBottom[1] }
        )
      }

      if (mapInfo.bgColor) {
        // 地图背景色
        addBgLayer(mapInfo)
        // 不加载高德地图图层
        map.value.setFeatures([])
      }

      // 自定义手绘地图
      addDrawImageLayer(mapInfo)
    }

    // addHelperMarker()

    map.value.on('click', () => {
      emitter.emit('map:click')
    })
  }
  // 手绘地图
  function addDrawImageLayer(data) {
    const flexibleLayer = new AMap.TileLayer.Flexible({
      zIndex: 100,
      // eslint-disable-next-line max-params
      createTile: function (x, y, z, success, fail) {
        const img = document.createElement('img')
        img.onload = function () {
          success(img)
        }
        img.crossOrigin = 'anonymous' //3D 的时候添加，同时图片要有跨域头
        img.onerror = function () {
          fail()
        }

        img.src = data.mapPath + z + '/' + x + '_' + y + '.png'
      },
      cacheSize: 100, // 内存中缓存的切片的数量上限
      // zIndex: 2,
      zooms: [data.minZoom ? data.minZoom : 15, data.maxZoom ? data.maxZoom : 18], // 设置可见级别，[最小级别，最大级别]
    })

    map.value.add(flexibleLayer)
  }

  function addBgLayer(data = '#fff') {
    const layer = new AMap.TileLayer.Flexible({
      cacheSize: 300,
      zooms: [data.minZoom ? data.minZoom : 15, data.maxZoom ? data.maxZoom : 18], // 设置可见级别，[最小级别，最大级别]
      // eslint-disable-next-line max-params
      createTile: function (x, y, z, success, fail) {
        const c = document.createElement('canvas')
        c.width = c.height = 256

        const cxt = c.getContext('2d')
        cxt.fillStyle = data.bgColor
        cxt.fillRect(0, 0, 256, 256)

        // 通知API切片创建完成
        success(c)
      },
    })

    map.value.add(layer)
  }

  // 限制移动范围
  function setLimit(southWest, northEast) {
    const { lng: a1, lat: b1 } = southWest
    const { lng: a2, lat: b2 } = northEast
    const bounds = new AMap.Bounds(new AMap.LngLat(a1, b1), new AMap.LngLat(a2, b2))

    map.value.setLimitBounds(bounds)
  }

  function getMarkerObject({ lng, lat, icon, bg, text, title }) {
    const markerContent =
      `
    <div class="relative">
    <div
      style="background: ${bg || '#3b82f6'}"
      class="w-30px h-30px bg-blue-500 -rotate-135 rounded-[0_50%_50%_50%] border-2 border-white"
    ></div>` +
      (icon
        ? `<img
      src="${icon}"
      class="w-80% h-auto absolute top-2px left-50% -translate-x-50%"
    />`
        : '') +
      (text
        ? `<span class="absolute top-2px left-50% -translate-x-50% text-white text-20">${text}</span>`
        : '') +
      `
  </div>
      `

    const marker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
      // 将 html 传给 content
      content: markerContent,
      // 以 icon 的 [center bottom] 为原点
      offset: new AMap.Pixel(-18, -38),
    })

    title &&
      marker.setLabel({
        direction: 'bottom',
        offset: new AMap.Pixel(0, 8), //设置文本标注偏移量
        content: `<div class='bg-black bg-opacity-60 text-white rounded-5 p-2 border border-white'>${title}</div>`,
      })

    return marker
  }

  // 添加景点标注
  function addMarkers(data) {
    console.log('%c [ data ]-130', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    if (!data?.length) return

    const markers = data.map((i) => i && getMarkerObject(i)).filter(Boolean)
    markers.forEach((i, index) => {
      i.typeIndex = data[index].typeIndex
      i.index = data[index].index

      i.scenicInfo = data[index].scenicInfo

      i.on('click', (e) => {
        emitter.emit('markerClick', e.target)

        map.value.setCenter(e.target.getPosition())
      })
    })
    map.value.add(markers)

    return markers
  }

  // 添加标注
  function addMarker({ lat, lng, icon, bg, text }) {
    const marker = getMarkerObject({ lng, lat, icon, bg, text })

    map.value.add(marker)

    return marker
  }

  // 帮助工具标注，确定当前位置的可拖拽标注
  // function addHelperMarker() {
  //   const marker = new AMap.Marker({
  //     position: map.getCenter(),
  //     // 设置是否可以拖拽
  //     draggable: true,
  //     cursor: 'move',
  //     // 设置拖拽效果
  //     raiseOnDrag: true,
  //   })

  //   marker.on('click', (e) => {
  //     console.log('%c [ e ]-107', 'font-size:13px; background:pink; color:#bf2c9f;', e)
  //     uni.navigateTo('/pages/scenic/index')
  //   })

  //   map.value.add(marker)
  // }
  // ------------------------------------轨迹动画---------------------------------------------------
  const drawPath = (lineArr) => {
    console.log('%c [ lineArr ]-169', 'font-size:13px; background:pink; color:#bf2c9f;', lineArr)
    const startPoint = lineArr[0]
    addMarker({ lng: startPoint[0], lat: startPoint[1], text: '起' })

    const endMarker = addMarker({
      lng: startPoint[0],
      lat: startPoint[1],
      text: '终',
      bg: 'red',
    })

    // 绘制轨迹
    const polyline = new AMap.Polyline({
      map: map.value,
      path: lineArr,
      showDir: true,
      strokeColor: '#28F', //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 6, //线宽
      lineJoin: 'round',
      lineCap: 'round',
      // strokeStyle: "solid"  //线样式
    })

    const passedPolyline = new AMap.Polyline({
      map: map.value,
      strokeColor: '#AF5', //线颜色
      strokeWeight: 6, //线宽
    })

    endMarker.on('moving', function (e) {
      passedPolyline.setPath(e.passedPath)
      // map.setCenter(e.target.getPosition(), true)
    })

    setTimeout(() => {
      endMarker.moveAlong(lineArr, {
        // delay: 1000,
        // 每一段的时长
        duration: 200, //可根据实际采集时间间隔设置
        // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
        autoRotation: false,
      })
    }, 1000)

    return polyline
  }

  function clearMap() {
    map.value.clearMap()
  }

  function setCenter({ lng, lat }) {
    map.value.setCenter([lng, lat])
  }

  function setFitView(markers) {
    map.value.setFitView(markers)
  }

  return {
    myLng,
    myLat,
    map,
    initMap,
    addMarker,
    addMarkers,
    drawPath,
    clearMap,
    setCenter,
    setFitView,
  }
}
