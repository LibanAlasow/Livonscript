const buttonClickService = require("../services/buttonClickService")

module.exports = async (interaction) => {
    await buttonClickService.clickEvent(interaction)
}