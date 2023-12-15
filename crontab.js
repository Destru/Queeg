const Discord = require('discord.js')
const cron = require('node-cron')
const fetch = require('node-fetch')
const ordinal = require('ordinal/indicator')

const { channel, embedColor, embedColorBlack } = require('./config')
const { randomEntries } = require('./helpers')

const dailyDeaths = (client, channel) => {
  const now = new Date()

  fetch(
    `https://byabbe.se/on-this-day/${
      now.getMonth() + 1
    }/${now.getDate()}/deaths.json`
  )
    .then((response) => response.json())
    .then((data) => {
      const deaths = randomEntries(data.deaths, 15, 'byabbe')
      const embed = new Discord.MessageEmbed()
        .setColor(embedColorBlack)
        .setTitle(`Deaths ${data.date}${ordinal(now.getDate())}`)

      deaths.forEach((death) => {
        const description = death.description.replace('[[', '') // bad data :(
        const link = death.wikipedia[0].wikipedia
        let year = death.year
        if (year.match(/\-/)) year = `${year.replace('-', '')} BC`
        embed.addField(year, `[${description}](${link})`, true)
      })

      client.channels.cache.get(channel).send(embed)
    })
}

const dailyEvents = (client, channel) => {
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
        .setTitle(`Events ${data.date}${ordinal(now.getDate())}`)

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

      client.channels.cache.get(channel).send(embed)
    })
}

const dailyGiphy = async (client, channel) => {
  const key = process.env.GIPHY_TOKEN
  const api = 'https://api.giphy.com/v1/gifs/'
  const today = new Date().toLocaleString('en-us', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const tag = encodeURI(today)

  const response = await fetch(`${api}random?api_key=${key}&tag=${tag}`)
  const data = await response.json()

  client.channels.cache
    .get(channel)
    .send(data.data.embed_url)
    .then((message) => {
      message.react('👍')
      message.react('👎')
    })
}

module.exports = {
  load: (client) => {
    cron.schedule(
      '0 8 * * *',
      () => {
        dailyDeaths(client, channel.graveyard)
        dailyEvents(client, channel.chat)
        dailyGiphy(client, channel.terminal)
      },
      {
        timezone: 'Europe/Oslo',
      }
    )
  },
  run: (client) => {
    dailyDeaths(client, channel.test)
    dailyEvents(client, channel.test)
    dailyGiphy(client, channel.test)
  },
}
