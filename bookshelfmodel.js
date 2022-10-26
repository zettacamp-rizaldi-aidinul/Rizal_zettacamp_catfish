const mongoose = require('mongoose');
const moment = require('moment-timezone');
const { ObjectId } = require('mongoose');
const dateIndonesia = moment.tz(Date.now(), "Asia/Bangkok");

const mongoDB = "mongodb://localhost/zettacamp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const Schema = mongoose.Schema;

const bookshelfSchema = new Schema ({
    shelf_name : String,
    book_ids : [{
      book_id : ObjectId,
      added_date : {type: Date, default: dateIndonesia},
      stock : Number
    }],
    date : [{date : String, time : String}],
  }, {timestamps: true})
  
const bookshelf = mongoose.model('bookshelf', bookshelfSchema)
module.exports = bookshelf;