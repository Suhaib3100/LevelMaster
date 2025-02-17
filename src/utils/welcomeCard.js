const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Register the custom font
registerFont(path.join(__dirname, '../assets/GeistMono-Regular.ttf'), { family: 'GeistMono' });

async function createWelcomeCard(username, inviter, memberCount, guildIconURL, inviterAvatarURL) {
    // Create canvas
    const canvas = createCanvas(1024, 500);
    const ctx = canvas.getContext('2d');

    // Load and draw background
    const background = await loadImage(path.join(__dirname, '../assets/bg.png'));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Add semi-transparent overlay for better text visibility
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load and draw server icon in the center
    try {
        if (guildIconURL) {
            const serverIcon = await loadImage(guildIconURL.replace(/\.(webp|gif)$/, '.png'));
            const iconSize = 120;
            const iconX = (canvas.width - iconSize) / 2;
            const iconY = 60;

            // Create circular clip for server icon
            ctx.save();
            ctx.beginPath();
            ctx.arc(iconX + iconSize/2, iconY + iconSize/2, iconSize/2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(serverIcon, iconX, iconY, iconSize, iconSize);
            ctx.restore();
        }
    } catch (error) {
        console.error('Error loading server icon:', error);
    }

    // Configure text settings
    ctx.textAlign = 'center';
    ctx.font = '48px "Geist Mono", "Arial"';
    ctx.fillStyle = '#FFFFFF';

    // Draw welcome message
    ctx.fillText('Welcome to the Club', canvas.width / 2, 240);
    
    // Draw username
    ctx.fillStyle = '#7289DA';
    ctx.font = '64px "Geist Mono", "Arial"';
    ctx.fillText(username, canvas.width / 2, 320);

    // Draw invite info with inviter avatar
    try {
        if (inviterAvatarURL) {
            const inviterAvatar = await loadImage(inviterAvatarURL.replace(/\.(webp|gif)$/, '.png'));
            const avatarSize = 40;
            const avatarX = canvas.width / 2 - 120;
            const avatarY = 360;

            // Create circular clip for inviter avatar
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarX + avatarSize/2, avatarY + avatarSize/2, avatarSize/2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(inviterAvatar, avatarX, avatarY, avatarSize, avatarSize);
            ctx.restore();
        }
    } catch (error) {
        console.error('Error loading inviter avatar:', error);
    }

    // Draw invite text
    ctx.font = '24px "Geist Mono", "Arial"';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Invited by ${inviter}`, canvas.width / 2 + 30, 385);

    // Draw member count
    ctx.textAlign = 'right';
    ctx.fillText(`Member #${memberCount}`, canvas.width - 40, canvas.height - 30);

    return canvas.toBuffer();
}

module.exports = { createWelcomeCard };