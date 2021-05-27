const Discord = require('discord.js')
const config = require('../config')
const fetch = require('node-fetch')

module.exports = {
  name: 'drink',
  description: 'Have a drink.',
  restricted: 'Voters',
  args: false,
  execute(message, args, client) {
    if (message.member.roles.cache.has(config.roles.voted)) {
      const embed = new Discord.MessageEmbed().setColor('#ffff00')

      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
          const drink = data.drinks[0]
          embed
            .setTitle(drink.strDrink)
            .setDescription(`Enjoy your drink, comrade ${message.member}`)
            .setImage(drink.strDrinkThumb)
            .addField('Category', drink.strCategory, true)
            .addField('Glass', drink.strGlass, true)
          if (drink.strIBA) embed.addField('IBA', drink.strIBA, true)
          message.channel.send(embed)
        })
    } else {
      message.channel.send(config.error.vote)
    }
  },
}