const Discord = require('discord.js')
const { embedColor, prefix } = require('../../config')
const { capitalize } = require('../../helpers')

module.exports = {
  name: 'commands',
  description: 'List all commands, or details on a specific command.',
  example: 'ping',
  aliases: ['command'],
  private: true,
  execute(message, args) {
    const { commands } = message.client
    const emojiGlitch = message.guild.emojis.cache.find(
      (emoji) => emoji.name == 'cscglitch'
    )
    const glitch = ['dadjoke', 'hackernews', 'number', 'xkcd']

    if (!args.length) {
      let glitches = '',
        community = '',
        voters = ''

      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(`Commands`)

      commands
        .filter((command) => !command.private)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((command) => {
          const commandTemplate = `\`${prefix}${command.name}\`\n`

          if (glitch.includes(command.name)) glitches += commandTemplate
          else if (command.restricted === 'voter') voters += commandTemplate
          else community += commandTemplate
        })

      embed.addField(`Community <:cscalt:837251418247004205>`, community, true)
      embed.addField(`Glitches ${emojiGlitch}`, glitches, true)
      embed.addField(`Voters <:upvote:462126280704262144>`, voters, true)

      message.channel.send(embed)
    } else {
      const name = args[0].toLowerCase()
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name))

      if (!command) return message.channel.send('Invalid command.')

      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(`${capitalize(command.name)}`)
        .setDescription(command.description)

      if (command.example)
        embed.addField(
          `Example`,
          `\`${prefix}${command.name} ${command.example}\``
        )

      if (command.aliases)
        embed.addField('Aliases', command.aliases.join(', '), true)
      embed.addField('Arguments', command.args ? '`true`' : '`false`', true)
      if (command.restricted)
        embed.addField('Restricted', capitalize(command.restricted), true)

      message.channel.send(embed)
    }
  },
}
