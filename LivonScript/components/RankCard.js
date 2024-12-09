const { createCanvas, loadImage } = require('@napi-rs/canvas'); // Use loadImage for async image loading
const { AttachmentBuilder } = require('discord.js');

async function generateCard (interaction, pfp, displayName, username, levell, xp, maxXp, userRank, bg, statuss) {
  // Canvas size increased by 300%
  const canvas = createCanvas(2025, 630); // 675 * 3 = 2025, 210 * 3 = 630
  const ctx = canvas.getContext('2d');

  // Add rounded rect support to the canvas context
  ctx.roundRect = function(x, y, width, height, radius) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
    return this;
  };

  // Function to draw the card dynamically
  async function drawCanvasCard({
    profilePicUrl = "https://cdn.discordapp.com/embed/avatars/0.png?size=256",
    displayName = "Display Name",
    username = "@username",
    level = 1,
    currentXP = 0,
    maxXP = 100,
    rank = "#1",
  }) {
    // Load the background image
    const backgroundImage = await loadImage(bg); // Replace with your background image URL

    // Draw the background image (scaled to 300%)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Card background with some transparency
    ctx.fillStyle = "rgba(42, 45, 52, 0)"; // Semi-transparent overlay
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.roundRect(0, 0, canvas.width, canvas.height, 45); // Adjust rounded corner radius (scaled)
    ctx.fill();

    // Load profile picture asynchronously
    const profileImage = await loadImage(profilePicUrl);
    drawProfilePic(profileImage);

    let statuses2 = {
      online: "rgb(83, 180, 83)",
      idle: "rgb(232, 163, 51)",
      dnd: "rgb(232, 51, 51)",
      offline: "rgb(171, 171, 171)"
    }

    function drawProfilePic(image) {
      // Circular profile pic (scaled and repositioned)

      let statuses = {
        online: "rgb(83, 180, 83)",
        idle: "rgb(232, 163, 51)",
        dnd: "rgb(232, 51, 51)",
        offline: "rgb(171, 171, 171)"
      }

      ctx.fillStyle = statuses[statuss];
      ctx.beginPath();
      ctx.arc(270, 315, 178, 0, Math.PI * 2); // Adjusted position
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgb(42, 45, 52)";
      ctx.beginPath();
      ctx.arc(270, 315, 168, 0, Math.PI * 2); // Adjusted position
      ctx.closePath();
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(270, 315, 157.5, 0, Math.PI * 2); // Adjusted position and size (scaled)
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(image, 112.5, 157.5, 315, 315); // Adjusted size and position (scaled)
      ctx.restore();

      // Online Status (closer to the profile picture, scaled)
      

      ctx.fillStyle = "rgb(42, 45, 52)";
      ctx.beginPath();
      ctx.arc(382.5, 427.5, 50, 0, Math.PI * 2); // Adjusted position
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = statuses[statuss];
      ctx.beginPath();
      ctx.arc(382.5, 427.5, 38, 0, Math.PI * 2); // Adjusted position
      ctx.closePath();
      ctx.fill();

      if (statuss == "idle") {
        ctx.fillStyle = "rgb(42, 45, 52)";
        ctx.beginPath();
        ctx.arc(372.5, 417.5, 30, 0, Math.PI * 2); // Adjusted position
        ctx.closePath();
        ctx.fill();
      }

      if (statuss == "offline") {
        ctx.fillStyle = "rgb(42, 45, 52)";
        ctx.beginPath();
        ctx.arc(382.5, 427.5, 24, 0, Math.PI * 2); // Adjusted position
        ctx.closePath();
        ctx.fill();
      }

      if (statuss == "dnd") {
        ctx.fillStyle = statuses[statuss];
        ctx.beginPath();
        ctx.arc(382.5, 427.5, 38, 0, Math.PI * 2); // Adjusted position
        ctx.closePath();
        ctx.fill();

        roundRect(352, 421,60,20,10);
        ctx.fillStyle = "rgb(42,45,52)";
        ctx.fill();
     
        
      }

      
    }

    // Display Name (scaled font size and position)
    ctx.fillStyle = "white";
    ctx.font = "90px Myriad Pro"; // Increased font size
    ctx.fillText(displayName, 540, 225); // Adjusted position (scaled)

    // Username (scaled font size and position)
    ctx.fillStyle = "rgb(164, 164, 164)";
    ctx.font = "48px Myriad Pro"; // Increased font size
    ctx.fillText(username, 540, 300); // Adjusted position (scaled)

    // Progress Bar (Outer)
    ctx.fillStyle = "rgb(80, 80, 80)";
    ctx.roundRect(540, 360, 1125, 54, 27); // Adjusted size and position (scaled)
    ctx.fill();

    // Progress Bar (Inner) with dynamic XP calculation
    
    ctx.fillStyle = "white";
    let progressBarWidth = (1125 * currentXP) / maxXP;
    if (currentXP < (maxXP/35)) {
        progressBarWidth = (1125*(maxXP/35))/maxXP
    } 
    ctx.roundRect(540, 360, progressBarWidth, 54, 27); // Adjusted width (scaled)
    ctx.fill();



    function roundRect(x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
  }





    // Details (Level, XP, Rank)
    ctx.fillStyle = "rgb(170, 170, 170)";
    ctx.font = "54px Myriad Pro"; // Increased font size
    ctx.fillText("Level", 1340, 320); // Adjusted position (scaled)
    ctx.fillText("XP", 540, 480); // Adjusted position (scaled)

 

    ctx.fillStyle = "white";
    ctx.font = "174px Myriad Pro"; // Increased font size
    ctx.fillStyle = statuses2[statuss];
    ctx.fillText(String(level), 1475, 320); // Adjusted position (scaled)
    ctx.font = "54px Myriad Pro"; 
    ctx.fillStyle = "white";
    ctx.fillText(`${currentXP} / ${maxXP}`, 620, 480); // Adjusted position (scaled)
    ctx.font = "95px Myriad Pro"; 
    //ctx.fillText(rank, 1740, 110); RIP MY BRO
    

   
  }

  // Example Usage
  await drawCanvasCard({
    profilePicUrl: pfp,
    displayName: "@"+displayName,
    username: username,
    level: levell,
    currentXP: xp,
    maxXP: maxXp,
    rank: "#" + userRank,
  });

  // Convert the canvas to a PNG buffer and send it as an attachment
  const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });
  return attachment;
};


module.exports = class RankCard {
    constructor(data) {
        this.interaction = data.interaction ?? null
        this.profilePicture = data.profilePicture ?? "https://cdn.discordapp.com/embed/avatars/0.png"
        this.title = data.title ?? "Username"
        this.description = data.description ?? "Server name"
        this.level = data.level ?? 0
        this.xp = data.xp ?? 0
        this.xpGoal = data.xpGoal ?? 1000
        this.rank = data.rank ?? 1
        this.backgroundImage = data.backgroundImage ?? "content/defaultbackground.png"
        this.status = data.status ?? "online"
    }

    async load () {
        return new Promise(async (resolve, reject) => {
            let rankCard = await generateCard(
                this.interaction,
                this.profilePicture,
                this.title,
                this.description,
                this.level,
                this.xp,
                this.xpGoal,
                this.rank,
                this.backgroundImage,
                this.status
            )

            resolve(rankCard)
        })
    }
}