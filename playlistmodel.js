const mongoose = require('mongoose');

const mongoDB = "mongodb://localhost/zettacamp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const Schema = mongoose.Schema;
const playlistsSchema = new Schema ({
    title: String,
    duration: Number,
    song_ids: [Number]
}, {timestamps: true})

const playlists = mongoose.model('playlists', playlistsSchema)
module.exports = playlists;