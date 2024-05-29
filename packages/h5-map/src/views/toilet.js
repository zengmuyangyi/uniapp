const data = [
  {
    category_id: 66,
    latitude: '40.778983',
    name: '卫生间',
    mapid: 8,
    del: 0,
    id: 609,
    poiid: 606,
    longitude: '120.942283',
    status: 1,
  },
  {
    category_id: 66,
    latitude: '40.779746',
    name: '卫生间',
    mapid: 8,
    del: 0,
    id: 608,
    poiid: 605,
    longitude: '120.941779',
    status: 1,
  },
]

data.forEach((i) => {
  i.icon = 'https://yjyoss.oss-cn-shenzhen.aliyuncs.com/image/165951119623564842.svg'
  i.bg = '#90cf5b'
})

export default data
