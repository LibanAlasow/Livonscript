---
description: >-
  With interfaces, you can execute prompts with series of questions using
  buttons, select menus, modals and more in a single ephemeral command to gather
  as much information you wish from the user.
icon: terminal
---

# Interfaces

#### How does it work?

The user runs the command `/anyCommand` and the prompt will begin as an ephemeral (only visible to you) reply with the first embed content and components based on your interface survey/application questions. when the user makes their choice they will have the option to either go to the next question or go back to the previous with 2 buttons, or they can just simply cancel the prompt. but above those buttons there will be any component you choose in each question and those will change based on what question the user is on.

#### How do i use it?

```javascript

callback: async (client, interaction) => {
    let ping = client.ws.ping
    await interaction.deferReply({ephemeral: true})

    // Create the interface & define an episodes (steps) array to store your steps
    const reactionRolesInterface = new Interface(interaction)
    const episodes = []

    // Create your episodes, add as many as you like
    let episode1 = new reactionRolesInterface.Episode(reactionRolesInterface)
    episode1.setTitle("🚩 Channel")
    episode1.setDescription("Before beginning the setup. please select the channel you want the message to appear.")
    episode1.setOperations([
        new episode3.Operation(reactionRolesInterface, {
          name: "🏠 Self-role channel",
          type: "server-channel"
        })
      ])

    let episode2 = new reactionRolesInterface.Episode(reactionRolesInterface)
    episode2.setTitle("🔧 Notifications")
    episode2.setDescription("This step is about roles given to users based on what type of notifications they would like to recieve")
    episode2.setOperations([
        new episode1.Operation(reactionRolesInterface, {
          name: "🚀 Game updates",
          type: "server-role"
        }),
        new episode1.Operation(reactionRolesInterface, {
          name: "📫 Server news",
          type: "server-role"
        }),
        new episode1.Operation(reactionRolesInterface, {
          name: "📜 Polls",
          type: "server-role"
        }),
      ])

      let episode3 = new reactionRolesInterface.Episode(reactionRolesInterface)
      episode3.setTitle("🌟 Interests")
      episode3.setDescription("Let your memebers select what interests they like")
      episode3.setOperations([
          new episode1.Operation(reactionRolesInterface, {
            name: "⚽ Football",
            type: "server-role"
          }),
          new episode1.Operation(reactionRolesInterface, {
            name: "👨‍🎨 Art",
            type: "server-role"
          }),
          new episode1.Operation(reactionRolesInterface, {
            name: "💻 Programming",
            type: "server-role"
          }),
        ])

    // push all your episodes to your "episodes" array & update the episodes with that array
    episodes.push(episode1,episode2, episode3)
    reactionRolesInterface.updateEpisodes(episodes)

    // start your interaction, and await the promise that returns the results
    let results = await reactionRolesInterface.start()
    
    // handle the results
    console.log(results)

  
    
  
  }
```

#### That's it! Now you got an advanced interaction system ready to use.

<figure><img src="https://media.discordapp.net/attachments/1314996480792334357/1315368817521594438/B4E82CB4-7466-4438-A80C-5F7C567AE168.png?ex=6757282c&#x26;is=6755d6ac&#x26;hm=caff39f5cfe97fb14672c91fc1dda203146793e88f5d7f2288ba36853febd701&#x26;=&#x26;format=webp&#x26;quality=lossless&#x26;width=954&#x26;height=670" alt=""><figcaption></figcaption></figure>



