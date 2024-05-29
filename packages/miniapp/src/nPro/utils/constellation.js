const data = {
  m1: {
    day: 21,
    left: {
      zh: '摩羯座',
      eng: 'Capricorn',
    },
    right: {
      zh: '水瓶座',
      eng: 'Aquarius',
    },
  },
  m2: {
    day: 20,
    left: {
      zh: '水瓶座',
      eng: 'Aquarius',
    },
    right: {
      zh: '双鱼座',
      eng: 'Pisces',
    },
  },
  m3: {
    day: 21,
    left: {
      zh: '双鱼座',
      eng: 'Pisces',
    },
    right: {
      zh: '白羊座',
      eng: 'Aries',
    },
  },
  m4: {
    day: 21,
    left: {
      zh: '白羊座',
      eng: 'Aries',
    },
    right: {
      zh: '金牛座',
      eng: 'Taurus',
    },
  },
  m5: {
    day: 22,
    left: {
      zh: '金牛座',
      eng: 'Taurus',
    },
    right: {
      zh: '双子座',
      eng: 'Gemini',
    },
  },
  m6: {
    day: 22,
    left: {
      zh: '双子座',
      eng: 'Gemini',
    },
    right: {
      zh: '巨蟹座',
      eng: 'Cancer',
    },
  },
  m7: {
    day: 23,
    left: {
      zh: '巨蟹座',
      eng: 'Cancer',
    },
    right: {
      zh: '狮子座',
      eng: 'Leo',
    },
  },
  m8: {
    day: 24,
    left: {
      zh: '狮子座',
      eng: 'Leo',
    },
    right: {
      zh: '处女座',
      eng: 'Virgo',
    },
  },
  m9: {
    day: 24,
    left: {
      zh: '处女座',
      eng: 'Virgo',
    },
    right: {
      zh: '天秤座',
      eng: 'Libra',
    },
  },
  m10: {
    day: 24,
    left: {
      zh: '天秤座',
      eng: 'Libra',
    },
    right: {
      zh: '天蝎座',
      eng: 'Scorpio',
    },
  },
  m11: {
    day: 23,
    left: {
      zh: '天蝎座',
      eng: 'Scorpio',
    },
    right: {
      zh: '射手座',
      eng: 'Sagittarius',
    },
  },
  m12: {
    day: 22,
    left: {
      zh: '射手座',
      eng: 'Sagittarius',
    },
    right: {
      zh: '摩羯座',
      eng: 'Capricorn',
    },
  },
}

export default function getConstellation(m, d) {
  const mm = data['m' + m]
  if (d >= mm.day) {
    return mm.right
  }
  return mm.left
}
