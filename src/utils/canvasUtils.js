const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

class CanvasUtils {
    static async createLevelUpImage(user, level) {
        const canvas = createCanvas(800, 300);
        const ctx = canvas.getContext('2d');

        // Set background
        ctx.fillStyle = '#2F3136';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add gradient effect
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#4f5d7e');
        gradient.addColorStop(1, '#5865F2');
        ctx.fillStyle = gradient;
        ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Add user avatar
        try {
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 256 }));
            ctx.save();
            ctx.beginPath();
            ctx.arc(150, 150, 80, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 70, 70, 160, 160);
            ctx.restore();
        } catch (error) {
            console.error('Error loading avatar:', error);
        }

        // Add text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 60px Arial';
        ctx.fillText('LEVEL UP!', 300, 120);

        ctx.font = 'bold 40px Arial';
        ctx.fillText(`${user.username} reached level ${level}!`, 300, 180);

        // Add decorative elements
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(280, 220);
        ctx.lineTo(700, 220);
        ctx.stroke();

        return canvas.toBuffer();
    }

    static async createLeaderboardImage(users, guild) {
        const canvas = createCanvas(800, 600);
        const ctx = canvas.getContext('2d');

        // Set background
        ctx.fillStyle = '#2F3136';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add header
        const headerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        headerGradient.addColorStop(0, '#5865F2');
        headerGradient.addColorStop(1, '#4f5d7e');
        ctx.fillStyle = headerGradient;
        ctx.fillRect(0, 0, canvas.width, 80);

        // Add title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 40px Arial';
        ctx.fillText(`${guild.name} Leaderboard`, 30, 50);

        // Draw user entries
        let yPosition = 120;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            
            // Add rank background
            ctx.fillStyle = i % 2 === 0 ? '#36393F' : '#2F3136';
            ctx.fillRect(20, yPosition - 30, canvas.width - 40, 60);

            // Add rank number and medal
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 30px Arial';
            const medal = i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`;
            ctx.fillText(medal, 40, yPosition);

            // Add username and level
            ctx.fillText(user.username, 150, yPosition);
            ctx.fillText(`Level ${user.level}`, 500, yPosition);
            ctx.font = '20px Arial';
            ctx.fillText(`XP: ${user.xp}/${user.nextLevelXP}`, 500, yPosition + 25);

            yPosition += 80;
        }

        return canvas.toBuffer();
    }
}

module.exports = CanvasUtils;