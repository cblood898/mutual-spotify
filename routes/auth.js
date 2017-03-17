const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.user)
    next();
   else
     return res.json({ })
}

router.post('/signup', (req, res) => {
  let { email, password } = req.body;
  User.register(new User({username: email}), password, (err, user) => {
    if (err)
      return res.status(500).json(err);

    user.save( (err, user) => {
      if (err)
        return res.status(500).json(err);
      return res.json(user)
    });
  });
});

router.post('/signin', (req, res) => {
 let { email, password } = req.body
 User.findOne({ username: req.body.email}, (err, user) => {
   if (!user)
     return res.status(500).json({ message: 'Invalid Username Or Password' });
   user.authenticate(req.body.password, (err, user, passwordErr) => {
     if (err)
       return res.status(500).json({ message: 'Invalid Username Or Password' });
     if (passwordErr)
       return res.status(500).json({ message: 'Invalid Username Or Password' });

     req.logIn(user, (err) => {
       return res.json(user);
     })
   });
  });
});

router.get('/user', isAuthenticated, (req,res) => {
  return res.json(req.user);
});

router.post('/add_tracks', (req,res) => {
  const query = {'_id': req.user._id};
  const tracks = JSON.parse(req.body.tracks);
  const update = {
    [req.body.user_id]: {
      playlist_id: req.body.playlist_id,
      tracks
    }
  }
  User.findOneAndUpdate(
    query,
    {$push: { playlists: update }},
    {safe: true, upsert: true},
    (err, tracks) => {
      if (err)
        console.log('error adding tracks', err);
    }
  );
})

router.delete('/sign_out', (req, res) => {
  req.logout();
  res.status(200).json({});
});


module.exports = router;
