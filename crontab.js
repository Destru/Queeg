const Discord = require('discord.js')
const cron = require('node-cron')
const fetch = require('node-fetch')
const ordinal = require('ordinal/indicator')

const { channel, embedColorBlack } = require('./config')
const { randomEntries } = require('./helpers')

const healthCheck = (client, channel) => {
  const embed = new Discord.MessageEmbed()
    .setColor(embedColorBlack)
    .setTitle('How was your week, comrade?')

  client.channels.cache
    .get(channel)
    .send(embed)
    .then((message) => {
      message.react('♥️')
      message.react('👍')
      message.react('👎')
      message.react('💀')
    })
}

const dailies = (client, channel) => {
  const now = new Date()

  fetch(
    `https://byabbe.se/on-this-day/${
      now.getMonth() + 1
    }/${now.getDate()}/events.json`
  )
    .then((response) => response.json())
    .then((data) => {
      const events = randomEntries(data.events, 5, 'byabbe')
      const embed = new Discord.MessageEmbed()
        .setColor(embedColorBlack)
        .setTitle(`🗞️ ${data.date}${ordinal(now.getDate())}`)

      events.forEach((event) => {
        let description = event.description
        let year = event.year
        if (year.match(/\-/)) year = `${year.replace('-', '')} BC`

        event.wikipedia.forEach((wiki, i) => {
          let url = wiki.wikipedia
          if (url.match(/\)/)) url = url.replace(')', '\\)')

          let link = `[${wiki.title}](${url})`

          if (i === 0) description += `\n${link}`
          else description += `, ${link}`
        })

        embed.addField(event.year, `${description}`)
      })

      client.channels.cache
        .get(channel)
        .send(embed)
        .then((message) => {
          message.react('👍')
          message.react('👎')
        })
    })
}

module.exports = {
  execute: (client) => {
    cron.schedule('0 10 * * *', () => {
      dailies(client, channel.terminal)
    })
    cron.schedule('0 10 * * 5', () => {
      healthCheck(client, channel.chat)
    })
  },
  test: (client) => {
    healthCheck(client, channel.test)
    dailies(client, channel.test)
  },
}
