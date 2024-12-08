---
description: Simplified Select menu builder
icon: terminal
---

# Select

#### Usuage

```javascript
// new Select(Placeholder, Options, SelectFunction, SelectSeveral)

const { Button, Select } = require("LivonScript/utilities/@main").components;

//Example
new Select("Choose something", [{
        label: "Option 1",
        description: "This is a description",
        value: "o1"
    },
    {
        label: "Option 2",
        description: "This is a description",
        value: "o2"
    },
    {
        label: "Option 3",
        description: "This is a description",
        value: "o3"
    }
], async (inter) => {
    let values = inter.values
    await inter.reply({
        ephemeral: true,
        content: "We did it, you chose " + values
    })
}, true)
 
```

{% hint style="info" %}
The select function will only be working for **10 minutes**, but there won't be any error after that.
{% endhint %}

