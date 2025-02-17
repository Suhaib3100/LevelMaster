const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

class CanvasUtils {
    static async createProjectShowcaseImage(project, user) {
        const canvas = createCanvas(1200, 630); // 16:9 ratio, optimal for social sharing
        const ctx = canvas.getContext('2d');

        // Create modern gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1a1c2c');
        gradient.addColorStop(0.5, '#202340');
        gradient.addColorStop(1, '#283593');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add decorative elements
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 150);
            ctx.lineTo(canvas.width, i * 150 + 100);
            ctx.stroke();
        }

        // Add project title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(project.title, canvas.width / 2, 150);

        // Add description with word wrap
        ctx.font = '30px Arial';
        const words = project.description.split(' ');
        let line = '';
        let y = 250;
        for (const word of words) {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > canvas.width - 100) {
                ctx.fillText(line, canvas.width / 2, y);
                line = word + ' ';
                y += 40;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, canvas.width / 2, y);

        // Add tech stack
        if (project.technologies.length > 0) {
            ctx.font = 'bold 32px Arial';
            ctx.fillText('Technologies:', canvas.width / 2, y + 80);
            ctx.font = '28px Arial';
            ctx.fillText(project.technologies.join(' • '), canvas.width / 2, y + 120);
        }

        // Add user info
        try {
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 128 }));
            ctx.save();
            ctx.beginPath();
            ctx.arc(100, canvas.height - 80, 40, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 60, canvas.height - 120, 80, 80);
            ctx.restore();

            ctx.font = '24px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`Created by ${user.username}`, 160, canvas.height - 80);
        } catch (error) {
            console.error('Error loading avatar:', error);
        }

        // Add likes count
        ctx.textAlign = 'right';
        ctx.fillText(`❤️ ${project.likes_count} likes`, canvas.width - 50, canvas.height - 80);

        return canvas.toBuffer();
    }

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