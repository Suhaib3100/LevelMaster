const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require('discord.js');
const db = require('../config/database');
const CanvasUtils = require('../utils/canvasUtils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlevel')
        .setDescription('Set a user\'s level (Admin only)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to set the level for')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('The level to set')
                .setMinValue(0)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const targetUser = interaction.options.getUser('user');
            const newLevel = interaction.options.getInteger('level');

            const result = await db.query(
                'SELECT * FROM users WHERE user_id = $1 AND guild_id = $2',
                [targetUser.id, interaction.guild.id]
            );

            if (result.rows.length === 0) {
                await db.query(
                    'INSERT INTO users (user_id, guild_id, level, xp) VALUES ($1, $2, $3, $4)',
                    [targetUser.id, interaction.guild.id, newLevel, 0]
                );
            } else {
                await db.query(
                    'UPDATE users SET level = $1, xp = $2, updated_at = CURRENT_TIMESTAMP WHERE user_id = $3 AND guild_id = $4',
                    [newLevel, 0, targetUser.id, interaction.guild.id]
                );
            }

            // Generate level-up image
            const levelUpImage = await CanvasUtils.createLevelUpImage(targetUser, newLevel);
            const attachment = new AttachmentBuilder(levelUpImage, { name: 'levelup.png' });

            await interaction.editReply({
                content: `Successfully set ${targetUser.username}'s level to ${newLevel}!`,
                files: [attachment]
            });
        } catch (error) {
            console.error('Error in setlevel command:', error);
            await interaction.editReply('There was an error while setting the user\'s level!');
        }
    }
};