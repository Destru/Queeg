const fetch = require('node-fetch')

module.exports = {
  name: 'number',
  description: `Random trivia about a number.`,
  args: true,
  example: '42',
  execute(message, args) {
    let number = args[0]

    fetch(`http://numbersapi.com/${number}/trivia?json`)
      .then((response) => response.json())
      .then((data) => {
        message.channel.send(data.text)
      })
  },
}
