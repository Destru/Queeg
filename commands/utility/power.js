module.exports = {
  name: 'power',
  description: 'Calculate power bill.',
  args: true,
  example: 'mWh kWh',
  private: true,
  execute(message, args) {
    const marketmWh = parseFloat(args[0])
    const kWh = args[1]
    const marketkWh = marketmWh / 1000
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

    message.channel.send(`${priceFinal} NOK (${price} NOK * ${kWh} kWh)`)
    if (subsidized > 0)
      message.channel.send(
        `${subFinal} NOK subsidized (${unsubFinal} NOK paid)`
      )
  },
}
