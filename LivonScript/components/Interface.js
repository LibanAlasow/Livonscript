const { EmbedBuilder, ActionRowBuilder, ChannelType } = require("discord.js")
const configuration = require("../services/configuration")
const Button = require("./Button")
const Select = require("./Select");
const { components } = require("../utilities/@main");

class Controller {
    constructor(IF) {
        this.IF = IF
        this.index = 0

        this.tools = {
            canGoForward(episode) {
                let length = IF.episodes.length
                let index = IF.episodes.indexOf(episode)
                let order = index+1

                return (order >= length) == false
            },
            canGoBackward(episode) {
                let length = IF.episodes.length
                let index = IF.episodes.indexOf(episode)
                let order = index+1

                return (index <= 0) == false
            }
        }
    }

    goForward () {
        if (this.tools.canGoForward(this.IF.currentEpisode) == false) {return}
        this.index++
        this.IF.currentEpisode = this.IF.episodes[this.index]

        this.IF.swapEpisode(this.IF.currentEpisode)
        
    }
    
    goBackward () {
        if (this.tools.canGoBackward(this.IF.currentEpisode) == false) {return}
        this.index--
        this.IF.currentEpisode = this.IF.episodes[this.index]

        this.IF.swapEpisode(this.IF.currentEpisode)
    }
}
class Episode {
    constructor(interFace) {
        this.title = "Untitled"
        this.description = "No description"
        this.interFace = interFace
        this.operations = []

      
        
        this.embed
        this.embeds = () => {return []}
        
        this.refreshEmbed()

    
        this.components = () => {
            return [
                this.interFace.returnBottomRow()
            ]
        }

        this.Operation = Operation
    }

    setOperations(operations) {
        this.operations = operations
        let operation_rows = []
        for (const operation of this.operations) {
            operation_rows.push(operation.row)
        }

        this.setComponents(operation_rows)
    }

    

    

    async refreshEmbed () {
        let embed = new EmbedBuilder()
            .setColor(configuration.themeColor)
            .setAuthor({name: "Interaction"})
            .setTitle(this.title)
            .setFooter({ text: this.interFace.pageInfo})
            .setFields([
                {name: "Status", value: this.interFace.statusText(), inline: true},
                {name: "Progress", value: this.interFace.progressText(), inline: true},
            ])
            .setDescription(this.description)
            .setThumbnail("https://media.discordapp.net/attachments/1314996480792334357/1315002701213601863/interface.png?ex=6755d333&is=675481b3&hm=8fd23b4ccd8c5d2e0bef88113d9b3b41f2bf0159d810c672e58609b957e1634f&=&format=webp&quality=lossless&width=472&height=472");
        
        
        this.embed = embed
        this.embeds = () => {return [this.embed]}

    }

    setDescription(newDesc) {
        this.description = newDesc
    }
    setTitle(newTitle) {
        this.title = newTitle
    }

    setComponents(rows) {
        this.components = () => {
            return rows.concat(this.interFace.returnBottomRow())
        }

        
    }
}
class Operation {
    constructor(interFace, data) {
        this.IF = interFace
        //CONTINUE HERE
        this.data = data

        if (this.data.type == "select_string") {
            this.row = new ActionRowBuilder().addComponents(
                new Select(this.data.name, this.data.options, async (inter) => {this.select_string_interaction(inter)})
            )
        } 

        if (this.data.type == "server-role") {
            let options = []

            let roles = this.IF.interaction.guild.roles.cache.filter(role => {
                return !role.name.startsWith('@') && !role.managed;
            }).map(role => {return {name: role.name, id: role.id}});
            
            for (const role of roles) {
                options.push({
                    label: role.name,
                    description: "Select this role",
                    value: `<@&${role.id}>`
                })
            }

            this.row = new ActionRowBuilder().addComponents(
                new Select(this.data.name, options, async (inter) => {this.select_role_interaction(inter)})
            )
        }
        
        if (this.data.type == "server-channel") {
            let options = []

           

            let textChannels = this.IF.interaction.guild.channels.cache.filter(channel => {
                return channel.type === ChannelType.GuildText;
            }).map(channel => channel);
            
            for (const role of textChannels) {
                options.push({
                    label: role.name,
                    description: "Select this role",
                    value: `<#${role.id}>`
                })
            }


            this.row = new ActionRowBuilder().addComponents(
                new Select(this.data.name, options, async (inter) => {this.select_channel_interaction(inter)})
            )
        }


        this.components = []
    }

    async select_role_interaction (inter) {
        this.data["value"] = inter.values[0]

        this.IF.reply.embeds[0].data.fields[1].value = this.IF.progressText()
        await this.IF.updateReply()
        await inter.deferUpdate()
    }

    async select_channel_interaction (inter) {
        this.data["value"] = inter.values[0]

        this.IF.reply.embeds[0].data.fields[1].value = this.IF.progressText()
        await this.IF.updateReply()
        await inter.deferUpdate()
    }

    async select_string_interaction(inter) {
        this.data["value"] = inter.values[0]

        this.IF.reply.embeds[0].data.fields[1].value = this.IF.progressText()
        await this.IF.updateReply()
        await inter.deferUpdate()
    }
}



module.exports = class Interface {
    constructor(interaction) {
        this.interaction = interaction
        this.pageInfo = `loading..`
        this.statusText = () => {
            function getTimestampInTenMinutes() {
                const now = Date.now(); // Current timestamp in milliseconds
                const tenMinutesFromNow = Math.floor((now + 10 * 60 * 1000) / 1000); // Add 10 minutes, then convert to seconds
                return tenMinutesFromNow;
            }
        
            return `${configuration.emojis.ongoingone}${configuration.emojis.ongoingtwo} This prompt will automatically end <t:${getTimestampInTenMinutes()}:R>`;
        };

        
        this.data = {}
        

     

        this.progressText =  () => {
            // ${configuration.emojis.check_true} **Operation** → [ ${configuration.emojis.missingone}${configuration.emojis.missingtwo} ]
            let txt = ""
            if (this.currentEpisode == undefined) {return "there are no options"}
            if (this.currentEpisode.operations.length == 0) {return "This page has no options"}

            for (const operation of this.currentEpisode.operations) {
                if (!operation.data.value) {
                    txt += `${configuration.emojis.check_false} **${operation.data.name}** → ${configuration.emojis.missingone}${configuration.emojis.missingtwo}  
                    `
                    continue
                }

                txt += `${configuration.emojis.check_true} **${operation.data.name}** → ${operation.data.value}   
                    `
            }

            return txt
        }

        this.updatePageInfo = async (currentEpisode, allEpisodes) => {
            return new Promise((res,rej) => {
                let currentIndex = this.episodes.indexOf(currentEpisode)
                let length = allEpisodes.length

                this.pageInfo = `step ${currentIndex+1} of ${length}`
                res()
            })
        }

        
        

        this.bottomRowNormal = new ActionRowBuilder().addComponents(
            new Button("Continue", "Success", async (inter) => {
                await this.continueButtonClick(inter)
            }),
            new Button("Go back", "Secondary", async (inter) => {
                await this.goBackButtonClick(inter)
            })
        )
        this.bottomLastRow = new ActionRowBuilder().addComponents(
            new Button("Submit", "Primary", async (inter) => {
                await this.submitButtonClick(inter)
            }),
            new Button("Go back", "Secondary", async (inter) => {
                await this.goBackButtonClick(inter)
            })
        )

        this.bottomFirstRow = new ActionRowBuilder().addComponents(
            new Button("Continue", "Success", async (inter) => {
                await this.continueButtonClick(inter)
            })
        )
        
        

        this.reply = {
            embeds: [],
            components: []
        }

        
        this.Episode = Episode
        this.episodes = []

        this.currentEpisode = this.episodes[0]

        this.controller = new Controller(this)


        this.operations = []
        
        
    }

    

    

    lastRow () {
        if (!this.controller) {return this.bottomRowNormal}
        if (this.currentEpisode == this.episodes[this.episodes.length-1]) {
            return this.bottomLastRow
        } else {

            if (this.currentEpisode == this.episodes[0]) {
                return this.bottomFirstRow
            } else {
                return this.bottomRowNormal
            }
        }
    }

    returnBottomRow () {
        return this.lastRow()
    }

    async missing_fields() {
        let missing = []
        let all_fields = []

        for (const episode of this.episodes) {
            for (const field of episode.operations) {
                all_fields.push(field.data)
            }
        }

        for (const field of all_fields) {
            if (field.value == undefined) {
                missing.push(field)
            }
        }
        
        return [missing, all_fields]
    }
  
    async submitButtonClick(inter) {
        let [missing_fields, all_fields] = await this.missing_fields()

        if (missing_fields.length > 0) {
            let missingFormat = ``

            for (const field of missing_fields) {
                missingFormat += `${configuration.emojis.missingone}${configuration.emojis.missingtwo} ${field.name}
                `
            }

            await inter.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder().setColor(configuration.themeColor).setDescription(`${configuration.emojis.errorone}${configuration.emojis.errortwo} **Cannot submit interface**\n-# The following fields are missing, please go through the steps.\n${missingFormat}`)
                ]
            })
            return
        }

   
        this.reply.components = []
        this.reply.embeds[0].data.fields[0].value = configuration.emojis.closedone+configuration.emojis.closedtwo
        await this.updateReply()
        await inter.reply({
            ephemeral: true,
            embeds: [
                new EmbedBuilder().setColor(configuration.themeColor).setDescription(`${configuration.emojis.successone}${configuration.emojis.successtwo} Interaction successfully submitted!`)
            ]
        })
        this.resolve(all_fields)
    }  

    async continueButtonClick (inter) {
        this.controller.goForward()

        await inter.deferUpdate()
    }

    async goBackButtonClick (inter) {
        this.controller.goBackward()

        await inter.deferUpdate()
    }

    async swapEpisode (episode) {
        this.currentEpisode = episode
        await this.updatePageInfo(this.currentEpisode, this.episodes)
        await episode.refreshEmbed()
        
        this.reply = {
            embeds: episode.embeds(),
            components: episode.components()
        }

        await this.updateReply()
    }

    async updateEmbeds (newEmbeds) {
        this.reply.embeds = newEmbeds

        await this.interaction.editReply({embeds: this.reply.embeds})
    }

    async updateComponents (newComponents) {
        this.reply.components = newComponents

        await this.interaction.editReply({components: this.reply.components})
    }

    async updateReply () {
        await this.interaction.editReply(this.reply)
    }

    async updateEpisodes (newEpisodes) {
        this.episodes = newEpisodes
    }

    async start () {
        return new Promise( async (resolve, reject) => {
            // do stuff?

            
            setTimeout(async () => {
                await this.swapEpisode(this.episodes[0])
                this.resolve = (res) => {resolve(res)}
            }, 100);

            setTimeout(async () => {
                this.reply.components = []
                this.reply.embeds[0].data.fields[0].value = configuration.emojis.closedone+configuration.emojis.closedtwo
                await this.updateReply()
                resolve()
            }, 600000)
            
        })
    }
}

// New beginning, fresh start, improvements, bulletproof, better interview, better EVERYTHING