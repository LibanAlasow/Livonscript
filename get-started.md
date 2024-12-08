---
description: >-
  LS is a simple and easy-to use library, you can start using it in seconds. use
  the one line below in your main/index faile.
icon: face-smile-beam
---

# Get started!

{% content-ref url="download.md" %}
[download.md](download.md)
{% endcontent-ref %}



{% hint style="info" %}
**OBS** the Livonscript folder has to be next to your src directory
{% endhint %}



<pre class="language-javascript"><code class="lang-javascript">
const { Client } = require("../LivonScript/utilities/@main")

<strong>const LSClient = new Client(myDiscordClient)
</strong></code></pre>

If you would like to use it in a bit more advanced way, we recommed having your livonscript client be a module so that you can access it anywhere.

```javascript
// seperate file: for example (LSClient.js)

const { Client }= require("../LivonScript/utilities/@main")

module.exports = new Client(myDiscordClient)

// index.js file

cosnt myLSClient = require("./LSClient")

```

