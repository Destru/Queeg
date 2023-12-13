const Discord = require('discord.js')
const { embedColor } = require('../../config')
const tracery = require('tracery-grammar')
const tiny = {
  origin: [
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#pattern#',
    '#patternBonus#',
  ],

  pattern: [
    '#[x:#_swim#][n:#oe#]pOcean#',
    '#[x:#_walk#]pForest#',
    '#[x:#_run#]pJungle#',
    '#[x:#_bike#][n:#nw#]pCity#',
    '#[x:#_surf#]pDesert#',
  ],

  patternBonus: [
    '#[x:#_run#]pZombie#',
    '#[x:#_teach#]pBurn#',
    '#[x:#_climb#][n:#nw#]pMountain#',
    '#[x:#_sleep#][nw:#cloud#]pDreams#',
  ],

  null: '　',
  nullWide: '#null# ',
  nullRand: ['#null#', '#nullWide#'],
  n: '#null#',
  nr: '#nullRand#',
  nw: '#nullWide#',

  _assets: '',
  _bike: '🚴‍♀️',
  _cartwheel: '🤸‍♀️',
  _code: '👩‍💻',
  _climb: '🧗‍♀️',
  _meditate: '🧘‍♀️',
  _row: '🚣‍♀️',
  _run: '🏃‍♀️',
  _sleep: '🛌',
  _surf: '🏄‍♀️',
  _swim: '🏊‍♀️',
  _teach: '👩‍🏫',
  _walk: '🚶‍♀️',
  beach: '⛱',
  bike: ['🚲', '🛴', '🛵'],
  burn: [
    '#money#',
    '#money#',
    '#money#',
    '#money#',
    '#money#',
    '🏦',
    '💰',
    '💰',
    '💰',
  ],
  burger: '🍔',
  camping: '🏕',
  car: ['🚗', '🚗', '🚙', '🚕'],
  carRare: ['🏎', '🚚', '🚛', '🚌', '🚓', '🚒', '🚑', '🚐', '🚎', '🚜'],
  cloud: ['☁'],
  insects: ['🐝', '🐝', '🐝', '🐞', '🐞', '🐛', '🦋', '🦗', '🐌'],
  insectsCute: ['🐝', '🐞', '🐌'],
  fire: '🔥',
  flag: ['🚩', '🏳', '🏴'],
  flower: ['🌹', '🏵', '🌸', '🌺', '🌻', '🌻', '🌼', '🌷'],
  goat: '🐐',
  heart: ['♥', '😍', '❤', '💓', '💕', '💖', '💗', '💝'],
  house: ['🏠', '🏡'],
  houseRare: ['🏢', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏨', '🏬'],
  money: ['💵', '💴', '💵', '💶', '💷'],
  moon: ['🌕', '🌖', '🌗', '🌘', '🌙'],
  mountain: ['🏔', '⛰', '🗻'],
  plant: ['#flower#', '🌱', '🌱'],
  robot: '🤖',
  scooter: '🛵',
  sun: ['☀', '☀', '☀', '🌤', '⛅', '🌥', '🌦'],
  star: ['⭐', '⭐', '⭐', '🌟', '🌟', '🌠'],
  treat: ['🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🥧', '🍫', '🍬', '🍭'],
  tree: ['🌲', '🌲', '🌳'],
  treeCity: ['🌳'],
  zombies: ['🧟‍♀️', '🧟‍♂️'],

  _env_assets: '',
  'notused-dc': ['🦂', '🐜', '🐍', '🕸'],
  'notused-dr': ['⚱', '🐃', '🐘', '🐪', '🐫'],
  'notused-ds': ['🧞‍♀️', '🧞‍♂️'],
  fc: ['🌿', '🌿', '☘', '🍎', '🍏', '🍐', '🍄', '🌰'],
  fr: ['🐻', '🦊', '🐺', '🦉', '🐗', '🐇', '🐿', '🕷', '🕸'],
  fs: ['🧚‍♀️', '🧚‍♂️', '🧙‍♂️', '🧙‍♀️', '🦄', '🍀'],
  jc: ['🐍', '🦎', '🐒', '🕷', '🕸'],
  jr: ['🐘', '🦒', '🦏', '🐆', '🐅', '🍌', '🍍', '🐊'],
  js: ['🦖', '🦕', '🍀', '🐉'],
  lr: ['🐊', '🐉', '🧜‍♀️', '🧜‍♂️'],
  oe: ['🌊'],
  oc: ['🐟', '🐟', '🐟', '🐠', '🐠', '🐡'],
  or: ['🐙', '🦑', '🐬', '🐬', '🐬', '🐳', '🐋', '🦈'],
  os: ['🧜‍♂️', '🧜‍♀️'],
  sc: ['🌧', '🐦'],
  sr: ['🚁', '🌩', '⛈', '🕊'],
  ss: ['🛸'],

  _env: '',
  de: ['🌵', '🌵', '#nw#', '#nw#', '#nw#', '🌴'],
  fe: ['#tree#', '#tree#', '#tree#', '#tree#', '#n#'],
  fl: ['#fle#', '#fle#', '#n#'],
  fle: [
    '#flower#',
    '#flower#',
    '#flower#',
    '#flower#',
    '#flower#',
    '#flower#',
    '#flower#',
    '#flower#',
    '#insectsCute#',
  ],
  je: ['🌴', '🌴', '🌴', '🌱', '🌱', '#n#'],
  se: ['#nw#', '#nw#', '#nw#', '#cloud#'],

  _patterns: '',
  pBurn:
    '#robot##robot##robot##robot##robot##robot##robot##robot##robot#\n#robot##robot##robot##robot##x##robot##robot##robot##robot#\n#robot##robot##fire##burn##fire##burn##fire##robot##robot#\n#robot##fire##burn##fire##burn##fire##burn##fire##robot#\n#fire##fire##fire##fire##fire##fire##fire##fire##fire#\n',
  pCity:
    '#s##s##s##s##s##sun##s##s##s##s##s#\n#n##h##h##h##h##h##h##h##h##h##n#\n#ro##ro##ro##ro##n##x##n##ro##ro##ro##ro#\n#treeCity##fl##treeCity##fl##treeCity##fl##treeCity##fl##treeCity##fl##treeCity#\n#ri##ri##ri##ri##ri##ri##ri##ri##ri##ri##ri#\n',
  pDesert:
    '#s##nw##s##nw##sun##nw##s##nw##s##nw##s#\n#de##de##de##de##nw##beach##nw##de##de##de##de#\n#o##o##o##o##oe##oe##oe##o##o##o##o#\n#o##o##o##o##oe##x##oe##o##o##o##o#\n#o##o##o##o##oe##oe##oe##o##o##o##o#\n',
  pDreams:
    '#nw##nw##nw##treat##nw##nw##nw#\n#nw##nw##treat##nw##treat##nw##nw#\n#nw##treat##nw##x##nw##treat##nw#\n#nw##nw##treat##nw##treat##nw##nw#\n#nw##nw##nw##treat##nw##nw##nw#\n',
  pForest:
    '#l##f##f##f##f##f##f##f##f##f##f#\n#l##l##f##f##f##f##f##f##f##f##f#\n#l##l##l##n##x##n##f##f##f##f##f#\n#l##l##f##f##f##f##f##f##f##f##f#\n#l##f##f##f##f##f##f##f##f##f##f#\n',
  pJungle:
    '#moon##nw##s##s##s##s##s##s##s##s##s#\n#j##j##j##j##j##j##j##j##j##j##j#\n#j##j##j##j##n##x##n##j##j##j##j#\n#j##j##j##j##j##j##j##j##j##j##j#\n#j##j##j##j##j##j##j##j##j##j##j#\n',
  pMountain:
    '#n##s##n##s##n##sun##s##s##n##s##n#\n#s##n##s##n##s##n##s##n##s##n##s#\n#n##s##n##s##n##s##n##s##n##s##n#\n#nw##goat##n##n##n##n##n##n##n##n##n#\n#mountain##x##n##tree##tree##tree##tree##tree##tree##tree##tree#\n',
  pOcean:
    '#sun##nw##s##s##s##s##s##s##s##s##s#\n#o##o##o##o##n##n##n##o##o##o##o#\n#o##o##o##o##n##x##n##o##o##o##o#\n#o##o##o##o##n##n##n##o##o##o##o#\n#o##o##o##o##o##o##o##o##o##o##o#\n',
  pRobots:
    '#robot##robot##robot##robot##robot##robot##robot##robot##robot##robot##robot#\n#robot##robot##robot##robot##robot##robot##robot##robot##robot##robot##robot#\n#robot##robot##robot##robot##robot##x##robot##robot##robot##robot##robot#\n#robot##robot##robot##robot##robot##robot##robot##robot##robot##robot##robot#\n#robot##robot##robot##robot##robot##robot##robot##robot##robot##robot##robot#\n',
  pZombie:
    '#z##z##z##z##z##z##z##z##z##z##z#\n#nw##nw##nw##z##z##z##z##z##z##z##z#\n#bike##nw##x##z##z##z##z##z##z##z##z#\n#nw##nw##nw##z##z##z##z##z##z##z##z#\n#z##z##z##z##z##z##z##z##z##z##z#\n',

  _tiles: '',
  f: ['#fe#', '#fe#', '#fe#', '#fe#', '#fe#', '#fe#', '#fe#', '#fe#', '#fw#'],
  h: [
    '#house#',
    '#house#',
    '#house#',
    '#house#',
    '#house#',
    '#house#',
    '#house#',
    '#house#',
    '#house#',
    '#house#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#houseRare#',
  ],
  j: ['#je#', '#je#', '#je#', '#je#', '#je#', '#je#', '#je#', '#jw#'],
  l: [
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#lw#',
  ],
  o: [
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#ow#',
  ],
  ro: [
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#n#',
    '#car#',
    '#car#',
    '#car#',
    '#car#',
    '#car#',
    '#carRare#',
  ],
  ri: [
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oe#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#or#',
  ],
  s: [
    '#se#',
    '#se#',
    '#se#',
    '#se#',
    '#se#',
    '#se#',
    '#se#',
    '#se#',
    '#se#',
    '#se#',
    '#sw#',
  ],
  z: [
    '#plant#',
    '#plant#',
    '#plant#',
    '#plant#',
    '#plant#',
    '#plant#',
    '#plant#',
    '#zombies#',
  ],

  _weights: '',
  dw: [
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dc#',
    '#dr#',
    '#dr#',
    '#dr#',
    '#dr#',
    '#dr#',
    '#ds#',
  ],
  fw: [
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fc#',
    '#fr#',
    '#fr#',
    '#fr#',
    '#fr#',
    '#fr#',
    '#fs#',
  ],
  jw: [
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jc#',
    '#jr#',
    '#jr#',
    '#jr#',
    '#jr#',
    '#jr#',
    '#js#',
  ],
  lw: [
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#lr#',
  ],
  ow: [
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#oc#',
    '#or#',
    '#or#',
    '#or#',
    '#or#',
    '#or#',
    '#os#',
  ],
  sw: [
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sc#',
    '#sr#',
    '#sr#',
    '#sr#',
    '#sr#',
    '#sr#',
    '#ss#',
  ],
}
const voyage = tracery.createGrammar(tiny)

module.exports = {
  name: 'tiny',
  description: 'Go on a tiny voyage.',
  args: false,
  private: true,
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setDescription(voyage.flatten('#origin#'))

    message.channel.send(embed).then((message) => {
      message.react('👍')
    })
  },
}
