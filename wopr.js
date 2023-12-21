require('dotenv').config()
const Discord = require('discord.js')
const cron = require('node-cron')
const fetch = require('node-fetch')

const client = new Discord.Client()
const { channel, embedColorBlack } = require('./config')

const dailyReddit = async (client, channel) => {
  const embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setTitle(`Reddit Daily`)

  const reddit = 'https://www.reddit.com'
  const subreddits = ['antifascistsofreddit', 'marxism', 'communism']

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
      if (postCount < 10) {
        posts.push(
          `[${formatted(post.data.title)}](${reddit}${post.data.permalink})`
        )
        postCount++
      } else return
    })
    count++

    if (count === subreddits.length) {
      embed.setDescription(posts.join('\n'))
      client.channels.cache.get(channel).send(embed)
    }
  })
}

client.on('ready', () => {
  console.log('Shall we play a game?')

  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'Global Thermonuclear War',
      type: 'PLAYING',
    },
  })

  cron.schedule(
    '0 7 * * *',
    () => {
      dailyReddit(client, channel.chat)
    },
    {
      timezone: 'UTC',
    }
  )

  client.on('message', (message) => {
    const args = message.content.split(' ')
    const command = args[0].toLowerCase().trim()

    if (command === '!ping') {
      message.channel.send(
        `${Date.now() - message.createdTimestamp}ms / ${Math.round(
          message.client.ws.ping
        )}ms`
      )
    } else if (command === '!dailies') {
      dailyReddit(client, message.channel.id)
    } else if (command === '!dankmeme') {
      const reddit = 'https://www.reddit.com'
      const redditImages = 'https://i.redd.it/'
      const memes = []
      const subreddits = ['dankleft', 'communismmemes']

      let count = 0
      subreddits.forEach(async (subreddit) => {
        const response = await fetch(`${reddit}/r/${subreddit}/top.json?t=day`)
        const json = await response.json()

        json.data.children.forEach((post) => {
          if (post.data.url && post.data.url.startsWith(redditImages))
            memes.push(post.data.url)
        })

        count++
        if (count === subreddits.length) {
          const random = memes[Math.floor(Math.random() * memes.length)]
          message.channel.send(random)
        }
      })
    }
  })
})

client.login(process.env.WOPR_TOKEN)
