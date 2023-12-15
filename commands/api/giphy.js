const fetch = require('node-fetch')

module.exports = {
  name: 'giphy',
  description: `Fetch a random GIPHY. Uses the name of the channel if arguments are omitted.`,
  example: 'hello world',
  async execute(message, args) {
    const api = 'https://api.giphy.com/v1/gifs/'
    const key = process.env.GIPHY_TOKEN

    let rating = message.channel.nsfw ? 'r' : 'pg13'
    let tag = encodeURI(args.join(' '))

    const response = await fetch(
      `${api}random?api_key=${key}&tag=${tag}&rating=${rating}`
    )
    const data = await response.json()

    message.channel.send(data.data.embed_url).then((message) => {
      message.react('👍')
      message.react('👎')
    })
  },
}
