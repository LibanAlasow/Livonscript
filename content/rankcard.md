---
description: >-
  Rank card for your leveling system, adjustable in 10 different ways, with a
  single class
icon: terminal
---

# RankCard

#### Simple Usuage

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

<figure><img src="../.gitbook/assets/{274EE1C9-39D9-487B-819C-61CD2B2DD8BC}.png" alt=""><figcaption></figcaption></figure>

