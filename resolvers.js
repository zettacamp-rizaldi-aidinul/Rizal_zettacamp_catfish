const { buildSchema } = require("graphql");
const songModel = require('./songmodel')
const playlistModel = require('./playlistmodel')
const userModel = require('./usermodel')
const playlistSongLoader = require('./songloader');

async function getAllSong(_,  {pagination}) {
    const song = await songModel.aggregate([
        {$facet: 
            {
                "Song":[
                    {$skip: (+pagination.skip*+pagination.limit)},
                    {$limit: pagination.limit}
                // ],
                // "Page":[
                //     {$group: {_id: null, count: {$sum: 1}}}
                ]
            }
        }
    ])
    return song[0].Song
    // song.map(param => {
    //     return {
    //         ...param,
    //         count_document: song[0].Page[0].count}
    // })
}

async function getSong(_, args) {
    const song = await songModel.findById(args._id)
    console.log(song)
    return song
}

async function createSong(_, args) {
    const song = new songModel(args)
    await song.save()
    return song
}

async function updateSong (_, args){
    const song = await songModel.findByIdAndUpdate(args.id, args, {new: true})
    return song
}

async function deleteSong (_, args){
    const song = await songModel.deleteOne(args._id)
    if(song) return true
    else return false
}

async function insertUser (parent, {user_input}){
    try {
        if(user_input){
            const {
                name,
                email,
                password,
                address
            } = user_input;
            const newUser = new userModel ({
                name: name,
                email: email,
                password: password,
                address: address
            })
            console.log(newUser)
            await newUser.save()
            return newUser
        }else
        throw new Error('Please input data first');
    }catch (err) {
        throw new Error(`Error insert user : ${err.message}`);
    }
}

async function loginUser (parent, {user_input}) {
    try {
        if(user_input){
            const {
                email, 
                password
            } = user_input
            const checkEmail = await userModel.find({email: email})
            
            if (Object.keys(checkEmail).length === 0){
                throw new Error('No email in Database');
            }else {
                if (checkEmail[0].password === password){
                    console.log(checkEmail)
                    return {
                        name: checkEmail[0].name,
                        email: checkEmail[0].email,
                        password: checkEmail[0].password,
                        address: checkEmail[0].address
                    } 
                }else{
                    throw new Error(`Wrong Password`);
                }
            }
        }
    }catch (err) {
        throw new Error(`Error login : ${err.message}`);
    }
}

async function getAllUser(_,  {pagination}) {
    const user = await userModel.aggregate([
        {$facet: 
            {
                "User":[
                    {$skip: (+pagination.skip*+pagination.limit)},
                    {$limit: pagination.limit}
                ],
                "Page":[
                    {$group: {_id: null, count: {$sum: 1}}}
                ]
            }
        }
    ])

    user.map(param => {
        console.log(param)
        return param
    })
}

async function getAllPlaylist(parent, args, context){
    try {
        const result = await playlistModel.find({})
        return result
    }catch (err){
        throw new Error(`Error getting all playlist ${err.message}`);
    }
}

async function getOnePlaylist(parent, args, context) {
    try {
        const result = await playlistModel.findById(args._id)
        return result
    }catch (err){
        throw new Error(`Error getting playlist ${err.message}`);
    }
}


async function createPlaylist(parent, {playlist_input}){
    // try{
    //     if(playlist_input){
    //         const {
    //             title, 
    //             duration
    //         } = playlist_input
    //         const songCheck = await songModel.find()
    //         let TotalDuration = 0;
    //         let groups = [];
    //         // for (let songs in song){
    //         for (i = 0; i <= songCheck.length; i++){
    //             const random = Math.floor(Math.random() * songCheck.length)
    //             const songrandom = groups.some(varl => varl.id === songCheck[random].id)
    //             const durationSong = songCheck[random].duration
    //             if (songrandom == false){
    //             if (TotalDuration <= 3600) {
    //                 const time = durationSong.split(":");
    //                 let durationTime = Number(time[0]) * 60 + Number(time[1])
    //                 TotalDuration += durationTime;
    //                 groups.push(songCheck[random].id);
    //             }
    //             else {
    //                 break;
    //             }
    //             }
    //         }
    //     }
    // console.log(groups)
    // return groups;
    // }catch{
    //     throw new Error(`Error insert playlist : ${err.message}`);
    // }
}

async function getPlaylistSongLoader(parent, args, context){
    // console.log(await context.getPlaylistSongLoader)
    if(parent.song_ids){
        return await context.getPlaylistSongLoader.loadMany(parent.song_ids)
    }
}

async function getUser(_, args) {
    const user = await songModel.findById(args._id)
    console.log(user)
    return user
}

module.exports = {
    Query: {
        getAllSong,
        getSong,
        getAllUser,
        getUser,
        getAllPlaylist,
        getOnePlaylist
    },

    Mutation: {
       createSong,
       updateSong,
       deleteSong,
       insertUser,
       loginUser,
       createPlaylist
    },
    Playlist: {
        song_ids: getPlaylistSongLoader
    }
}