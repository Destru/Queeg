const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'ao',
  description: `Our comrades on Rubi-Ka.`,
  aliases: ['anarchy', 'anarchyonline'],
  execute(message) {
    const api = 'https://people.anarchy-online.com/'
    const embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setDescription(
        'A friendly terrorist organization on Rubi-Ka. ' +
          'We also sell drugs, ' +
          'and offer a variety of other services in a similar vein. ' +
          '**Fuck Omni-Tek** <:cop:719672826277265418>' +
          '\n\nContact <@160320553322807296> or <@176003786228105216> for an invite!'
      )
      .setTitle(`Cyberpunk Social Club`)
      .setThumbnail('https://cyberpunksocial.club/images/csc-clan.png')

    fetch(`${api}org/stats/d/5/name/468996/basicstats.xml?data_type=json`)
      .then((response) => response.json())
      .then((data) => {
        const org = data[0]

        embed.addFields(
          {
            name: 'Professions',
            value:
              `Animorphs \`${org.ADVENTURERCOUNT}\`` +
              `\nGrunts \`${org.SOLIDERCOUNT}\`` + // sic
              `\nHackers \`${org.FIXERCOUNT}\`` +
              `\nHealbots \`${org.DOCTORCOUNT}\`` +
              `\nNerds \`${org.ENGINEEERCOUNT}\`` + // a child made this endpoint
              `\nNinjas \`${org.MACOUNT}\`` +
              `\nNukes \`${org.NANOCOUNT}\`` +
              `\nSnipers \`${org.AGENTCOUNT}\`` +
              `\nStabbys \`${org.SHADECOUNT}\`` +
              `\nSuits \`${org.BTCOUNT}\`` +
              `\nTanks \`${org.ENFCOUNT}\`` +
              `\nWitches \`${org.METACOUNT}\`` +
              `\nWranglers \`${org.AGENTCOUNT}\``,
            inline: true,
          },
          {
            name: 'Status',
            value:
              `Avg. Level \`${org.AVGLVL}\`` +
              `\nConscripts \`${org.NUMMEMBERS}\`` +
              `\nEngineered \`${org.ATROXCOUNT}\`` +
              `\nHumans \`${org.NANORACECOUNT}\`` +
              `\nMutants \`${org.SOLITUSCOUNT}\`` +
              `\nPenises \`${org.MALECOUNT}\`` +
              `\nVaginas \`${org.FEMALECOUNT}\``,
            inline: true,
          },
          {
            name: 'Resources',
            value:
              '[Download Anarchy Online](https://www.anarchy-online.com) <:ao:882166009274990602>',
          }
        )

        message.channel.send(embed)
      })
  },
}
