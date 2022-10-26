const e = require('express');
const express = require('express');
const { resolve } = require('path');
const app = express();
const port = 4000;
var fs = require('fs').promises;
var event = require("events");
const mongoose = require('mongoose');
const mongoDB = require("./models")
const bookShelf = require("./bookshelfmodel")
const { title } = require('process');
const { read } = require('fs');
const bookshelf = require('./bookshelfmodel');

const date = new Date()
const currentDate = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
const dateTime = date.getHours() + ":" + date.getMinutes() + ":" + date .getSeconds();

const checkAuth = (req, res, next) => {
  const auth = req.headers["authorization"];

  const userpass = auth.split(" ")[1];
  const text = Buffer.from(userpass, "base64").toString("ascii");

  const username = text.split(":")[0];
  const password = text.split(":")[1];

  if (username == 'admin' && password == 'admin') 
  {
    return next();
  } else {
    return res.json("Access Denied.");
  }
};

app.listen(port);

let book = {
    title : "Cinderella",
    price : 100000,
    stock : 30,
    amount : 20
}



const discount = 0.05;
const tax = 0.1;
const creditMonth = 0.01;
const termOfCredit = 3;
let sisa = 0;

function calculatePrice(discount, tax) {
  priceBook = 0;
  for (i = 1; i <= book.stock; i++) {
    priceBook = priceBook + book.price;
    if (book.amount > 0) {
        book.amount--;
        sisa = book.stock - i;
    }
    else {
        break;
    }
  }
  let totDiscount = priceBook * discount;
  let totTax = priceBook - (totDiscount * tax);
  let varPrice = {
    bookPrice : priceBook,
    totalDiscount : totDiscount,
    totalTax : totTax,
    priceAfterDiscount : priceBook - totDiscount,
    totalPrice : priceBook - totDiscount + totTax
  };
  return varPrice;
}

async function PriceOfCredit(termOfCredit, valPrice, creditMonth) {
  let months = 1;
  let credit = []
  let creditCash;
  for (j = 0; j < termOfCredit; j++) {
    if(termOfCredit <= 3){
      creditCash = (valPrice.totalPrice / termOfCredit) + ((valPrice.totalPrice / termOfCredit) * (creditMonth * (j+1))) + 100000;
      if(j+1 == 2) {
        creditCash += 10000;
      }
      const x = j + 1 === 2 ? 1000 : ''
      credit.push({
        "month" : months + j,
        "creditPrice" : creditCash,
        "paylater" : (valPrice.totalPrice - ((valPrice.totalPrice / termOfCredit) * (j + 1)))
      })
    }
    else if(termOfCredit <= 6){
      creditCash = (valPrice.totalPrice / termOfCredit) + ((valPrice.totalPrice / termOfCredit) * (creditMonth * (j+1))) + 5000;
      credit.push({
        "month" : months + j,
        "creditPrice" : creditCash,
        "paylater" : (valPrice.totalPrice - ((valPrice.totalPrice / termOfCredit) * (j + 1)))
      })
    }
    else {
      creditCash = (valPrice.totalPrice / termOfCredit) + ((valPrice.totalPrice / termOfCredit) * (creditMonth * (j+1)));
      credit.push({
        "month" : months + j,
        "creditPrice" : creditCash,
        "paylater" : (valPrice.totalPrice - ((valPrice.totalPrice / termOfCredit) * (j + 1)))
      })
    }
  }
  return credit
}


function readDataFile (){
  const result = fs.readFile('./file.txt', 'utf-8').catch((error) => console.log(error.message));
  return result
}

async function bookPurchasing() {
  
  const valPrice = calculatePrice(discount,tax);
  const priceTotal = await PriceOfCredit(termOfCredit, valPrice, creditMonth);
  const readFile = await readDataFile();
  
const books = mongoose.model("books", booksSchema);
  return {
    valPrice,
    priceTotal,
    readFile,
  }
}
function cekmap() {
  // let map = new Map(Object.entries(book));
  let listBookMap = new Map([[1212, "Cinderella"]]); 
  listBookMap.set(32154,'Harry Potter')
  .set(21312, 'Tere Liye')
  .set(214212, 'Naruto')
  
  const listBookObject = Array.from(listBookMap);
  // const listBookObjectReal = Object.fromEntries(listBookMap);
  const listBookObjectKey = Array.from(listBookMap.keys());
  const listBookObjectValue = Array.from(listBookMap.values());
  return {
    listBookObject,
    listBookObjectKey,
    listBookObjectValue
  }
}

function cekset(){
  let akhdani = "Akhdani"
  let listBookSet = new Set ();
  listBookSet.add('Akhdani');
  listBookSet.add(akhdani)
  const listBookArray = Array.from(listBookSet);
  return listBookArray;
}

app.get('/withoutAwait', checkAuth, async (req, res) => {
  // const detail = EventEmitter.emit('check');
  const detail = readDataFile();
  detail.then(
    function(param) {
      console.log(param)
      res.send(param)
    }
  )
});

app.get('/withAwait', checkAuth, async (req, res) => {
  const detail = await bookPurchasing();
  console.log(findBook);
  res.send(detail)
});

app.get('/setAndMap', checkAuth, async (req, res) => {
  const detailMap = cekmap()
  const detailSet = cekset()
  res.send({detailMap, detailSet})
})

app.post('/createBook', checkAuth, async (req, res) => {
  const addData = await mongoDB.create({
    title : "Lord of The Rings",
    author : "Someone",
    data_published : '1999-11-26',
    price : 70000
  },
  {
    title : "Bulan",
    author : "Tere Liye",
    data_published : '2015-09-21',
    price : 60000
  },
  {
    title : "Bintang",
    author : "Tere Liye",
    data_published : '2016-11-26',
    price : 70000
  },
  {
    title : "Matahari",
    author : "Tere Liye",
    data_published : '2017-12-29',
    price : 70000
  },
  {
    title : "Lord of The Rings 2",
    author : "Someone",
    data_published : '1999-11-26',
    price : 80000
  },
  {
    title : "Sepatu Dahlan",
    author : "Someone",
    data_published : '2013-11-26',
    price : 70000
  },
  {
    title : "Surat Dahlan",
    author : "Someone",
    data_published : '2015-11-26',
    price : 120000
  },
  {
    title : "Lord of The Rings",
    author : "Someone",
    data_published : '1999-11-26',
    price : 70000
  },
  {
    title : "Lord of The Rings",
    author : "Someone",
    data_published : '1999-11-26',
    price : 70000
  },
  {
    title : "Lord of The Rings",
    author : "Someone",
    data_published : '1999-11-26',
    price : 90000
  }
  );
  try {
    res.send(addData)
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/readBook', checkAuth, async (req, res) => {
  const findBook =  await mongoDB.find();
  res.send(findBook);
})

app.post('/updateBook', checkAuth, async (req, res) => {
  const cekData = await mongoDB.find({title : "The Star and I"})
  if(!cekData) return res.status(404).json({message: "Data Tidak Ditemukan"})
  else {
    const updateBook = await mongoDB.updateOne({title : "The Star and I"}, {$set: {'updated_at' : Date.now(), 'author' : "Ilana"}});
    res.send(updateBook);
  }
})

app.delete('/deleteBook', checkAuth, async (req, res) => {
  const cekData = await mongoDB.find({title : "The Star and I"})
  if(!cekData) return res.status(404).json({message: "Data Tidak Ditemukan"})
  else {
    const deleteBook = await mongoDB.deleteMany({title : "The Star and I"})
    res.send(deleteBook);
  }
})

app.get('/readbookshelf', checkAuth, async (req, res) => {
  const readData = await bookShelf.find({})
  res.send(readData);
})

app.post('/insertbookshelf', checkAuth, async (req, res) => {
  const addData = new bookShelf({
    shelf_name : "Lord of The Rings",
    book_ids : [{
      book_id : "63589556a0a72840a8f30393",
      stock : 32
    },{
      book_id : "63589556a0a72840a8f30397",
      stock : 15
    },{
      book_id : "63589556a0a72840a8f3039a",
      stock : 9 
    },{
      book_id : "63589556a0a72840a8f3039b",
      stock : 9
    }],
    date : {date : currentDate, time : dateTime}
  });
  try {
    await addData.save()
    res.send("add bookshelf success")
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/readbookshelf/book1', checkAuth, async (req, res) => {
  const readData = await bookShelf.find({book_id: {$elemMatch: {$in: ['6356515e37f2895624855136']}}});
  try {
    res.send(readData)
  } catch {
    res.status(500).send(err);
  }
})

app.get('/readbookshelf/book2', checkAuth, async (req, res) => {
  const readData = await bookShelf.find({book_id: {$elemMatch: {$in: ['6356515e37f2895624855136', '6356515e37f2895624855137']}}})
  try {
    res.send(readData)
  } catch {
    res.status(500).send(err);
  }
})

app.post('/updatebookshelf', checkAuth, async (req, res) => {
  const updateBookshelf = await bookShelf.updateMany({}, {$set: {"book_ids.$[temps].stock" : 10}}, {arrayFilters : [{"temps.stock" : {$lte : 10}}]});
  try {
    res.send(updateBookshelf);
  } catch {
    res.status(500).send(err);
  }
})

app.delete('/deletebookshelf', checkAuth, async (req, res) => {
  const cekData = await bookShelf.find({shelf_name : "Comedy"})
  if(!cekData) return res.status(404).json({message: "Data Tidak Ditemukan"})
  else {
    const deleteBookshelf = await bookShelf.deleteMany({shelf_name : "Comedy"})
    res.send(deleteBookshelf);
  }
})