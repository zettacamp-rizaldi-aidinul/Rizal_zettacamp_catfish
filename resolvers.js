const BookModel = require('./models')
const stock = 20
const amount = 15
const discount = 0.05;
const tax = 0.1;
const creditMonth = 0.01;
const termOfCredit = 3;
let sisa = 0;

async function getAllBooks() {
    const book = await BookModel.find()
    // dateString = dataBooks.date_published.toString()
    // dataBooks.date_published = dateString
    return book
        
}

async function getBook(_, args) {
    const book = await BookModel.findById(args.id)
    return book
}

async function createBook (_, args){
    const book = new BookModel(args)
    await book.save()
    return book
}

async function updateBook (_, args){
    const book = await BookModel.findByIdAndUpdate(args._id, args, {new: true})
    return book
}

async function deleteBook (_, args){
    const book = await BookModel.deleteOne(args.id)
    if(book) return true
    else return false
}

async function calculatePrice (_, args){
    const book = await BookModel.findById("63589556a0a72840a8f3039c")
    const priceBook = 0;
    
    for (i = 1; i <= stock; i++) {
        priceBook = priceBook + book.price;
        if (amount > 0) {
            amount--;
            sisa = stock - i;
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

module.exports = {
    Query: {
        getAllBooks,
        getBook,
        
    },

    Mutation: {
        createBook,
        updateBook,
        deleteBook,
        calculatePrice
    }
}