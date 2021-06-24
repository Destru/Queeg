const Discord = require('discord.js')
const { numberEmoji, capitalize } = require('../../helpers')
const { embedColor } = require('../../config')

module.exports = {
  name: 'poll',
  description: 'Create a poll.',
  args: true,
  example: 'CSC? | Communists | Socialists | Creatives',
  execute(message, args) {
    if (message.content.includes('|')) {
      let poll = message.content.split('|')
      let question = poll.shift().replace('!poll ', '')

      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(question)
        .setTitle('Poll')

      poll.forEach((option, i) => {
        embed.addField(`${i + 1}.`, option.trim())
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
