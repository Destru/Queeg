module.exports = {
  name: 'message',
  description: 'Send a message',
  args: true,
  example: '#memes <:frog:845664454557302784>',
  execute(message, args, client) {
    if (message.author.id === process.env.ADMIN) {
      let messageChannel = client.channels.cache.get(args.shift().replace(/\D/g, ''));
      messageChannel.send(args.join(' '));
    } else {
      message.channel.send(config.errorAccess);
    }
  },
};