let book = {
    title : "Cinderella",
    price : 120000,
    stock : 30
}

const discount = 0.05;
const tax = 0.1;

function answer(book, discount, tax) {
    amount = 30
    let priceBook = 0;
    let sisa = 0
    if (amount <= book.stock) {
        for (i = 1; i <= amount; i++) {
            priceBook = priceBook + book.price;
            sisa = book.stock-amount;
        }
    }
    else {
        priceBook = book.price * book.stock;
        sisa = book.stock-amount;
    }
    let totalDiscount = priceBook * discount;
    let totalTax = (priceBook - totalDiscount) * tax;
    let resultPrice = {
        priceDiscount : totalDiscount,
        priceAfterDiscount : priceBook - totalDiscount,
        priceTax : totalTax,
        totalPrice : priceBook - totalDiscount + totalTax,
        sisaBuku : sisa
    }   
    return resultPrice;
}

const detail = answer(book, discount, tax);

document.getElementById("title").innerHTML = book.title;
document.getElementById("price").innerHTML = book.price;
document.getElementById("stock").innerHTML = book.stock;
document.getElementById("sisa").innerHTML = detail.sisaBuku;
document.getElementById("price-discount").innerHTML = detail.priceAfterDiscount;
document.getElementById("price-tax").innerHTML = detail.priceTax;
document.getElementById("total-price").innerHTML = detail.totalPrice;