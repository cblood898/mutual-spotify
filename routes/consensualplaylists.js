const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const ConsensualPlaylist = require('../models/consensualplaylist');

router.get('/', function(req, res) {
  ConsensualPlaylist.find(function(err, cplists) {
    // console.log(cplists)
    res.json(cplists);
  });
});

router.post('/', function(req, res) {
  const spotifyData = JSON.parse(req.body.spotifyData);
  new ConsensualPlaylist({
    title: req.body.title,
    description: req.body.description,
    spotifyData: spotifyData,
    updatedAt: Date.now(),
  })
  .save(function(err, cplist) {
    console.log(err)
    res.json(cplist);
  });
});

router.get('/:id', function(req, res) {
  ConsensualPlaylist.findById(req.params.id, function(err, note) {
    res.render('note', {
      title: ConsensualPlaylist.title,
      ConsensualPlaylist: ConsensualPlaylist
    });
  });
});

router.delete('/:id', (req, res) => {
  ConsensualPlaylist.findById(req.params.id, (err, cplist) => {
    cplist.remove((err, list) => {
      res.json(list)
    });
  });
});

router.put('/:id', (req, res) => {
  var body = {
    title: req.body.title,
    description: req.body.description,
    updatedAt: Date.now()
  }

  ConsensualPlaylist.findByIdAndUpdate(req.params.id, {
    $set: body
  }, (err, note) => {
    res.redirect('/cplists/' + req.params.id);

  });
});

router.post('/:id/add_tracks', (req, res) => {
  const query = {
    '_id': req.params.id
  };
  const tracks = JSON.parse(req.body.tracks);
  const update = {
    username: req.body.user_id,
    playlist_name: req.body.playlist_name,
    cplist_id: req.params.id,
    tracks
  }
  ConsensualPlaylist.findOneAndUpdate(query, {
    $push: {
      playlists: update
    }
  }, {
    safe: true,
    upsert: true,
    new: true
  }, (err, tracks) => {
    if (err)
      console.log('error adding tracks', err);
    res.json(tracks)
  });
})

router.put('/:id/add_uris', (req, res) => {
  const query = {
    '_id': req.params.id
  };
  const uris = JSON.parse(req.body.uris);
  ConsensualPlaylist.findOneAndUpdate(query, {
    tracksInSpotifyPlaylist: uris
  }, {
    safe: true,
    upsert: true,
    new: true
  }, (err, playlist) => {
    console.log(playlist)
    if (err)
      console.log('error adding tracks', err);
    else{
      res.json(playlist)
      console.log(playlist)
    }
  });
})

module.exports = router;
