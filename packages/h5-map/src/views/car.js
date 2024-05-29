const data = [
  {
    category_id: 67,
    latitude: '40.77997',
    name: '停车场',
    mapid: 8,
    del: 0,
    id: 610,
    poiid: 607,
    longitude: '120.941087',
    status: 1,
  },
  {
    category_id: 67,
    latitude: '40.782021',
    name: '停车场',
    mapid: 8,
    del: 0,
    id: 611,
    poiid: 608,
    longitude: '120.942596',
    status: 1,
  },
]

data.forEach((i) => {
  i.icon = 'https://yjyoss.oss-cn-shenzhen.aliyuncs.com/image/165951220261453962.svg'
  i.bg = '#1e497b'
})

export default data
