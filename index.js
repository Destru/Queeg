require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')

const config = require('./config')
const cron = require('node-cron')
const fetch = require('node-fetch')
const { isAdmin, days, getRandom, version } = require('./helpers')

const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) }})
client.commands = new Discord.Collection()
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commands) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`Queeg ${version} is online.`)
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'Socialist Propaganda',
      type: 'STREAMING',
      url: 'https://twitch.tv/notdestru',
    }
  })
})

cron.schedule('* * * * *', () => {
  const now = new Date()

  fetch(`https://byabbe.se/on-this-day/${now.getMonth()}/${now.getDate()}/deaths.json`)
    .then(response => response.json())
    .then(data => {
      const deaths = getRandom('byabbe', data.deaths, 24)
      const embed = new Discord.MessageEmbed()
        .setColor('#ffff00')
        .setTitle(`Today is ${days[now.getDay()]}, ${data.date}.`)

      deaths.forEach((death, i) => {
        embed.addField(`:headstone: ${death.year}`, `[${death.description}](${death.wikipedia[0].wikipedia})`, true)
      })

      client.channels.cache.get(config.channels.test).send(embed)
    })

  fetch(`https://byabbe.se/on-this-day/${now.getMonth()}/${now.getDate()}/events.json`)
    .then(response => response.json())
    .then(data => {
      const events = getRandom('byabbe', data.events, 5)
      const embed = new Discord.MessageEmbed()
        .setColor('#ffff00')
        .setTitle(`Today is ${days[now.getDay()]}, ${data.date}.`)

      events.forEach(event => {
        let description = event.description

        event.wikipedia.forEach((wiki, i) => {
          let link = `[${wiki.title}](${wiki.wikipedia})`

          if (i === 0) description += `\n:book: ${link}`
          else description += `, ${link}`
        })

        embed.addField(event.year, description)
      })

      client.channels.cache.get(config.channels.test).send(embed)
    })
})

client.on('guildMemberAdd', member => {
  const channelSuspect =  client.channels.cache.get('829418613051359292')
  const channelWelcome = client.channels.cache.get('844871570211995678')

  if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 7) {
    member.roles.add(config.roles.suspect)
    channelWelcome.send(`${member} has been flagged for _Voight-Kampff_.`)
    channelSuspect.send(`Read the _pinned message_ for more information, ${member}`)
  } else {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=welcome+to+the+club&rating=pg13`)
      .then(response => response.json())
      .then(data => {
        channelWelcome.send(data.data.embed_url)
      })
  }
})

client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const commandInput = args.shift().toLowerCase()
  const command = client.commands.get(commandInput) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandInput))

  if (!command) return
  if (command.admin && !isAdmin(message.author.id)) return message.channel.send(config.error.access)

  if (command.args && !args.length) {
    let error = config.error.args
    if (command.example) error += `\nE.g. \`${config.prefix}${command.name} ${command.example}\``
    return message.channel.send(error)
  }

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.channel.send(config.error.execute)
  }
})

client.login()