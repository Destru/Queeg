const config = require('../config')
const { hasRole, isAdmin } = require('../helpers')

module.exports = {
  name: 'message',
  execute(message, client) {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const commandInput = args.shift().toLowerCase()
    const command =
      client.commands.get(commandInput) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandInput)
      )

    if (!command) return

    if (command.restricted) {
      let authorized = false
      let error = config.error.access

      switch (command.restricted) {
        case 'admin':
          if (isAdmin(message.member.id)) authorized = true
          break
        case 'operator':
          error = config.error.operator
          if (hasRole(message.member, config.role.operator)) authorized = true
          break
        case 'voter':
          error = config.error.voter
          if (hasRole(message.member, config.role.voter)) authorized = true
      }
      if (!authorized) return message.channel.send(error)
    }

    if (command.args && !args.length) {
      let error = config.error.args
      if (command.example)
        error += `\nE.g. \`${config.prefix}${command.name} ${command.example}\``
      return message.channel.send(error)
    }

    try {
      command.execute(message, args)
    } catch (error) {
      console.error(error)
      message.channel.send(config.error.execute)
    }
  },
}
