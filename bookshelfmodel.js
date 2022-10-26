const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateIndonesia = moment.tz(Date.now(), "Asia/Bangkok");

const mongoDB = "mongodb://localhost/zettacamp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const Schema = mongoose.Schema;

const bookshelfsSchema = new Schema ({
    shelf_name : String,
    book_id : [String],
    created_at : { type: Date, default: dateIndonesia },
    updated_at : { type: Date, default: dateIndonesia }
  })
  
const bookshelfs = mongoose.model('bookshelfs', bookshelfsSchema)
module.exports = bookshelfs;