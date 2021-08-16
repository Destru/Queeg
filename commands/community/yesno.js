const Discord = require('discord.js')
const { embedColor } = require('../../config')
const { capitalize } = require('../../helpers')

module.exports = {
  name: 'yesno',
  description: 'Ask a yes/no question.',
  aliases: ['ask'],
  args: true,
  example: 'TNG > DS9',
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(capitalize(args.join(' ')))

    message.channel.send(embed).then((message) => {
      message.react('👍')
      message.react('👎')
    })
  },
}
