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
    
    document.getElementById("sisa").innerHTML = sisa;
    document.getElementById("price-discount").innerHTML = priceAfterDiscount;
    document.getElementById("price-tax").innerHTML = priceTax;
    document.getElementById("total-price").innerHTML = totalPrice;

    return credit;
}

const detail = answer(book, discount, tax, termOfCredit);

for (j = 0; j <= termOfCredit; j++) {
    console.log(detail[j]);
}
document.getElementById("title").innerHTML = book.title;
document.getElementById("price").innerHTML = book.price;
document.getElementById("stock").innerHTML = book.stock;

for (i = 0; i <= termOfCredit; i++ ) {
    var li = document.createElement("li");
    li.style.listStyle = "none";
    var textli = document.createTextNode( 'Bulan ke- : ' + detail[i].month + ' Cicilan : ' + detail[i].creditPrice + ' Sisa Pembayaran : ' + detail[i].paylater);
    li.appendChild(textli);
     
    document.getElementById("showlist").appendChild(li);
    }