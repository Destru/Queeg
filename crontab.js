const Discord = require('discord.js')
const cron = require('node-cron')

const { channel, embedColorBlack } = require('./config')

const healthCheck = (client, channel) => {
  const embed = new Discord.MessageEmbed()
    .setColor(embedColorBlack)
    .setTitle('How was your week?')
    .setDescription('🟢 Great!\n🟡 OK\n🔴 Terrible ')

  client.channels.cache
    .get(channel)
    .send(embed)
    .then((message) => {
      message.react('🟢')
      message.react('🟡')
      message.react('🔴')
    })
}

module.exports = {
  execute: (client) => {
    cron.schedule('0 18 * * 5', () => {
      healthCheck(client, channel.chat)
    })
  },
  test: (client) => {
    healthCheck(client, channel.test)
  },
}
