const Discord = require('discord.js')
const { embedColor, prefix } = require('../../config')
const { capitalize, alphabetEmoji } = require('../../helpers')

module.exports = {
  name: 'poll',
  description: 'Create a poll.',
  args: true,
  example: 'CSC? | Communists | Socialists | Creatives',
  execute(message) {
    if (message.content.includes('|')) {
      let description = ''
      let poll = message.content.split('|')
      let question = poll.shift().replace(`${prefix + this.name} `, '')

      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor(embedColor)
        .setTitle(capitalize(question))

      poll.forEach((option, i) => {
        description += `\n${alphabetEmoji[i]} ${capitalize(option.trim())}`
      })

      embed.setDescription(description)

      if (message) message.delete()
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
