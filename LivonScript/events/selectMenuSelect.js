const selectMenuService = require("../services/selectMenuService")

module.exports = async (interaction) => {
    await selectMenuService.selectEvent(interaction)
}