const DataLoader = require('dataloader');

const BookshelfModel = require('./bookshelfmodel')

const loadDate = async function (dateIds) {
    const dateList = await BookshelfModel.find({
        _id: {
            $in: dateIds
        }
    })

    const dateMap = {}

    dateList.forEach(date => {
        dateMap[date._id] = date
    })
    return dateIds.map(id => dateMap[id])
}

const bookshelfLoader = new DataLoader(loadDate)
module.exports = bookshelfLoader