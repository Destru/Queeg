const Discord = require('discord.js')
const { embedColor } = require('../../config')

module.exports = {
  name: 'ask',
  description: 'Ask a yes/no question.',
  alias: 'yesno',
  args: true,
  example: 'TNG > DS9',
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setDescription(`${args.join(' ')}`)
      .setTitle('Yes/No')

    message.delete()
    message.channel.send(embed).then((message) => {
      message.react('👍')
      message.react('👎')
    })
  },
}
