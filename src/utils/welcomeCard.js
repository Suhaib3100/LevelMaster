const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Register the custom font
registerFont(path.join(__dirname, '../assets/GeistMono-Regular.ttf'), { family: 'GeistMono' });

async function createWelcomeCard(username, inviter, memberCount) {
    // Create canvas
    const canvas = createCanvas(1024, 500);
    const ctx = canvas.getContext('2d');

    // Load and draw background
    const background = await loadImage(path.join(__dirname, '../assets/bg.png'));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Add semi-transparent overlay for better text visibility
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Configure text settings
    ctx.textAlign = 'center';
    ctx.font = '48px GeistMono';
    ctx.fillStyle = '#FFFFFF';

    // Draw welcome message
    ctx.fillText('Welcome to the Club', canvas.width / 2, 200);
    
    // Draw username
    ctx.fillStyle = '#7289DA';
    ctx.font = '64px GeistMono';
    ctx.fillText(username, canvas.width / 2, 280);

    // Draw invite info
    ctx.font = '24px GeistMono';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Invited by ${inviter}`, canvas.width / 2, 380);

    // Draw member count
    ctx.textAlign = 'right';
    ctx.fillText(`Member #${memberCount}`, canvas.width - 40, canvas.height - 30);

    return canvas.toBuffer();
}

module.exports = { createWelcomeCard };