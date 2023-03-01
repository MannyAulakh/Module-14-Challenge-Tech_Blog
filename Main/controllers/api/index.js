const router = require('express').Router();
const userRoutes = require('./userRoutes');
const BlogRoutes = require('./BlogRoutes');
const dashboardRoutes = require('./dashboardRoutes')

router.use('/users', userRoutes);
router.use('/Blogposts', BlogRoutes);
router.use('/dashboard', dashboardRoutes)

module.exports = router;
