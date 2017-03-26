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

router.delete('/:id', function(req, res) {
  ConsensualPlaylist.findById(req.params.id, function(err, ConsensualPlaylist) {
    note.remove(function(err, ConsensualPlaylist) {
      res.redirect('/ConsensualPlaylist');
    });
  });
});

router.put('/:id', function(req, res) {
  var body = {
    title: req.body.title,
    description: req.body.description,
    updatedAt: Date.now()
  }

  ConsensualPlaylist.findByIdAndUpdate(req.params.id, {
    $set: body
  }, function(err, note) {
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
    upsert: true
  }, (err, tracks) => {
    if (err)
      console.log('error adding tracks', err);
    }
  );
})

// router.post('/:id/add_spotify_data', (req, res) => {
//   const query = {
//     '_id': req.params.id
//   };
//   const spotifyPlaylist = JSON.parse(req.body.playlist);
//   const update = {
//     id: spotifyPlaylist.id,
//     url: spotifyPlaylist.external_urls.spotify,
//     uri: spotifyPlaylist.uri,
//   }
//   console.log(update)
//   ConsensualPlaylist.findOneAndUpdate(query, {
//     $push: {
//       spotifyData: update
//     }
//   }, {
//     safe: true,
//     upsert: true
//   }, (err) => {
//     if (err)
//       console.log('error saving spotify playlist data', err);
//     }
//   );
// })

module.exports = router;
