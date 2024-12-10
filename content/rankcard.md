---
icon: terminal
description: >-
  Rank card for your leveling system, adjustable in 10 different ways, with a
  single class
---

# RankCard

Simple Usuage

```javascript
let card = new RankCard({ interaction: interaction })
let attachment = await card.load()
```

#### Full usuage

```javascript
let exampleCard = new RankCard({
      interaction: interaction, // required
      profilePicture: myProfilePicture,
      title: myTitle,
      description: myDescription,
      level: myLevel,
      xp: myXP,
      xpGoal: myXpGoal,
      rank: myRank,
      backgroundImage: myBackgroundImage,
      status: myStatus // online, offline, idle or dnd
})

let attachment = await exampleCard.load() // waits for promise to resolve
```

#### Showcase

<figure><img src="https://media.discordapp.net/attachments/1314332440927539210/1316047555465052191/465A2AD4-FD86-4C7D-A473-CF5F60356ECF.png?ex=6759a04c&#x26;is=67584ecc&#x26;hm=19cc0a6a65e63dedd59c995c59021b9112a92b0c027b981d15ff641c1da7f84b&#x26;=&#x26;format=webp&#x26;quality=lossless&#x26;width=1147&#x26;height=444" alt=""><figcaption></figcaption></figure>

