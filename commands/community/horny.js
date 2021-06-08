const Discord = require('discord.js')
const { embedColor } = require('../../config')
const { randomEmoji } = require('../../helpers')

module.exports = {
  name: 'horny',
  description: `I'm so horny, uwu :tongue: :eggplant:`,
  restricted: 'voter',
  execute(message) {
    message.member.roles.add('841071539645579325')
    message.channel.send(`Bonk!`)
  },
}
