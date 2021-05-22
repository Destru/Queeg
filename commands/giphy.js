const fetch = require("node-fetch");

module.exports = {
  name: 'giphy',
  description: 'Look up giphy',
  args: true,
  example: 'hello',
  execute(message, args) {
    let tag = encodeURI(args.join(' '));
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=${tag}&rating=g`)
      .then(response => response.json())
      .then(data => {
        message.channel.send(data.data.embed_url);
      });
  },
};