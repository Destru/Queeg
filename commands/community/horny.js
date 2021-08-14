const fetch = require('node-fetch')
const { role } = require('../../config')

module.exports = {
  name: 'horny',
  description: `I'm so horny, uwu :tongue: :eggplant:`,
  restricted: 'voter',
  execute(message) {
    message.member.roles.add(role.sinner)
    message.channel.send(`*bonks ${message.author}*`)

    fetch(`https://api.waifu.pics/sfw/bonk`)
      .then((response) => response.json())
      .then((data) => {
        message.channel.send(data.url)
      })
  },
}
