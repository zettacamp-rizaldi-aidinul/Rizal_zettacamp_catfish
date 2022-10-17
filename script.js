const express = require('express');
const app = express();
const port = 4000;

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

async function bookPurchasing() {
  
  const valPrice = calculatePrice(discount,tax);
  const priceTotal = await PriceOfCredit(termOfCredit, valPrice, creditMonth);
  console.log(priceTotal);  
  return {
    priceTotal,
    valPrice
  }
}

app.get('/checkAuth', checkAuth, async (req, res) => {
  const detail = await bookPurchasing();
  console.log(detail);
  res.send(detail)
});

// app.get('/async-function', async function (req, res, next) {
//   const timeout = setTimeout(function () {
//     console.log('ok');
//   }, 1000);
//   const result = await calculatePrice(discount, tax);
//   console.log(result);
//   console.log('oke done async');
// }); 