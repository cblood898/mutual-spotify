let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ConsensualPlaylist = new Schema({
    title: String,
    description: String,
    updatedAt: Date,
    playlists: Array,
    spotifyData: Object,
});

module.exports = mongoose.model('ConsensualPlaylist', ConsensualPlaylist);
