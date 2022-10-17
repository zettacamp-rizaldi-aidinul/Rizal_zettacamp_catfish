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
const termOfCredit = 7;

function answer(book, discount, tax, termOfCredit) {
    let priceBook = 0;
    let months = 1;
    let sisa = 0;
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
    let totalDiscount = priceBook * discount;
    let totalTax = (priceBook - totalDiscount) * tax;
    let priceAfterDiscount = priceBook - totalDiscount;
    let priceTax = totalTax;
    let totalPrice = priceBook - totalDiscount + totalTax;
    let credit = []
    for (j = 0; j < termOfCredit; j++) {
        credit.push({
            "month" : months + j, 
            "creditPrice" : totalPrice / termOfCredit,
            "paylater" : (totalPrice - ((totalPrice / termOfCredit) * (j + 1)))
        })
    }   
    return credit;
}

const detail = answer(book, discount, tax, termOfCredit);

app.get('/checkAuth', checkAuth, (req, res) => {
  res.send(detail)
});