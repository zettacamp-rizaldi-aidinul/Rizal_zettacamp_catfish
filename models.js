const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateIndonesia = moment.tz(Date.now(), "Asia/Bangkok");

const mongoDB = "mongodb://localhost/zettacamp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const Schema = mongoose.Schema;
const booksSchema = new Schema ({
  title : String,
  author : String,
  date_published : Date,
  price : Number,
  created_at : { type: Date, default: dateIndonesia },
  updated_at : { type: Date, default: dateIndonesia }
})

const books = mongoose.model('books', booksSchema);
 module.exports = books;