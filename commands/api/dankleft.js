const { embedColor } = require('../../config')
const fetch = require('node-fetch')

module.exports = {
  name: 'dankleft',
  description: `Random dank meme.`,
  aliases: ['dank', 'meme'],
  async execute(message) {
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
    message.channel.send(random)
  },
}
