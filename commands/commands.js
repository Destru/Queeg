const Discord = require('discord.js')
const { prefix } = require('../config')

module.exports = {
    name: 'commands',
    aliases: ['command'],
    description: 'List all commands, or details on a specific command.',
    example: 'ping',
    execute(message, args) {
      const { commands } = message.client

      if(!args.length) {
        message.channel.send(commands.filter(command => !command.private).map(command => `\`${prefix}${command.name}\``).join(', '))
      } else {
        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

        if (!command) return message.channel.send('Invalid command.')

        const embed = new Discord.MessageEmbed()
          .setColor('#ffff00')
          .setTitle(`${prefix}${command.name}`)
          .setDescription(command.description)

        if (command.example) embed.addField(`Example`, `\`${prefix}${command.name} ${command.example}\``)
        if (command.aliases) embed.addField('Aliases', command.aliases.join(', '), true)
        embed.addField('Arguments', command.args ? 'True' : 'False', true)
        if (command.restricted) embed.addField('Restricted', command.restricted, true)

        message.channel.send(embed)
      }
    },
}