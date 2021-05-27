const Discord = require('discord.js')
const { alphabetEmoji, capitalize } = require('../helpers')

module.exports = {
  name: 'poll',
  description: 'Create a poll.',
  args: true,
  example: 'who are the CSC? | communists | socialists | creatives',
  execute(message, args) {
    let poll = args.join(' ')

    message.delete()
    if (poll.includes('|')) {
      poll = poll.split('|')
      const question = capitalize(poll.shift())
      let description = ''
      poll.forEach((option, i) => {
        description = description + `${alphabetEmoji[i]} ${capitalize(option.trim())}\n`;
      })

      const embed = new Discord.MessageEmbed()
        .setTitle(question)
        .setColor('#ffff00')
        .setDescription(description)

      message.channel.send(embed)
        .then(message => {
          for (let i = 0; i < poll.length; i++) {
            message.react(alphabetEmoji[i])
          }
        })
    } else {
      message.channel.send('Poll malformed.')
    }
  },
}