const Discord = require('discord.js')
const { capitalize } = require('../helpers')

module.exports = {
  name: 'ask',
  description: 'Ask a question.',
  args: true,
  example: 'should ska music be legal?',
  execute(message, args) {
    message.delete()
    let ask = capitalize(args.join(' '))
    const embed = new Discord.MessageEmbed().setColor('#ffff00')
      .setTitle(ask)

    message.channel.send(embed)
      .then(message => {
        message.react('462126280704262144')
        message.react('462126761098870784')
      })
  },
}



