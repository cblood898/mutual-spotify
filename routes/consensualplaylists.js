const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const ConsensualPlaylist = require('../models/ConsensualPlaylist');

router.get('/', function( req, res ) {
    ConsensualPlaylist.find( function(err, note) {
        res.render('ConsensualPlaylist', { title: 'Consensual Playlist', ConsensualPlaylists: ConsensualPlaylist } );
    });
});

router.post('/', function( req, res ) {
    new ConsensualPlaylist({
        title: req.body.title,
        description: req.body.description,
        updatedAt: Date.now()
    }).save( function( err, note ) {
        res.redirect('/ConsensualPlaylist');
    });
});

router.get('/:id', function ( req, res ) {
    ConsensualPlaylist.findById(req.params.id, function( err, note ) {
      res.render('note', { title: ConsensualPlaylist.title, ConsensualPlaylist: ConsensualPlaylist});
    });
});

router.delete('/:id', function( req, res ) {
    ConsensualPlaylist.findById(req.params.id, function (err, ConsensualPlaylist) {
        note.remove( function ( err, ConsensualPlaylist ) {
            res.redirect('/ConsensualPlaylist');
        });
    });
});

router.put('/:id', function( req, res ) {
    var body = {
        title: req.body.title,
        description: req.body.description,
        updatedAt: Date.now()
    }

    ConsensualPlaylist.findByIdAndUpdate(req.params.id,
    {
        $set: body
    },
    function ( err, note ) {
        res.redirect('/ConsensualPlaylist/'+req.params.id);

    });
});

router.post('/:id/add_tracks', (req,res) => {
  const query = {'_id': req.params.id};
  const tracks = JSON.parse(req.body.tracks);
  const update = {
    [req.body.user_id]: {
      playlist_id: req.body.playlist_id,
      tracks
    }
  }
  ConsensualPlaylist.findOneAndUpdate(
    query,
    {$push: { playlists: update }},
    {safe: true, upsert: true},
    (err, tracks) => {
      if (err)
        console.log('error adding tracks', err);
    }
  );
})




module.exports = router;
