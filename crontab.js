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

const dailyMeme = async (client, channel) => {
  const reddit = 'https://www.reddit.com'
  const redditImages = 'https://i.redd.it/'
  const memes = []

  const response = await fetch(`${reddit}/r/dankleft/top.json?t=week`)
  const json = await response.json()

  json.data.children.forEach((post) => {
    if (post.data.url && post.data.url.startsWith(redditImages))
      memes.push(post.data.url)
  })

  const random = memes[Math.floor(Math.random() * memes.length)]
  client.channels.cache.get(channel).send(random)
}

const dailyNews = async (client, channel) => {
  const embed = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle(`Last 24 hours`)

  const reddit = 'https://www.reddit.com'
  const redditImages = 'https://i.redd.it/'
  const subreddits = [
    'communism',
    'socialism',
    'marxism',
    'antifascistsofreddit',
    'anarchocommunism',
  ]

  const formatted = (string) => {
    string = string.replaceAll('&amp;', '&')
    if (string.length > 140) return string.substring(0, 140) + '...'
    else return string
  }

  let count = 0
  let postCount = 0
  let posts = []

  subreddits.forEach(async (subreddit) => {
    const response = await fetch(`${reddit}/r/${subreddit}/top.json?t=today`)
    const json = await response.json()

    json.data.children.forEach((post) => {
      if (
        post.data.url &&
        !post.data.url.startsWith(reddit) &&
        !post.data.url.startsWith(redditImages)
      ) {
        if (postCount < 10) {
          posts.push(`[${formatted(post.data.title)}](${post.data.url})`)
          postCount++
        }
      }
    })

    count++
    if (count === subreddits.length) {
      embed.setDescription(posts.join('\n'))
      client.channels.cache.get(channel).send(embed)
    }
  })
}

module.exports = {
  load: (client) => {
    cron.schedule(
      '0 7 * * *',
      () => {
        dailyDeaths(client, channel.graveyard)
        dailyEvents(client, channel.terminal)
        dailyMeme(client, channel.memes)
        dailyPosts(client, channel.chat)
      },
      {
        timezone: 'UTC',
      }
    )
  },
  run: (client) => {
    // dailyDeaths(client, channel.test)
    // dailyEvents(client, channel.test)
    dailyMeme(client, channel.test)
    dailyNews(client, channel.test)
  },
}
