import http from './request'

export function getWeather(name) {
  return http.get(`https://weather.cleartv.cn/weather/weather_all?city=${name}`)
}
export function getMyWeather(time, location) {
  return http.get(
    `https://api.qweather.com/v7/grid-weather/${time}?location=${location}&key=fb71c34f508d4bc48cc78ae6341d2002&lang=zh`
  )
}
// 查询目前位置信息
export function getCityInfo(location) {
  return http.get(
    `https://restapi.amap.com/v3/geocode/regeo?location=${location}&key=4573babc60547c8bb6687b5f7f8c3f9f`
  )
}
