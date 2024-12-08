const { ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js")
const SMS = require("../services/selectMenuService")

module.exports = class Menu {
    constructor(placeholder,options, callback, multiSelect = false) {
        let select = new StringSelectMenuBuilder()
        let id = String(Math.round(Math.random()*10000000))
        
        select.setCustomId(id)
        select.setOptions(options)
        select.setPlaceholder(placeholder)
        
        if (multiSelect == true) {
            select.setMinValues(1)
            select.setMaxValues(options.length)
        }

        let Session = SMS.Session
        let select_session = new Session(id,select)
        select_session.callback = callback
        return select
    }
}