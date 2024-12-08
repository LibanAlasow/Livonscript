class Service {
    constructor() {
        this.sessions = {}

        let addSession = (session) => {
            this.sessions[session.id] = session
        }

        let terminate = async (id) => {
            await this.terminateSession(id)
        }

        this.Session = class Session {
            constructor(id, button) {
                this.id = id
                this.button = button
                this.callback = async () => {
                    //unset
                }
                
                addSession(this)
        
                setTimeout(async () => {
                    await terminate(this.id)
                    
                }, 600000)
            }
        }
    }

    async terminateSession (id) {
        delete this.sessions[id]
    }

    async selectEvent (interaction) {
        
        if (!this.sessions[interaction.customId]) {
            await interaction.reply({
                ephemeral: true,
                content: "Session expired, select menu can no longer be used"
            })
            return
        }

        await this.sessions[interaction.customId].callback(interaction)
    }

}





module.exports = new Service()