const express = require('express');
const { resolve } = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const songs = require("./songmodel");
const playlist = require("./playlistmodel")

function generateAccessToken(payload) {
  return jwt.sign(payload, 'key', { expiresIn: '1h' });
}

app.use(bodyParser.json())

app.post('/user/auth', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const token = generateAccessToken({ username: username, password: password });
  res.json(token);
});

function auth(req, res, next) {
  const auth = req.headers['authorization'];
  const token = auth.split(' ')[1];
  if (token == null) return res.sendStatus(401) ;
  jwt.verify(token, 'key', (err, user) => {
    if (err) return res.sendStatus(403);
    next();
  })
}

const song = [
  {
    id : 1,
    title : "Title1",
    artist : "One Ok Rock",
    genre :  "Rock",
    duration : "7:52"
  },

  {
    id : 2,
    title : "Title2",
    artist : "One Ok Rock",
    genre :  "Rock",
    duration : "5:23"
  },

  {
    id : 3,
    title : "Title3",
    artist : "Selena Gomez",
    genre :  "Pop",
    duration : "5:21"
  },

  {
    id : 4,
    title : "Title4",
    artist : "Rihanna",
    genre :  "Pop",
    duration : "5:21"
  },

  {
    id : 5,
    title : "Title5",
    artist : "One Ok Rock",
    genre :  "Rock",
    duration : "7:21"
  },

  {
    id : 6,
    title : "Title6",
    artist : "One Ok Rock",
    genre :  "Rock",
    duration : "6:12"
  },

  {
    id : 7,
    title : "Title7",
    artist : "Selena Gomez",
    genre :  "Pop",
    duration : "8:21"
  },

  {
    id : 8,
    title : "Title8",
    artist : "Rihanna",
    genre :  "Pop",
    duration : "5:21"
  },
  {
    id : 9,
    title : "Title9",
    artist : "One Ok Rock",
    genre :  "Rock",
    duration : "9:52"
  },

  {
    id : 10,
    title : "Title10",
    artist : "One Ok Rock",
    genre :  "Rock",
    duration : "9:23"
  },

  {
    id : 11,
    title : "Title11",
    artist : "Selena Gomez",
    genre :  "Pop",
    duration : "5:21"
  },

  {
    id : 12,
    title : "Title12",
    artist : "Rihanna",
    genre :  "Pop",
    duration : "5:21"
  },

  {
    id : 13,
    title : "Title13",
    artist : "One Ok Rock",
    genre :  "Rock",
    duration : "7:21"
  },

  {
    id : 14,
    title : "Title14",
    artist : "One Ok Rock",
    genre :  "Rock",
    duration : "6:12"
  },

  {
    id : 15,
    title : "Title15",
    artist : "Selena Gomez",
    genre :  "Pop",
    duration : "8:21"
  },

  {
    id : 16,
    title : "Title16",
    artist : "Rihanna",
    genre :  "Pop",
    duration : "5:21"
  }
]

function groupSongArtist() {
  let groupArtist = []
  for(i = 0; i < song.length; i++){
  groupArtist.push(song[i].artist)
  }
  const set = new Set(groupArtist);

  const newArr = [...set];
  let groupOfArtist = {}
  newArr.forEach (function(value) {
    groupOfArtist[value] = song.filter((songs) => songs.artist === value)
  })
  return groupOfArtist
}

function groupSongGenre() {
  let groupGenre = []
  for(i = 0; i < song.length; i++){
  groupGenre.push(song[i].genre)
  }
  const set = new Set(groupGenre);

  const newArr = [...set];
  let groupOfGenre = {}
  newArr.forEach (function(value) {
    groupOfGenre[value] = song.filter((songs) => songs.genre === value)
  })
  return groupOfGenre
}

async function hehe(){
  const songCheck = await songs.find()
  let TotalDuration = 0;
  let groups = [];
  // for (let songs in song){
  for (i = 0; i <= songCheck.length; i++){
    const random = Math.floor(Math.random() * songCheck.length)
    const songrandom = groups.some(varl => varl.id === songCheck[random].id)
    const durationSong = songCheck[random].duration
    if (songrandom == false){
      if (TotalDuration <= 3600) {
        const time = durationSong.split(":");
        let durationTime = Number(time[0]) * 60 + Number(time[1])
        TotalDuration += durationTime;
        groups.push(songCheck[random]);
      }
      else {
        break;
      }
    }
  }

  return groups;
}

app.get('/groupByArtist', auth, (req, res) =>  {
  const detail = groupSongArtist(song);
  // const detailArray = Array.from(detail);
  console.log(detail)
  res.send(detail)
});

app.get('/groupByGenre', auth, (req, res) =>  {
  const detail = groupSongGenre(song);
  console.log(detail)
  res.send(detail)
});

app.get('/playlist', auth, async (req, res) =>  {
  const detail = await hehe();
  console.log(detail)
  res.send(detail)
});

app.post('/song', auth, async(req, res) => {
  const createSong = new songs(req.body);
  try {
    const addingSong = await createSong.save()
    res.send(addingSong)
  }catch(err){
    res.status(500).send(err);
  }
})

app.get('/song', auth, async (req, res) => {
  const readData = await songs.find({}).sort({id:1})
  res.send(readData)
})

app.patch('/song', auth, async (req, res) => {
  const updateData = await songs.updateMany({_id:"6360972cf642af3578aef999"}, {$set: {_id: 1}});
  try {
    res.send(updateData);
  } catch (err) {
    res.status(500).send(err);}
})

app.delete('/song', auth, async (req, res) => {
  const deleteData = await songs.deleteMany({_id: req.query.delete})
  try {
    res.send(deleteData);
  } catch (err) {
    res.status(500).send(err);}
})

app.post('/playlists', auth, async(req, res) => {
  const createPlaylist = new playlist(req.body);
  try {
    const addingPlaylist = await createPlaylist.save()
    res.send(addingPlaylist)
  }catch(err){
    res.status(500).send(err);
  }
})

app.get('/playlists', auth, async (req, res) => {
  const readData = await playlist.find()
  res.send(readData)
})

app.patch('/playlists', auth, async (req, res) => {
  const updateData = await playlist.updateMany({_id: req.query.update}, {$set: {song_ids: [1, 2, 5, 6, 9]}});
  try {
    res.send(updateData);
  } catch (err) {
    res.status(500).send(err);}
})

app.delete('/playlists', auth, async (req, res) => {
  const deleteData = await playlist.deleteMany({_id: req.query.delete})
  try {
    res.send(deleteData);
  } catch (err) {
    res.status(500).send(err);}
})

app.get('/song/process',auth, async (req, res) => {
  const processMusic = await songs.aggregate([
    {$match: {
      genre: req.body.genre
    }},
    {$facet:
      {
        "Data": [
          {
            $sort: {
                createdAt: -1
            }
        },{
            $skip: (+req.query.limit*+req.query.page)
        },{
            $limit: +req.query.limit
        }],
        "Total Song": [{
            $group: {_id: "$genre", count: {$sum: 1}}
      }]
    }}
  ])
  res.send(processMusic)
})

app.get('/playlists/process', auth, async (req, res) => {
  const processPlaylist = await playlist.aggregate([
    {$facet:
      {
        "PlaylistMoreThan1Hour":[{
                $match: {
                    duration: {$gte: 3600}
                }
            },{
                $unwind: "$song_ids"
            },{
                $lookup: {
                    from: "songs",
                    localField: "song_ids",
                    foreignField: "id",
                    as: "id_song"
                }
            },{
                $match : {'id_song.genre': "Rock"}
            },{
                $project: {
                    _id: 0, id_song: 1, title: "$title", duration: "$duration"
                }
            },{
                $sort: {id: 1}
            },{
                $skip: (+req.query.limit*+req.query.page)
            },{
                $limit: +req.query.limit
            }]
        }
    }
  ])
  res.send(processPlaylist)
})

app.listen(port);