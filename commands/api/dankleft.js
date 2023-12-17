const { embedColor } = require('../../config')
const fetch = require('node-fetch')

module.exports = {
  name: 'dankleft',
  description: `Random communist meme.`,
  aliases: ['dank', 'meme'],
  async execute(message) {
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
  },
}
