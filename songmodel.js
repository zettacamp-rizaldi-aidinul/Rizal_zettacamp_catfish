const mongoose = require('mongoose');

const mongoDB = "mongodb://localhost/zettacamp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const Schema = mongoose.Schema;
const songsSchema = new Schema ({
    title: String,
    artist: String,
    genre: String,
    duration: String
}, {timestamps: true})

const songs = mongoose.model('songs', songsSchema)
module.exports = songs;