import { emitter } from '@/utils'
import { getText } from '@/utils'
import { heatData } from './heat'

export default () => {
  const map = shallowRef()

  const myLng = ref(0)
  const myLat = ref(0)
  const markers = []

  const pathInstance = ref([])
  const project = ref('')
  const clusterBubbleList = ref([])
  const clusterInstance = ref([])
  const heat = ref(null)

  const initMap = async (data, mapProject) => {
    createMap(data)
    // 背景色图层
    addBgLayer(data)
    // 手绘地图层
    addDrawImageLayer(data)
    project.value = mapProject

    if (mapProject === 'huluguzhen') {
      console.log('&&&')
      addHeatMap()
    }
    // 标注
    // addMarkerLayer(data)
    // getLocation()
    // addHelperMarker()
  }

  // function getLocation() {
  //   const geolocation = new qq.maps.Geolocation('7DUBZ-A5OW7-WXJXQ-H6PGV-BDUWS-ZCBGI', '地图工具')
  //   console.log(
  //     '%c [ geolocation ]-81',
  //     'font-size:13px; background:pink; color:#bf2c9f;',
  //     geolocation
  //   )
  // }

  function createMap(data) {
    const mapInfo = data
    console.log('mapInfo', mapInfo)
    const mapOptions = {
      viewMode: '2D',
    }

    if (mapInfo.minZoom && mapInfo.maxZoom) {
      mapOptions.minZoom = mapInfo.minZoom
      mapOptions.maxZoom = mapInfo.maxZoom
    }

    if (mapInfo.initZoom) {
      mapOptions.zoom = mapInfo.initZoom || 16
    }

    if (mapInfo.centerLng && mapInfo.centerLat) {
      mapOptions.center = new TMap.LatLng(mapInfo.centerLat, mapInfo.centerLng)
    }

    if (mapInfo.isLimitRange) {
      // 设置地图边界
      mapOptions.boundary = getBoundary(data)
    }

    map.value = new TMap.Map(document.getElementById('container'), {
      ...mapOptions,
      showControl: false,
      renderOptions: {
        fogOptions: {
          color: data.bgColor || '#fff',
        },
      },
      // baseMap: null,
      // 矢量底图要素类型，通过控制features可以控制矢量底图中不同类型要素的显示与否，目前支持道路及底面（base）、建筑物（building3d）、建筑物平面(building2d)、poi文字（point）、道路文字（label）；若features为非数组则默认为全部显示，若features为空数组不显示任何地物
      baseMap: {
        // 底图设置（参数为：VectorBaseMap对象）
        type: 'vector', // 类型：失量底图
        features: data.bgColor ? [] : ['base', 'label'],
        // 仅渲染：道路及底面(base) + 2d建筑物(building2d)，以达到隐藏文字的效果
      },
      // pitch: 43.5, // 设置俯仰角
      // rotation: 45, // 设置地图旋转角度
    })

    //添加监听事件
    map.value.on('click', function () {
      emitter.emit('map:click')
    })
  }
  // 手绘地图
  function addDrawImageLayer(data) {
    if (data.mapPath) {
      // if (mapInfo.bgColor) {
      //   // 地图背景色
      //   addBgLayer(mapInfo)
      //   // 不加载高德地图图层
      //   // map.value.setFeatures([])
      // }

      // 自定义手绘地图
      new TMap.ImageTileLayer({
        zIndex: 99999,
        getTileUrl(x, y, z) {
          return `${data.mapPath + z}/${x}_${y}.png`
        },
        cacheSize: 100, // 内存中缓存的切片的数量上限
        // zIndex: 2,
        minZoom: data.minZoom || 3, // 设置可见级别，[最小级别，最大级别]
        maxZoom: 20,
        map: map.value,
      })
    }
  }

  // ------------------热力图-----------------
  function addHeatMap() {
    heat.value = new TMap.visualization.Heat({
      max: 350, // 热力最强阈值
      min: 0, // 热力最弱阈值
      height: 0, // 峰值高度
      radius: 30, // 最大辐射半径
    }).addTo(map.value)
  }

  function addBgLayer(data) {
    if (!data.bgColor) return
    const c = document.createElement('canvas')
    c.width = c.height = 256

    const cxt = c.getContext('2d')
    cxt.fillStyle = data.bgColor

    cxt.fillRect(0, 0, 256, 256)

    new TMap.CanvasGroundLayer({
      zIndex: 9999,
      bounds: getBoundary(data),
      canvas: c,
      map: map.value,
    })
  }

  function Marker(options) {
    console.log('%c [ this ]-132', 'font-size:13px; background:pink; color:#bf2c9f;', this)
    TMap.DOMOverlay.call(this, options)
  }

  Marker.prototype = new TMap.DOMOverlay()

  // 初始化
  Marker.prototype.onInit = function (options) {
    this.position = options.position
    this.data = options.data
  }

  // 销毁时需解绑事件监听
  Marker.prototype.onDestroy = function () {
    // this.dom.parentNode.removeChild(this.dom)
    this.dom = null
  }

  // 创建DOM元素，返回一个DOMElement，使用this.dom可以获取到这个元素
  Marker.prototype.createDOM = function () {
    const div = document.createElement('div')
    div.style.position = 'absolute'
    if (
      project.value === 'nalati' ||
      project.value === 'shangyouxian' ||
      project.value === 'dayan'
    ) {
      div.style.left = '5px'
      div.style.top = '5px'
    }
    const { bg, icon, text, title } = this.data
    if (
      project.value === 'nalati' ||
      project.value === 'shangyouxian' ||
      project.value === 'dayan' ||
      project.value === 'fanglanhu' ||
      project.value === 'leifengmuseum'
    ) {
      div.innerHTML = `
      <div class="relative flex flex-col items-center">
        <div class="py-5 px-15 absolute whitespace-nowrap top--120% bg-black rounded-full bg-opacity-70 border-2 border-white text-12 text-white font-500 siyuan_ht">${title}</div>
        <div style="background: ${
          bg || '#65cef2'
        }" class="w-20 h-20 -rotate-135 rounded-[0_50%_50%_50%] border-2 border-transparent relative mt-5px">
          <div class="w-16 h-16 bg-white rotate-135 rounded-full absolute top-50% translate-y--50% left-50% translate-x--50% flex justify-center items-center" style="box-shadow: 0px 1px 2px 0px #4aa7c7">
            <img class="w-16 h-16" src="${icon}" />
          </div>
        </div>
        <div class="mt-10 w-20 h-4 absolute top-100% bg-black bg-opacity-37 rounded-full" style="filter: blur(2px)"></div>
      </div>`
    } else {
      div.innerHTML =
        `
    <div
      style="background: ${bg || '#3b82f6'}"
      class="w-30px h-30px bg-blue-500 -rotate-135 rounded-[0_50%_50%_50%] border-2 border-white"
    ></div>` +
        (icon
          ? `<img
      src="${icon}"
      class="w-80% h-auto absolute top-2px left-50% -translate-x-50%"
    />`
          : '<div class="w-50% h-50% absolute top-30% left-50% -translate-x-50% text-white i-ic-baseline-brightness-1"></div>') +
        (text
          ? `<span class="absolute top-2px left-50% -translate-x-50% text-white text-20">${text}</span>`
          : '') +
        `<div class='bg-black bg-opacity-60 text-white rounded-5 p-2 border border-white absolute whitespace-nowrap left-50% -translate-x-50% translate-y-10px'>${title}</div>`
    }

    // click事件监听
    this.onClick = (e) => {
      // DOMOverlay继承自EventEmitter，可以使用emit触发事件
      this.emit('markerClick')

      emitter.emit('markerClick', this.data)
    }
    // pc端注册click事件，移动端注册touchend事件
    div.addEventListener('click', this.onClick)

    let isDragging = false
    let startX, startY

    div.addEventListener('touchstart', function (event) {
      // 记录起始坐标
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
      // 标记为非拖拽状态
      isDragging = false
    })

    div.addEventListener('touchmove', function (event) {
      // 计算移动距离
      const deltaX = event.touches[0].clientX - startX
      const deltaY = event.touches[0].clientY - startY
      // 判断是否为拖拽事件
      if (deltaX !== 0 || deltaY !== 0) {
        isDragging = true
      }
    })

    const _this = this
    div.addEventListener('touchend', function (event) {
      // 判断是点击事件还是拖拽事件
      if (!isDragging) {
        // 点击事件
        console.log('click')
        event.stopPropagation()

        emitter.emit('markerClick', _this.data)
      } else {
        // 拖拽事件
        console.log('drag')
      }
    })
    return div
  }

  // 更新DOM元素，在地图移动/缩放后执行
  Marker.prototype.updateDOM = function () {
    if (!this.map) {
      return
    }

    // 经纬度坐标转容器像素坐标
    const pixel = this.map.projectToContainer(this.position)

    // 使饼图中心点对齐经纬度坐标点
    const left = pixel.getX() - this.dom.clientWidth / 2 + 'px'
    const top = pixel.getY() - 38 + 'px'
    this.dom.style.transform = `translate(${left}, ${top})`
  }

  // 创建marker对象
  function getMarkerObject(data) {
    const { lng, lat } = data
    const center = new TMap.LatLng(lat, lng)

    const marker = new Marker({
      map: map.value,
      data,
      position: center,
    })

    markers.push(marker)

    return marker
  }
  // 创建聚合对象
  function getMarkerCluster(data) {
    const { lng, lat } = data
    const center = new TMap.LatLng(lat, lng)
    const marker = { position: center, ...data }
    return marker
  }

  // 添加景点标注
  function addMarkers(data) {
    console.log('%c [ data ]-130', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    if (!data?.length) return

    const markers = data.map((i) => i && getMarkerObject(i)).filter(Boolean)

    return markers
  }

  // 添加标注
  function addMarker({ lat, lng, icon, bg, text, title }) {
    const marker = getMarkerObject({ lng, lat, icon, bg, text, title })

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
    const path = lineArr.map((i) => {
      return new TMap.LatLng(i[1], i[0])
    })

    const polylineLayer = new TMap.MultiPolyline({
      zIndex: 2000,
      map: map.value, // 绘制到目标地图
      // 折线样式定义
      styles: {
        style_blue: new TMap.PolylineStyle({
          color: '#28F', // 线填充色
          width: 4, // 折线宽度
          borderWidth: 2, // 边线宽度
          borderColor: '#FFF', // 边线颜色
          lineCap: 'round', // 线端头方式
          showArrow: true,
        }),
        style_green: new TMap.PolylineStyle({
          color: '#AF5', // 线填充色
          width: 4, // 折线宽度
          borderWidth: 2, // 边线宽度
          borderColor: '#FFF', // 边线颜色
          lineCap: 'round', // 线端头方式
          showArrow: true,
        }),
      },
      geometries: [
        {
          id: 'erasePath',
          styleId: 'style_blue',
          paths: path,
        },
      ],
    })
    const marker = new TMap.MultiMarker({
      map: map.value,
      zIndex: 2000,
      styles: {
        car: new TMap.MarkerStyle({
          width: 25,
          height: 35,
          anchor: { x: 16, y: 32 },
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png',
        }),
        start: new TMap.MarkerStyle({
          width: 25,
          height: 35,
          anchor: { x: 16, y: 32 },
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
        }),
        end: new TMap.MarkerStyle({
          width: 25,
          height: 35,
          anchor: { x: 16, y: 32 },
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
        }),
      },
      geometries: [
        {
          id: 'car',
          styleId: 'car',
          position: path[0],
        },
        {
          id: 'start',
          styleId: 'start',
          position: path[0],
        },
        {
          id: 'end2',
          styleId: 'end',
          position: path[path.length - 1],
        },
      ],
    })

    pathInstance.value.push(polylineLayer, marker)

    marker.moveAlong(
      {
        car: {
          path,
          duration: 3000,
        },
      },
      {
        autoRotation: true,
      }
    )

    marker.on('moving', (e) => {
      const passedLatLngs = e.car && e.car.passedLatLngs
      if (passedLatLngs) {
        // 使用路线擦除接口 eraseTo, https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector
        // polylineLayer.eraseTo(
        //   'erasePath',
        //   passedLatLngs.length - 1,
        //   passedLatLngs[passedLatLngs.length - 1]
        // )

        // 移动路线置灰
        polylineLayer.updateGeometries([
          {
            id: 'path2',
            styleId: 'style_green',
            paths: e.car && e.car.passedLatLngs,
          },
        ])
      }
    })
    return lineArr
  }

  function setCenter({ lng, lat }) {
    map.value.setCenter(new TMap.LatLng(lat, lng))
  }
  // ---------------------------平滑过渡----------------
  function easeTo(data) {
    console.log('%%%%', data)
    map.value.easeTo(
      {
        center: new TMap.LatLng(data.lat, data.lng),
        zoom: data.zoom,
      },
      { duration: 2000 }
    )
  }
  function setZoom(zoom) {
    map.value.setZoom(zoom)
  }
  function setLimit(data) {
    map.value.setBoundary(getBoundary(data))
  }
  function clearMap() {
    markers.forEach((i) => {
      i.setMap(null)
      i.destroy()
    })

    pathInstance.value.forEach((i) => {
      i.setMap(null)
      i.destroy()
    })

    pathInstance.value = []
  }

  function getBoundary(data) {
    const rightTop = data.rightTop.split(',').map((i) => Number(i))
    const leftBottom = data.leftBottom.split(',').map((i) => Number(i))

    // 设置地图边界
    return new TMap.LatLngBounds(
      new TMap.LatLng(leftBottom[1], leftBottom[0]),
      new TMap.LatLng(rightTop[1], rightTop[0])
    )
  }

  function setFitView(markers) {
    if (!markers?.length) return
    //假设您有一组坐标点
    const coords = []

    // 子对象全是数组，则是线的集合点
    if (!markers.some((i) => !Array.isArray(i))) {
      markers.forEach((i) => {
        coords.push(new TMap.LatLng(i[1], i[0]))
      })
    } else {
      markers.forEach((i) => {
        if (Array.isArray(i)) {
          i.forEach((j) => {
            coords.push(new TMap.LatLng(j[1], j[0]))
          })
        } else {
          if (!i) return
          const { lng, lat } = i.data
          coords.push(new TMap.LatLng(lat, lng))
        }
      })
    }

    //创建LatLngBounds实例
    const latlngBounds = new TMap.LatLngBounds()
    //将坐标逐一做为参数传入extend方法，latlngBounds会根据传入坐标自动扩展生成
    for (let i = 0; i < coords.length; i++) {
      latlngBounds.extend(coords[i])
    }

    map.value.fitBounds(latlngBounds, {
      padding: 50,
    })
  }

  // ---------------------创建点聚合----------------
  const markerGeometries = ref([])
  const marker = ref([])
  const markerCluster = ref(null)
  function setMarkerCluster(data) {
    // addMarkers(data)
    const tempMarker = data.map((i) => i && getMarkerCluster(i)).filter(Boolean)

    // const markerCluster = new TMap.MarkerCluster({
    //   id: 'cluster', //图层id
    //   map: map.value, //绘制到目标地图
    //   enableDefaultStyle: false, //使用默认样式
    //   minimumClusterSize: 2, //最小聚合点数：2个
    //   geometries: marker, //将所有要打到图中的坐标点传入
    //   zoomOnClick: true, //点击聚合数字放大展开
    //   gridSize: 60, //聚合算法的可聚合距离，即距离小于该值的点会聚合在一起，默认为60，以像素为单位
    //   averageCenter: false, //每个聚和簇的中心是否应该是聚类中所有标记的平均值
    // })
    if (!markerCluster.value) {
      markerCluster.value = new TMap.MarkerCluster({
        id: 'cluster', //图层id
        map: map.value, //绘制到目标地图
        enableDefaultStyle: false, //使用默认样式
        minimumClusterSize: 2, //最小聚合点数：2个
        geometries: tempMarker, //将所有要打到图中的坐标点传入
        zoomOnClick: true, //点击聚合数字放大展开
        gridSize: 60, //聚合算法的可聚合距离，即距离小于该值的点会聚合在一起，默认为60，以像素为单位
        averageCenter: false, //每个聚和簇的中心是否应该是聚类中所有标记的平均值
      })
    } else {
      markerCluster.value.setGeometries(tempMarker)
    }
    // 监听聚合簇变化
    markerCluster.value.on('cluster_changed', (e) => {
      console.log('%%%%%', e)
      marker.value?.forEach((i) => {
        i.setMap(null)
        i.destroy()
      })
      // 销毁旧聚和簇生成的覆盖物
      if (clusterBubbleList.value?.length) {
        clusterBubbleList.value.forEach((item) => {
          item.destroy()
        })
        clusterBubbleList.value = []
      }
      markerGeometries.value = []
      console.log(
        '%c [ item ]-123',
        'font-size:13px; background:red; color:#bf2c9f;',
        markerGeometries
      )
      // 根据新的聚合簇数组生成新的覆盖物和点标记图层
      const clusters = markerCluster.value.getClusters()
      clusters.forEach((item) => {
        if (item.geometries?.length > 1) {
          const clusterBubble = new ClusterBubble({
            map: map.value,
            position: item.center,
            content: item.geometries.length,
          })
          clusterBubble.on('touchend', () => {
            map.value.fitBounds(item.bounds)
          })
          clusterBubbleList.value.push(clusterBubble)
        } else {
          console.log(
            '%c [ item ]-569',
            'font-size:13px; background:blue; color:#bf2c9f;',
            markerGeometries
          )
          if (item.geometries[0]) {
            markerGeometries.value.push(item.geometries[0])
          }
        }
      })

      marker.value = markerGeometries.value.map((i) => i && getMarkerObject(i)).filter(Boolean)
    })
  }
  // 以下代码为基于DOMOverlay实现聚合点气泡
  function ClusterBubble(options) {
    console.log('%c [ this ]-132', 'font-size:13px; background:blue; color:#bf2c9f;', this)
    TMap.DOMOverlay.call(this, options)
  }
  ClusterBubble.prototype = new TMap.DOMOverlay()
  ClusterBubble.prototype.onInit = function (options) {
    this.content = options.content
    this.position = options.position
    this.data = options
  }
  // 销毁时需要删除监听器
  ClusterBubble.prototype.onDestroy = function () {
    this.dom.removeEventListener('clickClusterBubble', this.onClusterClick)
    this.removeAllListeners()
  }
  ClusterBubble.prototype.createDOM = function () {
    const styleProjectList = ['nalati', 'shangyouxian', 'dayan', 'fanglanhu', 'leifengmuseum']
    const div = document.createElement('div')
    div.style.position = 'absolute'
    const { bg } = this.data
    // div.style.width = '30px'
    // div.style.height = '30px'
    if (styleProjectList.includes(project.value)) {
      div.style.left = '5px'
      div.style.top = '5px'
      div.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div style="background: ${
            bg || '#65cef2'
          }" class="w-20 h-20 -rotate-135 rounded-[0_50%_50%_50%] border-2 border-transparent relative mt-5px">
            <div class="w-16 h-16 bg-white rotate-135 rounded-full absolute top-50% translate-y--50% left-50% translate-x--50% flex justify-center items-center" style="box-shadow: 0px 1px 2px 0px #4aa7c7; color: #65cef2">
              ${this.content}
            </div>
          </div>
          <div class="mt-10 w-20 h-4 absolute top-100% bg-black bg-opacity-37 rounded-full" style="filter: blur(2px)"></div>
        </div>`
    } else {
      div.innerHTML = `
    <div
      style="background: ${bg || '#3b82f6'}"
      class="w-30px h-30px bg-blue-500 -rotate-135 text-white rounded-[0_50%_50%_50%] border-2 border-white relative"
    >
    <div class="text-white text-24 absolute top-0 left-50% translate-x--50% rotate-135">${
      this.content
    }</div>
    </div>`
    }
    // 监听点击事件，实现zoomOnClick
    this.onClick = (e) => {
      this.emit('clickClusterBubble', e)
      emitter.emit('clickClusterBubble', e)
    }
    // pc端注册click事件，移动端注册touchend事件
    div.addEventListener('click', this.onClick)
    const _this = this
    div.addEventListener('touchend', function (event) {
      emitter.emit('clickClusterBubble', _this.position)
    })
    return div
  }
  ClusterBubble.prototype.updateDOM = function () {
    if (!this.map) {
      return
    }
    // 经纬度坐标转容器像素坐标
    const pixel = this.map.projectToContainer(this.position)

    // 使文本框中心点对齐经纬度坐标点
    const left = pixel.getX() - this.dom.clientWidth / 2 + 'px'
    const top = pixel.getY() - this.dom.clientHeight / 2 + 'px'
    this.dom.style.transform = `translate(${left}, ${top})`
  }

  const setHeatMap = (data) => {
    console.log('***', heat)
    if (data) {
      heat.value.setData(heatData)
      heat.value.show()
    } else {
      heat.value.hide()
    }
  }
  return {
    myLng,
    myLat,
    map,
    setHeatMap,
    initMap,
    addMarker,
    addMarkers,
    drawPath,

    clearMap,
    setCenter,
    setZoom,
    setFitView,
    addDrawImageLayer,
    getBoundary,
    setLimit,
    setMarkerCluster,
    easeTo,
  }
}
