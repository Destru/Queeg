const config = require('../config')
const { isAdmin } = require('../helpers')

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

    if (command.restricted === 'admin' && !isAdmin(message.author.id))
      return message.channel.send(config.error.access)

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
