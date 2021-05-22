// const alphabet = new Array('🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿');

// if (content.includes('|')) {
//   const poll = content.split('|');
//   const question = capitalize(poll.shift());

//   let description = '';
//   poll.forEach((option, i) => {
//     description = description + `${ALPHABET[i]} ${capitalize(option)}\n`;
//   });

//   const embed = new Discord.MessageEmbed()
//     .setTitle(question)
//     .setColor('#ffff00')
//     .setDescription(description)
//     .setFooter(`Queeg ${VERSION}e`, CSC);

//   message.channel.send(embed)
//     .then(message => {
//       for (let i = 0; i < poll.length; i++) {
//         message.react(ALPHABET[i]);
//       }
//     });
// } else {
//   message.channel.send(capitalize(content))
//     .then(message => {
//       message.react('462126280704262144');
//       message.react('462126761098870784');
//     });
// }