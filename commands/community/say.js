module.exports = {
  name: 'say',
  description: 'Send a message.',
  args: true,
  private: true,
  restricted: 'admin',
  example: `#admin ping`,
  execute(message, args) {
    let messageChannel = message.channel

    if (args[0].match(/<#\d+>/)) {
      messageChannel = message.client.channels.cache.get(
        args.shift().replace(/\D/g, '')
      )
    }

    messageChannel.send(args.join(' '))
  },
}
