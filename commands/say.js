module.exports = {
  name: 'say',
  description: 'Send a message.',
  args: true,
  restricted: 'Admin',
  example: '#memes <:frog:845664454557302784>',
  execute(message, args) {
    message.delete()
    let messageChannel = message.client.channels.cache.get(args.shift().replace(/\D/g, ''))
    messageChannel.send(args.join(' '))
  },
}