const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let remember = false;
  if (req.user)
    remember = Object.keys(req.user).length;
  res.render('index', { title: 'Jamify', remember });
});

module.exports = router;
