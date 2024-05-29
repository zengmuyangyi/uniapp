const mapUrl =
  'https://pqncdn.cleartv.cn/pres/resources/f50400103f28d021a93850d02270317b_SDbNRPFQ_230618150855.png'

const coverUrl = 'https://pqntourism.pcleartv.cn/FkfnH0kyh9m32QNf7Xf5MBh3eLiP'

export default {
  floors: [
    {
      name: '1F',
      id: 0,
      mapUrl,
      items: [
        {
          id: 1,
          coverUrl,
          top: 82,
          left: 82,
        },
        {
          id: 1,
          coverUrl,
          top: 16.15,
          left: 42.66,
        },
        {
          id: 1,
          coverUrl,
          top: 58.15,
          left: 21.66,
        },
      ],
    },
    {
      name: '2F-1',
      id: 1,
      mapUrl,
      items: [],
    },
    {
      name: '2F-2',
      id: 2,
      mapUrl,
      items: [],
    },
  ],
}
