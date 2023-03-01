const router = require('express').Router();
const { Blogpost } = require('../../models');
const withAuth = require('../../utils/auth');

//------------Post New Blog------------
router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Blogpost.create({
        title: req.body.title,
        contents: req.body.description,
        user_id: req.session.user_id
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
});

//------------Delete Blog------------
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

