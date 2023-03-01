const sequelize = require('../config/connection');
const { User, Blogpost} = require('../models');
const Comment = require('../models/Comment')

const userData = require('./userData.json');
const BlogpostData = require('./blogpostData.json');
const commentData = require('./commentsData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of BlogpostData) {
    await Blogpost.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const com of commentData) {
    await Comment.create({
      ...com,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: users[Math.floor(Math.random() * Blogpost.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
