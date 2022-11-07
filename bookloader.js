const DataLoader = require('dataloader');

const BookModel = require('./models')

const loadBook = async function (bookIds) {
    const bookList = await BookModel.find({
        _id: {
            $in: bookIds
        }
    })

    const bookMap = {}

    bookList.forEach(book=> {
        bookMap[book._id] = book
    })
    return bookIds.map(id => bookMap[id])
}

const bookshelfLoader = new DataLoader(loadBook)
module.exports = bookshelfLoader