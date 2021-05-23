const Discord = require('discord.js');
const { cscLogo, prefix } = require('../config');
const { admin, capitalize, version} = require('../helpers');

module.exports = {
    name: 'commands',
    aliases: ['command'],
    description: 'List all commands, or details on a specific command.',
    example: 'ping',
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

        const embed = new Discord.MessageEmbed()
          .setColor('#ffff00')
          .setTitle(command.description)
          .setFooter(`Queeg ${version}`, cscLogo);

        if (command.aliases) embed.addField('Aliases', command.aliases.join(', '), true);
        if (command.example) embed.setDescription(`E.g. \`${prefix}${command.name} ${command.example}\``);
        embed.addField('Arguments', command.args ? 'True' : 'False', true);
        if (command.admin) embed.addField('Restricted', 'True', true);

        message.channel.send(embed);
      }
    },
};