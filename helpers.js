const { emoji } = require('./config')

module.exports = {
  alphabetEmoji:
    '🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿'.split(
      ' '
    ),
  hasRole: (user, role) => {
    return user.roles.cache.has(role)
  },
  isAdmin: (user) => {
    return user === process.env.ADMIN
  },
  randomEntries: (a, n, api = false) => {
    let result = new Array(n)
    ;(len = a.length), (taken = new Array(len))

    if (n > len) n = len

    while (n--) {
      let x = Math.floor(Math.random() * len)

      if (api === 'byabbe')
        if (!isFinite(a[x].year)) a[x].year = `-${a[x].year.replace(/ BC/, '')}`
      result[n] = a[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }

    if (api === 'byabbe') result.sort((a, b) => a.year - b.year)
    return result
  },
  randomEmoji: () => {
    const emoji = [
      '<:cscalt:837251418247004205>',
      '<:cscbob:846528128524091422>',
      '<:csc:403256716583632906>',
    ]
    return emoji[Math.floor(Math.random() * emoji.length)]
  },
  version: process.env.npm_package_version || '(Development)',
}
