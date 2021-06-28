const Discord = require('discord.js')
const { embedColor, prefix } = require('../../config')
const { capitalize, numberEmoji } = require('../../helpers')

module.exports = {
  name: 'poll',
  description: 'Create a poll.',
  args: true,
  example: 'CSC? | Communists | Socialists | Creatives',
  execute(message) {
    if (message.content.includes('|')) {
      let poll = message.content.split('|')
      let question = poll.shift().replace(`${prefix + this.name} `, '')

      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(capitalize(question))
        .setTitle('Poll')

      poll.forEach((option, i) => {
        embed.addField(`${i + 1}.`, capitalize(option.trim()))
      })

      message.channel.send(embed).then((message) => {
        for (let i = 0; i < poll.length; i++) {
          message.react(numberEmoji[i + 1])
        }
      })
    } else {
      message.channel.send('Poll malformed.')
    }
  },
}
