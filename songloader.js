const DataLoader = require('dataloader');

const songModel = require('./songmodel')

const loadSong = async function (songIds) {
    const songList = await songModel.find({
        id: {
            $in: songIds
        }
    })

    const songMap = {}

    songList.forEach(song => {
        songMap[song.id] = song
    })
    return songIds.map(id => songMap[id])
}

const playlistSongLoader = new DataLoader(loadSong)
module.exports = playlistSongLoader