-- Users table to store user information and levels (max 10 levels)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    guild_id VARCHAR(255) NOT NULL,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 0 CHECK (level >= 0 AND level <= 10),
    message_count INTEGER DEFAULT 0,
    last_message_timestamp TIMESTAMP,
    voice_join_timestamp TIMESTAMP,
    is_in_voice BOOLEAN DEFAULT FALSE,
    primary_skill VARCHAR(50),
    github_username VARCHAR(255),
    portfolio_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, guild_id)
);

-- Achievements table to track user achievements
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    requirement_type VARCHAR(50) NOT NULL,
    requirement_value INTEGER NOT NULL,
    icon_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements junction table
CREATE TABLE IF NOT EXISTS user_achievements (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    guild_id VARCHAR(255) NOT NULL,
    achievement_id INTEGER REFERENCES achievements(id),
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, guild_id, achievement_id)
);

-- Role rewards table with predefined levels
CREATE TABLE IF NOT EXISTS role_rewards (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255) NOT NULL,
    role_id VARCHAR(255) NOT NULL,
    level_name VARCHAR(50) NOT NULL,
    required_level INTEGER NOT NULL CHECK (required_level >= 0 AND required_level <= 10),
    role_color VARCHAR(7),
    role_permissions BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(guild_id, role_id)
);

-- Project showcase table
CREATE TABLE IF NOT EXISTS project_showcases (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    guild_id VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    project_url TEXT,
    thumbnail_url TEXT,
    technologies TEXT[],
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id, guild_id) REFERENCES users(user_id, guild_id)
);

-- Skill badges table
CREATE TABLE IF NOT EXISTS skill_badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    icon_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User skill badges junction table
CREATE TABLE IF NOT EXISTS user_skill_badges (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    guild_id VARCHAR(255) NOT NULL,
    badge_id INTEGER REFERENCES skill_badges(id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, guild_id, badge_id)
);