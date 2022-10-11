let book = {
    title : "Cinderella",
    price : 120000
}

const discount = 0.05;
const tax = 0.1;

function answer(book, discount, tax) {
    let totalDiscount = book.price * discount;
    let totalTax = (book.price - totalDiscount) * tax;
    let resultPrice = {
        priceDiscount : totalDiscount,
        priceAfterDiscount : book.price - totalDiscount,
        priceTax : totalTax,
        totalPrice : book.price - totalDiscount + totalTax
    }
    return resultPrice;
}

const detail = answer(book, discount, tax);

document.getElementById("title").innerHTML = book.title;
document.getElementById("price").innerHTML = book.price;
document.getElementById("price-discount").innerHTML = detail.priceAfterDiscount;
document.getElementById("price-tax").innerHTML = detail.priceTax;
document.getElementById("total-price").innerHTML = detail.totalPrice;



