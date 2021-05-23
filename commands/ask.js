const { capitalize } = require('../helpers');

module.exports = {
  name: 'ask',
  description: 'Ask a question',
  args: true,
  example: 'should ska music be legal?',
  execute(message, args) {
    message.delete();
    let ask = args.join(' ');
    message.channel.send(capitalize(ask))
      .then(message => {
        message.react('462126280704262144');
        message.react('462126761098870784');
      });
  },
}



