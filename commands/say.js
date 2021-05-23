const { admin } = require('../helpers');
const { errorAccess } = require('../config');

module.exports = {
  name: 'say',
  description: 'Send a message.',
  admin: true,
  args: true,
  example: '#memes <:frog:845664454557302784>',
  execute(message, args, client) {
    message.delete();
    let messageChannel = client.channels.cache.get(args.shift().replace(/\D/g, ''));
    messageChannel.send(args.join(' '));
  },
};