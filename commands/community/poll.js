const Discord = require('discord.js')
const { alphabetEmoji, capitalize } = require('../../helpers')
const { embedColor } = require('../../config')

module.exports = {
  name: 'poll',
  description: 'Create a poll.',
  args: true,
  example: 'who are the CSC? | communists | socialists | creatives',
  execute(message, args) {
    if (args.includes('|')) {
      let poll = args.join(' ').split('|')
      let question = poll.shift()

      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(question)
        .setTitle(`Poll`)

      poll.forEach((option, i) => {
        embed.addField(alphabetEmoji[i], option.trim())
      })

      message.delete()
      message.channel.send(embed).then((message) => {
        for (let i = 0; i < poll.length; i++) {
          message.react(alphabetEmoji[i])
        }
      })
    } else {
      message.channel.send('Poll malformed.')
    }
  },
}
