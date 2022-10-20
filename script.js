const e = require('express');
const express = require('express');
const { resolve } = require('path');
const app = express();
const port = 4000;
var fs = require('fs').promises;
var event = require("events");
const EventEmitter = new event.EventEmitter();

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
  return {
    valPrice,
    priceTotal,
    readFile
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
    // listBookObjectReal,
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


// EventEmitter.on('check', readDataFile)
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
  console.log(detail);
  res.send(detail)
});

app.get('/setAndMap', checkAuth, async (req, res) => {
  const detailMap = cekmap()
  const detailSet = cekset()
  res.send({detailMap, detailSet})
})


