module.exports = {
  alphabetEmoji:
    '🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿'.split(
      ' '
    ),
  capitalize: (string) => {
    if (typeof string !== 'string') return string
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  hasRole: (user, role) => {
    return user.roles.cache.has(role)
  },
  numberEmoji: '0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣'.split(' '),
  randomEntries: (a, n, api = false) => {
    let addEntry = true
    let result = new Array(n)
    ;(len = a.length), (taken = new Array(len))

    if (n > len) n = len

    while (n--) {
      let x = Math.floor(Math.random() * len)

      if (api === 'byabbe') {
        if (!isFinite(a[x].year)) {
          if (a[x].year.includes('AD')) a[x].year = a[x].year.replace(/AD /, '')
          else a[x].year = `-${a[x].year.replace(/ BC/, '')}`
        }
        if (a[x].description === null) addEntry = false
        else addEntry = true
      }

      if (addEntry) {
        result[n] = a[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
      }
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
  version: process.env.npm_package_version,
}
