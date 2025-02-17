const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const db = require('../config/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showcase')
        .setDescription('Showcase your project to the community')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a new project showcase')
                .addStringOption(option =>
                    option.setName('title')
                        .setDescription('The title of your project')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('description')
                        .setDescription('A brief description of your project')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('url')
                        .setDescription('The URL to your project')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('thumbnail')
                        .setDescription('A thumbnail URL for your project')
                        .setRequired(false))
                .addStringOption(option =>
                    option.setName('technologies')
                        .setDescription('Technologies used (comma-separated)')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription('View project showcases')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('View projects from a specific user')
                        .setRequired(false))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'add') {
            const title = interaction.options.getString('title');
            const description = interaction.options.getString('description');
            const projectUrl = interaction.options.getString('url');
            const thumbnailUrl = interaction.options.getString('thumbnail');
            const technologies = interaction.options.getString('technologies');

            // Validate URLs
            try {
                if (projectUrl) new URL(projectUrl);
                if (thumbnailUrl) new URL(thumbnailUrl);
            } catch (error) {
                return interaction.reply({ 
                    content: 'Please provide valid URLs for the project and thumbnail.',
                    ephemeral: true 
                });
            }

            // Process technologies
            const techArray = technologies ? technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0) : [];

            try {
                const result = await db.query(
                    'INSERT INTO project_showcases (user_id, guild_id, title, description, project_url, thumbnail_url, technologies) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
                    [interaction.user.id, interaction.guildId, title, description, projectUrl, thumbnailUrl, techArray]
                );

                const projectEmbed = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle(`🚀 ${title}`)
                    .setDescription(description)
                    .addFields(
                        { name: '🔗 Project Link', value: `[View Project](${projectUrl})`, inline: true },
                        { name: '👤 Created By', value: `${interaction.user}`, inline: true },
                        { name: '❤️ Likes', value: '0', inline: true }
                    )
                    .setFooter({ text: 'Project Showcase • Click 👍 to like', iconURL: interaction.guild.iconURL() })
                    .setTimestamp();

                if (techArray.length > 0) {
                    projectEmbed.addFields([
                        { name: '🛠️ Technologies', value: techArray.map(tech => `\`${tech}\``).join(' ') }
                    ]);
                }

                if (thumbnailUrl) {
                    projectEmbed.setThumbnail(thumbnailUrl);
                }

                const message = await interaction.reply({ embeds: [projectEmbed], fetchReply: true });
                await message.react('👍');
            } catch (error) {
                console.error('Error adding project showcase:', error);
                await interaction.reply({ content: 'There was an error adding your project showcase.', ephemeral: true });
            }
        } else if (subcommand === 'view') {
            const targetUser = interaction.options.getUser('user') || interaction.user;

            try {
                const result = await db.query(
                    'SELECT * FROM project_showcases WHERE user_id = $1 AND guild_id = $2 ORDER BY created_at DESC LIMIT 5',
                    [targetUser.id, interaction.guildId]
                );

                if (result.rows.length === 0) {
                    return interaction.reply({
                        content: targetUser.id === interaction.user.id ?
                            'You haven\'t showcased any projects yet! Use `/showcase add` to add one.' :
                            'This user hasn\'t showcased any projects yet.',
                        ephemeral: true
                    });
                }

                const projects = result.rows;
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(`🚀 ${targetUser.username}'s Project Showcase`)
                    .setDescription('Here are the latest projects:')
                    .setThumbnail(targetUser.displayAvatarURL())
                    .setFooter({ text: 'Use /showcase add to add your project', iconURL: interaction.client.user.displayAvatarURL() })
                    .setTimestamp();

                projects.forEach((project, index) => {
                    const techStack = project.technologies && project.technologies.length > 0
                        ? project.technologies.map(tech => `\`${tech}\``).join(' ')
                        : 'No technologies specified';

                    embed.addFields([
                        {
                            name: `${index + 1}. ${project.title}`,
                            value: `${project.description}\n\n🔗 [View Project](${project.project_url})\n🛠️ **Tech Stack:** ${techStack}\n👍 Likes: ${project.likes_count}`,
                            inline: false
                        }
                    ]);
                });

                if (projects[0].thumbnail_url) {
                    embed.setThumbnail(projects[0].thumbnail_url);
                }

                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error('Error viewing project showcase:', error);
                await interaction.reply({ content: 'There was an error viewing the project showcase.', ephemeral: true });
            }
        }
    },
};