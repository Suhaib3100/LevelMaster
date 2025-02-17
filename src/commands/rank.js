const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../config/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Display your current rank and level progress'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            let userResult = await db.query(
                'SELECT * FROM users WHERE user_id = $1 AND guild_id = $2',
                [interaction.user.id, interaction.guild.id]
            );

            let user;
            if (!userResult.rows.length) {
                const newUserResult = await db.query(
                    'INSERT INTO users (user_id, guild_id) VALUES ($1, $2) RETURNING *',
                    [interaction.user.id, interaction.guild.id]
                );
                user = newUserResult.rows[0];
            } else {
                user = userResult.rows[0];
            }

            const nextLevelXP = Math.floor(100 * Math.pow(1.5, user.level));
            const progress = (user.xp / nextLevelXP) * 100;
            const progressBar = createProgressBar(progress);

            const embed = new EmbedBuilder()
                .setColor('#2F3136')
                .setAuthor({
                    name: interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setTitle('🏆 Rank Card')
                .addFields(
                    { name: 'Level', value: user.level.toString(), inline: true },
                    { name: 'XP', value: `${user.xp}/${nextLevelXP}`, inline: true },
                    { name: 'Messages', value: user.messageCount.toString(), inline: true },
                    { name: 'Progress', value: progressBar }
                )
                .setFooter({ text: `${progress.toFixed(1)}% to next level` })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in rank command:', error);
            await interaction.editReply('There was an error while fetching your rank!');
        }
    }
};

function createProgressBar(progress) {
    const filledSquares = Math.floor(progress / 10);
    const emptySquares = 10 - filledSquares;
    return '█'.repeat(filledSquares) + '░'.repeat(emptySquares);
}