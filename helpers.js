module.exports = {
  admin: (user) => {
    return user === process.env.ADMIN;
  },
  alphabetEmoji: '🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿'.split(' '),
  capitalize: (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  days: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
  getRandom: (api, a, n) => {
    let result = new Array(n)
      len = a.length,
      taken = new Array(len)

    if (n > len) n = len

    while (n--) {
      let x = Math.floor(Math.random() * len)

      if (api === 'byabbe') if (!isFinite(a[x].year)) a[x].year = `-${a[x].year.replace(/ BC/, '')}`
      result[n] = a[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }

    if(api === 'byabbe') result.sort((a, b) => a.year - b.year)
    return result
  },
  version: process.env.npm_package_version || '(Development)',
}