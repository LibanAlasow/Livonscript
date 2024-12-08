---
description: Simplified Button builder
icon: terminal
---

# Button

#### Usuage

```javascript
// new Button(ButtonName, ButtonStyle, ClickFunction)

//Example
new Button("Example Button", "Success", async (inter) => {
      await inter.reply({
        ephemeral: true,
        content: "button clicked!"
      })
 }),
 
 
```

{% hint style="info" %}
The click function will only be working for **10 minutes**, but there won't be any error after that.
{% endhint %}

