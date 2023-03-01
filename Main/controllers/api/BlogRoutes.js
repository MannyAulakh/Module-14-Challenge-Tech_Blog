const router = require('express').Router();
const { Blogpost } = require('../../models');
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

//------------Update Blog------------
router.put('/', withAuth, async (req, res) => {
  try {
    const newPost = await Blogpost.update({
      title: req.body.title,
      contents: req.body.description
    }, {
      where: { id: req.body.post_id }
    })

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//------------Post Comment------------
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Comment.create({
      comment_descr: req.body.comment_descr,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
