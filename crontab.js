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
        .setTitle(`${data.date}${ordinal(now.getDate())}`)

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
        .setTitle(`${data.date}${ordinal(now.getDate())}`)

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

const dailyNews = async (client, channel) => {
  const api = 'https://hacker-news.firebaseio.com/v0/'
  const embed = new Discord.MessageEmbed().setColor(embedColor).setTitle(`News`)

  let articleCount = 10,
    links = []

  fetch(`${api}beststories.json`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i <= articleCount - 1; i++) {
        fetch(`${api}item/${data[i]}.json`)
          .then((response) => response.json())
          .then((data) => {
            links.push(`[${data.title}](${data.url})`)
          })
      }

      const poll = setInterval(() => {
        if (links.length === articleCount) {
          clearInterval(poll)

          embed.setDescription(links.join('\n'))
          client.channels.cache.get(channel).send(embed)
        }
      }, 100)
    })
}

module.exports = {
  load: (client) => {
    cron.schedule(
      '0 8 * * *',
      () => {
        dailyDeaths(client, channel.graveyard)
        dailyEvents(client, channel.terminal)
        dailyNews(client, channel.chat)
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
    dailyNews(client, channel.test)
  },
}
