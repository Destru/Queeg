const config = require('../config');
const drinkEmoji = 'beer tropical_drink wine_glass tumbler_glass cocktail sake coffee'.split(' ');

module.exports = {
  name: 'drink',
  description: 'Have a drink.',
  restricted: 'Voters',
  args: false,
  execute(message, args, client) {
    if (message.member.roles.cache.has(config.roles.voted)) {
      message.channel.send(`Certainly, comrade ${message.member}`);
      message.channel.send(drinkEmoji[Math.floor(Math.random() * drinkEmoji.length)]);
    } else {
      message.channel.send(config.error.vote);
    }
  },
};