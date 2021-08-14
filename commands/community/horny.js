const fetch = require('node-fetch')
const { role } = require('../../config')

module.exports = {
  name: 'horny',
  description: `I'm so horny, uwu :tongue: :eggplant:`,
  aliases: ['hornyjail', 'horny-jail'],
  restricted: 'voter',
  execute(message) {
    if (!message.member.roles.cache.has(role.sinner)) {
      message.member.roles.add(role.sinner)
      message.channel.send(`It's straight to <#841057992890646609> for you!`)
    }

    fetch(`https://api.waifu.pics/sfw/bonk`)
      .then((response) => response.json())
      .then((data) => {
        message.channel.send(`*bonks ${message.author}*`)
        message.channel.send(data.url)
      })
  },
}
