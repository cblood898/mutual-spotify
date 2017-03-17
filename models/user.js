let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let User = new Schema({
  username: { type : String, unique : true, required : true, dropDups: true },
  password: { type : String },
  role: { type: String, default: 'user' },
  image: { type: String },
  spotify_auth: { type: Object },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model( 'User', User );
