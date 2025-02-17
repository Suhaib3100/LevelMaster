const { Events, AttachmentBuilder } = require('discord.js');
const { pool } = require('../config/database');
const { createWelcomeCard } = require('../utils/welcomeCard');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        try {
            // Get the welcome channel configuration
            const result = await pool.query(
                'SELECT welcome_channel_id FROM guild_config WHERE guild_id = $1',
                [member.guild.id]
            );

            if (!result.rows[0]?.welcome_channel_id) return;

            const welcomeChannelId = result.rows[0].welcome_channel_id;
            const welcomeChannel = await member.guild.channels.fetch(welcomeChannelId);

            if (!welcomeChannel) return;

            // Get the invite information
            const invites = await member.guild.invites.fetch();
            let inviter = 'Unknown';

            // Find the invite that was used
            const usedInvite = invites.find(invite => invite.uses > 0);
            if (usedInvite) {
                inviter = usedInvite.inviter?.tag || 'Unknown';
            }

            // Get guild icon URL
            const guildIconURL = member.guild.iconURL({ format: 'png', size: 256 });
            
            // Get inviter avatar URL
            const inviterUser = usedInvite?.inviter;
            const inviterAvatarURL = inviterUser ? inviterUser.displayAvatarURL({ format: 'png', size: 256 }) : null;

            // Create welcome card
            const welcomeCard = await createWelcomeCard(
                member.user.username,
                inviter,
                member.guild.memberCount,
                guildIconURL,
                inviterAvatarURL
            );

            // Create attachment
            const attachment = new AttachmentBuilder(welcomeCard, { name: 'welcome-card.png' });

            // Send welcome message
            await welcomeChannel.send({
                content: `Welcome ${member.user}! 🎉`,
                files: [attachment]
            });

        } catch (error) {
            console.error('Error in guildMemberAdd event:', error);
        }
    },
};