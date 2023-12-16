const { error, prefix, role } = require('../config')
const { hasRole } = require('../helpers')

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
      let errorMessage = error.access

      switch (command.restricted) {
        case 'admin':
          if (hasRole(message.member, role.admin)) authorized = true
          break
        case 'voter':
          errorMessage = error.voter
          if (hasRole(message.member, role.voter)) authorized = true
      }
      if (!authorized) return message.channel.send(errorMessage)
    }

    if (command.args && !args.length) {
      let errorMessage = error.args

      if (command.example)
        errorMessage = `See \`${prefix}command ${command.name}\` for more information.`
      return message.channel.send(errorMessage)
    }

    try {
      command.execute(message, args)
    } catch (e) {
      console.error(e)
      message.channel.send(error.execute)
    }
  },
}
