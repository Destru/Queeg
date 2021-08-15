const fetch = require('node-fetch')

module.exports = {
  name: 'xkcd',
  description: `Latest comic from XKCD.`,
  execute(message) {
    fetch(`https://xkcd.com/info.0.json`)
      .then((response) => response.json())
      .then((data) => {
        message.channel.send(data.img)
      })
  },
}
