const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const db = require('../config/database');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('GitHub profile integration and repository display')
        .addSubcommand(subcommand =>
            subcommand
                .setName('link')
                .setDescription('Link your GitHub profile')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription('Your GitHub username')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription('View GitHub profile')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('View a specific user\'s GitHub profile')
                        .setRequired(false))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'link') {
            const githubUsername = interaction.options.getString('username');

            try {
                // Verify if the GitHub username exists
                const response = await axios.get(`https://api.github.com/users/${githubUsername}`);
                const githubData = response.data;

                // First, check if user exists and create if not
                const userCheck = await db.query(
                    `INSERT INTO users (user_id, guild_id, github_username) 
                    VALUES ($1, $2, $3) 
                    ON CONFLICT (user_id, guild_id) 
                    DO UPDATE SET github_username = $3 
                    RETURNING *`,
                    [interaction.user.id, interaction.guildId, githubUsername]
                );

                const embed = new EmbedBuilder()
                    .setColor('#2b3137')
                    .setTitle('GitHub Profile Linked!')
                    .setDescription(`Successfully linked to GitHub profile: [${githubUsername}](https://github.com/${githubUsername})`)
                    .setThumbnail(githubData.avatar_url)
                    .addFields(
                        { name: 'Repositories', value: githubData.public_repos.toString(), inline: true },
                        { name: 'Followers', value: githubData.followers.toString(), inline: true },
                        { name: 'Following', value: githubData.following.toString(), inline: true }
                    )
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error('Error linking GitHub profile:', error);
                let errorMessage = 'An unexpected error occurred while linking your GitHub profile.';
                
                if (error.response) {
                    if (error.response.status === 404) {
                        errorMessage = `The GitHub username '${githubUsername}' does not exist. Please check the username and try again.`;
                    } else if (error.response.status === 403) {
                        errorMessage = 'Rate limit exceeded. Please try again later.';
                    }
                }

                await interaction.reply({
                    content: errorMessage,
                    ephemeral: true
                });
            }
        } else if (subcommand === 'view') {
            const targetUser = interaction.options.getUser('user') || interaction.user;

            try {
                // Get the user's GitHub username from the database
                const result = await db.query(
                    'SELECT github_username FROM users WHERE user_id = $1 AND guild_id = $2',
                    [targetUser.id, interaction.guildId]
                );

                if (!result.rows[0]?.github_username) {
                    return interaction.reply({
                        content: targetUser.id === interaction.user.id ?
                            'You haven\'t linked your GitHub profile yet! Use `/github link` to link it.' :
                            'This user hasn\'t linked their GitHub profile yet.',
                        ephemeral: true
                    });
                }

                const githubUsername = result.rows[0].github_username;
                const response = await axios.get(`https://api.github.com/users/${githubUsername}`);
                const reposResponse = await axios.get(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`);
                const githubData = response.data;
                const repos = reposResponse.data;

                const embed = new EmbedBuilder()
                    .setColor('#2b3137')
                    .setTitle(`${targetUser.username}'s GitHub Profile`)
                    .setDescription(`[${githubData.login}](${githubData.html_url})`)
                    .setThumbnail(githubData.avatar_url)
                    .addFields(
                        { name: 'Repositories', value: githubData.public_repos.toString(), inline: true },
                        { name: 'Followers', value: githubData.followers.toString(), inline: true },
                        { name: 'Following', value: githubData.following.toString(), inline: true },
                        { name: '\u200B', value: '**Recent Repositories**' }
                    );

                repos.forEach(repo => {
                    embed.addFields({
                        name: repo.name,
                        value: `${repo.description || 'No description'}
🔗 [View Repository](${repo.html_url})
⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}`
                    });
                });

                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error('Error viewing GitHub profile:', error);
                await interaction.reply({
                    content: 'There was an error retrieving the GitHub profile information.',
                    ephemeral: true
                });
            }
        }
    },
};