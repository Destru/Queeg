const Discord = require('discord.js')
const { embedColor } = require('../../config')
const { randomEmoji } = require('../../helpers')

module.exports = {
  name: 'horny',
  description: `I'm so horny, uwu :tongue: :eggplant:`,
  restricted: 'voter',
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setDescription(
        `It's straight to <#841057992890646609> for you, ${
          message.author
        } ${randomEmoji()}`
      )
      .setTitle('Bonk!')

    message.member.roles.add('841071539645579325')
    message.channel.send(embed)
  },
}
