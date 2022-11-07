const BookModel = require('./models')
const BookshelfModel = require('./bookshelfmodel')
const bookshelf = require('./bookshelfmodel')
const ShelfbookbyDate = require('./dateloader');

async function getAllBooks(_, {pagination2}) {
    const book = await BookModel.aggregate([
        {$facet: 
            {
                "Books":[
                    {$skip: (pagination2.skip*pagination2.limit)},
                    {$limit: pagination2.limit}
                ],
                "Page":[
                    {$group: {_id: null, count: {$sum: 1}}}
                ]
            }
        }
    ])
    console.log(book[0].Books)
    return book
        
}

async function getBook(_, args) {
    const book = await BookModel.findById(args._id)
    console.log(book)
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

async function getPagination(_, {limit, skip}){
    const book = await BookModel.aggregate([
        {$facet: 
            {
                "Books":[
                    {$skip: (skip*limit)},
                    {$limit: limit}
                ],
                "Page":[
                    {$group: {_id: null, count: {$sum: 1}}}
                ]
            }
        }
    ])
    console.log(book[0].Books)
    return book[0].Books
}

async function getAllBookshelf(parent, args, context){
    // const bookId = context.book[0]._id
    // const dateId = context.date[0]._id
    console.log(context)
    const result = await BookshelfModel.find({
        // $or: [{
        //     created_by: userId
        // },
        // {
        //     added_date: dateId
        // }]
    })
    return result
}

const getShelfbookbyDate = async function (parent, args, context) {
    // console.log(parent.created_by);
    console.log(context)
    if (parent.book_id) {
        return await context.ShelfbookbyDate.load(parent.book_id);
    };
};

module.exports = {
    Query: {
        getAllBooks,
        getBook,
        getPagination,
        getAllBookshelf
    },

    Mutation: {
        createBook,
        updateBook,
        deleteBook,
        // calculatePrices
        
    },

    detailbook: {
        book_id: getShelfbookbyDate
    }
}