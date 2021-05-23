const { prefix } = require('../config');

module.exports = {
    name: 'help',
    description: 'List all commands, or details on a specific command.',
    aliases: ['commands'],
    example: '!ping',
    execute(message, args) {
      const data = [];
      const { commands } = message.client;

      if(!args.length) {
        data.push(commands.map(command => `\`${prefix}${command.name}\``).join(', '));
        message.channel.send(data);
      } else {
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) return message.channel.send('Invalid command.');

        data.push(`${prefix}${command.name}`);
        if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
        if (command.description) data.push(`Description: ${command.description}`);
        if (command.example) data.push(`Example: \`${prefix}${command.name} ${command.example}\``);
        if (command.admin) data.push('_Restricted to admins only.');
        message.channel.send(data, { split: true });
      }
    },
};