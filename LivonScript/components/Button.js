const { ButtonBuilder, ButtonStyle } = require("discord.js")
const BCS = require("../services/buttonClickService")

module.exports = class Button {
    constructor(label,styleName, callback) {
        let btn = new ButtonBuilder()
        let id = String(Math.round(Math.random()*10000000))
        
        btn.setCustomId(id)
        btn.setLabel(label)
        btn.setStyle(ButtonStyle[styleName])

        let Session = BCS.Session
        let click_session = new Session(id,btn)
        click_session.callback = callback
        return btn
    }
}