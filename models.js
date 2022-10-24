const mongoose = require('mongoose');

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
  created_at : { type: Date, default: Date.now() },
  updated_at : { type: Date, default: Date.now() }
})

const books = mongoose.model('books', booksSchema);
 module.exports = books;