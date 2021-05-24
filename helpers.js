module.exports = {
  admin: (user) => {
    return user === process.env.ADMIN;
  },
  alphabetEmoji: '🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿'.split(' '),
  capitalize: (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  version: process.env.npm_package_version || '(Development)',
}