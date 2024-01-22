module.exports = {
  name: 'say',
  description: 'Send a message.',
  args: true,
  delete: true,
  private: true,
  restricted: 'admin',
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
