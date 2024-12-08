const main = require("./@main")
const buttonClick = require("../events/buttonClick")
const selectMenuSelect = require("../events/selectMenuSelect")
const { Emoji } = require("discord.js")
const fs = require('fs')
const path = require("path")

class Client {
    constructor(client) {
        this.client = client

        main["LocalClient"] = client

        // connect events
        client.on("interactionCreate", async (interaction) => {
            if (interaction.isButton()) { await buttonClick(interaction) }
            if (interaction.isStringSelectMenu()) { await selectMenuSelect(interaction) }
        })

        // do it here
        
        const iconDirectory = path.join(__dirname, '../icons');
      
        
        console.log(`[LS-CLIENT CREATED] ${client.user.username}`)
    }
}

module.exports = Client