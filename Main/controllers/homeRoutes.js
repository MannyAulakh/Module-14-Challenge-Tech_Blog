const router = require('express').Router();
const { Blogpost, User } = require('../models');
const Comment = require('../models/Comment')
const withAuth = require('../utils/auth');

//Get All Blogs For Home Page
router.get('/', async (req, res) => {
  try {
    // Get all Blogposts and JOIN with user data
    const blogData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const Blog = blogData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      Blog, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Get Data For Blog Page
router.get('/blogpost/:id', async (req, res) => {
  try {
    //Get Data for click on Blog
    const blogData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    //Get related comments
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      where: [
      {
        post_id: req.params.id
      }
      ],
    })

    const comments = commentData.map((project) => project.get({ plain: true }));

    //Check to see if User is Creator of Blog
    var userCanEdit = false
    if (blog.user_id == req.session.user_id) {
      userCanEdit = true
    }

    res.render('blog', {
      blog,
      comments,
      logged_in: req.session.logged_in,
      userCanEdit
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Data For Dashboard Page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get All Blogs Created By User
    const projectData = await Blogpost.findAll({
      where: [
      {
        user_id: req.session.user_id
      }],
    })

    const blog = projectData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log-In Page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
