const Discord = require('discord.js')
const { embedColor } = require('../../config')
const { tiny } = require('./tiny.json')
const tracery = require('tracery-grammar')
const voyage = tracery.createGrammar(tiny)

module.exports = {
  name: 'tiny',
  description: 'Go on a tiny voyage.',
  args: false,
  private: true,
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setDescription(voyage.flatten('#origin#'))

    message.channel.send(embed).then((message) => {
      message.react('👍')
    })
  },
}