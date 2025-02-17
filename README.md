# LevelMaster - Advanced Discord Leveling Bot

LevelMaster is a feature-rich Discord bot that provides an advanced leveling system with achievements, role rewards, and detailed user statistics. Built with Discord.js, it offers a seamless experience for managing user engagement and activity tracking in your Discord server.

## ✨ Features

- **Advanced XP System**
  - Customizable XP gain from messages and voice activity
  - Anti-spam protection with configurable cooldowns
  - Voice channel activity tracking

- **Achievement System**
  - Unlockable achievements based on various activities
  - Custom achievement icons and descriptions
  - Track user progress and milestones

- **Role Rewards**
  - Automatic role assignment based on user levels
  - Configurable level requirements for each role
  - Server-specific role reward settings

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

- `/rank` - Display your current level and XP
- `/leaderboard` - Show server leaderboard
- `/setlevel` - Admin command to set user level
- `/reset` - Admin command to reset user stats

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