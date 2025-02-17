# LevelMaster - Professional Developer Community Discord Bot

LevelMaster is a sophisticated Discord bot designed specifically for developer and designer communities. It features a professional 10-tier leveling system, skill tracking, project showcases, and automated role management. Built with Discord.js, it creates an engaging environment for technical communities to grow and collaborate.

## ✨ Features

- **Professional 10-Tier System**
  - Structured progression from Apprentice to Tech Lead
  - Automatic role assignment with custom permissions
  - Specialized tracks for Developers and Designers

- **Achievement System**
  - Unlockable achievements based on various activities
  - Custom achievement icons and descriptions
  - Track user progress and milestones

- **Professional Development Tracking**
  - GitHub profile integration
  - Portfolio showcase feature
  - Skill badges for technical expertise
  - Project showcase with community feedback

- **User Statistics**
  - Detailed leaderboards for XP and levels
  - Individual rank cards with progress visualization
  - Message and voice activity tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 16.9.0 or higher
- PostgreSQL database
- Discord Bot Token
- Discord Developer Application with necessary intents enabled

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/suhaib3100/levelmaster.git
   cd levelmaster
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration

4. Set up the database
   ```bash
   psql -U your_username -d your_database -a -f src/models/schema.sql
   ```

5. Start the bot
   ```bash
   npm start
   ```

## 📝 Commands

### Level Management
- `/rank` - Display your current level and XP
- `/leaderboard` - Show server leaderboard
- `/setlevel` - Admin command to set user level
- `/reset` - Admin command to reset user stats

### Professional Development
- `/showcase add` - Add a new project to your showcase
- `/showcase view` - View project showcases from community members
- `/github link` - Link your GitHub profile
- `/github view` - View GitHub profiles and recent repositories
- `/skills add` - Add technical skill badges to your profile
- `/skills view` - View skill badges earned by community members

## ⚙️ Configuration

The bot can be configured through environment variables. See `.env.example` for available options.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Discord.js](https://discord.js.org/)
- [node-postgres](https://node-postgres.com/)
- [Canvas](https://www.npmjs.com/package/canvas)

## 📞 Support

If you need help or have questions, feel free to:

- Open an issue
- Join our [Discord support server]()
- Check out the [documentation](your-docs-link)

---

Made with ❤️ for the Discord community