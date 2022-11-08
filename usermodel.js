const mongoose = require('mongoose');

const mongoDB = "mongodb://localhost/zettacamp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const Schema = mongoose.Schema;
const usersSchema = new Schema ({
    name: String,
    password: String,
    email: String,
    address: String
}, {timestamps: true})

const users = mongoose.model('users', usersSchema)
module.exports = users;