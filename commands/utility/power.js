module.exports = {
  name: 'power',
  description: 'Calculate subsidized power bill in Norway.',
  aliases: ['powerbill'],
  args: true,
  example: 'NOK/MWh kWh',
  private: true,
  execute(message, args) {
    const marketMWh = parseFloat(args[0])
    const kWh = args[1]
    const marketkWh = marketMWh / 1000
    const subsidyThreshold = 0.73

    let price = marketkWh
    let subsidized = 0
    let priceFinal, unsubsidized

    if (marketkWh > subsidyThreshold) {
      let subsidy = marketkWh - subsidyThreshold
      unsubsidized = subsidy * 0.1
      price = subsidyThreshold + unsubsidized
      subsidized = subsidy * 0.9
    }

    priceFinal = (price * kWh).toFixed(2)
    subFinal = (subsidized * kWh).toFixed(2)
    unsubFinal = (unsubsidized * kWh).toFixed(2)

    message.channel.send(`NOK ${priceFinal} (${price} * ${kWh} kWh)`)
    if (subsidized > 0)
      message.channel.send(
        `NOK ${subFinal} subsidized (${unsubFinal} included)`
      )
  },
}
