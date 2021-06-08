const { error, prefix, role } = require('../config')
const { hasRole, isAdmin } = require('../helpers')

module.exports = {
  name: 'message',
  execute(message, client) {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandInput = args.shift().toLowerCase()
    const command =
      client.commands.get(commandInput) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandInput)
      )

    if (!command) return

    if (command.restricted) {
      let authorized = false
      let error = error.access

      switch (command.restricted) {
        case 'admin':
          if (isAdmin(message.member.id)) authorized = true
          break
        case 'operator':
          error = error.operator
          if (hasRole(message.member, role.operator)) authorized = true
          break
        case 'voter':
          error = error.voter
          if (hasRole(message.member, role.voter)) authorized = true
      }
      if (!authorized) return message.channel.send(error)
    }

    if (command.args && !args.length) {
      let error = error.args

      if (command.example)
        error = `See \`${prefix}command ${command.name}\` for more information.`
      return message.channel.send(error)
    }

    try {
      command.execute(message, args)
    } catch (error) {
      console.error(error)
      message.channel.send(error.execute)
    }
  },
}
