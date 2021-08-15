const { embedColor } = require('../../config')
const fetch = require('node-fetch')

module.exports = {
  name: 'dadjoke',
  description: `Pretty sure Talon wrote all of these.`,
  restricted: 'voter',
  execute(message) {
    fetch(`https://icanhazdadjoke.com/slack`)
      .then((response) => response.json())
      .then((data) => {
        message.channel.send(data.attachments[0].text).then((message) => {
          message.react('👍')
          message.react('👎')
        })
      })
  },
}
