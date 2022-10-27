const mongoose = require('mongoose');
const moment = require('moment-timezone');
const { ObjectId } = require('mongoose');
const dateIndonesia = moment.tz(Date.now(), "Asia/Bangkok");
const date = new Date()
const currentDate = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
const dateTime = date.getHours() + ":" + date.getMinutes() + ":" + date .getSeconds();


const mongoDB = "mongodb://localhost/zettacamp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const Schema = mongoose.Schema;

const bookshelfSchema = new Schema ({
    shelf_name : String,
    book_ids : [{
      book_id : mongoose.Types.ObjectId,
      added_date : {type: Date, default: dateIndonesia},
      stock : Number
    }],
    date : [{date : {type: String, default : currentDate}, time : {type: String, default : dateTime}}],
  }, {timestamps: true})
  
const bookshelf = mongoose.model('bookshelf', bookshelfSchema)
module.exports = bookshelf;