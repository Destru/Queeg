const Discord = require('discord.js')
const cron = require('node-cron')
const fetch = require('node-fetch')
const ordinal = require('ordinal/indicator')

const { channel, embedColor } = require('./config')
const { randomEntries } = require('./helpers')

const channelDeaths = '832394205422026813'
const channelEvents = '160320676580818951'

const dailyDeaths = (client, channel) => {
  const now = new Date()

  fetch(
    `https://byabbe.se/on-this-day/${
      now.getMonth() + 1
    }/${now.getDate()}/deaths.json`
  )
    .then((response) => response.json())
    .then((data) => {
      const deaths = randomEntries(data.deaths, 24, 'byabbe')
      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(`Deaths ${data.date}${ordinal(now.getDate())}`)

      deaths.forEach((death) => {
        const description = death.description.replace('[[', '') // bad data :(
        const link = death.wikipedia[0].wikipedia
        let year = death.year
        if (year.match(/-/)) year = `${year.replace('-', '')} BC`
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
      const events = randomEntries(data.events, 10, 'byabbe')
      const embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(`Events ${data.date}${ordinal(now.getDate())}`)

      events.forEach((event) => {
        let description = event.description
        let year = event.year
        if (year.match(/-/)) year = `${year.replace('-', '')} BC`

        event.wikipedia.forEach((wiki, i) => {
          let link = `[${wiki.title}](${encodeURI(wiki.wikipedia)})`

          if (i === 0) description += `\n${link}`
          else description += `, ${link}`
        })

        embed.addField(event.year, `${description}`)
      })

      client.channels.cache.get(channel).send(embed)
    })
}

module.exports = {
  load: (client) => {
    cron.schedule(
      '0 8 * * *',
      () => {
        console.log('Running daily tasks.')
        client.channels.cache.get(channel.terminal).send(`Running daily tasks.`)

        dailyDeaths(client, channelDeaths)
        dailyEvents(client, channelEvents)

        setTimeout(() => {
          const api = 'https://api.giphy.com/v1/gifs/'
          const key = process.env.GIPHY_TOKEN
          const tag = encodeURI(`good morning`)

          fetch(`${api}random?api_key=${key}&tag=${tag}`)
            .then((response) => response.json())
            .then((data) => {
              client.channels.cache
                .get(channel.terminal)
                .send(data.data.embed_url)
            })
        }, 5 * 60 * 1000)
      },
      {
        timezone: 'America/Los_Angeles',
      }
    )
  },
  run: (client) => {
    dailyDeaths(client, channel.test)
    dailyEvents(client, channel.test)
  },
}
