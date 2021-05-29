const Discord = require('discord.js')
const { embedColor } = require('../../config')

module.exports = {
  name: 'ask',
  description: 'Ask a question.',
  args: true,
  example: 'should ska music be legal?',
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(config.embedColor)
      .setDescription(`${args.join(' ')}`)
      .setTitle(`Question`)

    message.delete()
    message.channel.send(embed).then((message) => {
      message.react('462126280704262144')
      message.react('462126761098870784')
    })
  },
}
