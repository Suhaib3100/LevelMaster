# LevelMaster - Professional Developer Community Discord Bot

LevelMaster is a sophisticated Discord bot designed specifically for developer and designer communities. It features a professional 10-tier leveling system with automatic role rewards, skill tracking, project showcases, and GitHub integration. Built with Discord.js, it creates an engaging environment for technical communities to grow and collaborate.

## ✨ Features

- **Advanced Role Management System**
  - Automatic role assignment based on user levels
  - Configurable role rewards for different level milestones
  - Seamless role progression as users level up
  - Administrative tools for role configuration

- **Professional 10-Tier System**
  - Structured progression from Apprentice to Tech Lead
  - Visual level-up notifications with custom cards
  - Experience (XP) tracking for user activities
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
- `/rank` - Display your current level and XP with a beautifully designed rank card
- `/leaderboard` - Show server leaderboard with top members
- `/setlevel` - Admin command to set user level (includes level-up notification)
- `/reset` - Admin command to reset user stats

### Role Management
- `/configroles` - Configure level-based role rewards (Admin only)
  - Set roles for different level milestones
  - Manage role hierarchy
  - View current role configuration

### Professional Development
- `/showcase add` - Add a new project to your showcase
- `/showcase view` - View project showcases from community members
- `/github link` - Link your GitHub profile
- `/github view` - View GitHub profiles and recent repositories
- `/skills add` - Add technical skill badges to your profile
- `/skills view` - View skill badges earned by community members

## ⚙️ Configuration

### Role Management Setup
Administrators can configure role rewards using the `/configroles` command. This allows you to:
- Assign roles to specific level milestones
- Set up automatic role progression
- Manage role hierarchies effectively

### Environment Variables
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

- Discord.js community for their excellent documentation
- Contributors who have helped improve the bot
- The developer community for their feedback and support