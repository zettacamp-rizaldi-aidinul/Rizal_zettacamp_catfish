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

function hehe(){
  let TotalDuration = 0;
  let groups = [];
  // for (let songs in song){
  for (i = 0; i <= song.length; i++){
    const random = Math.floor(Math.random() * song.length)
    const songrandom = groups.some(varl => varl.id === song[random].id)
    const durationSong = song[random].duration
    if (songrandom == false){
      if (TotalDuration <= 3600) {
        const time = durationSong.split(":");
        let durationTime = Number(time[0]) * 60 + Number(time[1])
        TotalDuration += durationTime;
        groups.push(song[random]);
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

app.get('/playlist', auth, (req, res) =>  {
  const detail = hehe();
  res.send(detail)
});

app.post('/song', auth, async(req, res) => {
  const createSong = new addSong(req.body);
  try {
    const addingSong = await createSong.save()
    res.send(addingSong)
  }catch(err){
    res.status(500).send(err);
  }
})

app.get('/song', auth,  async(res) => {
  const readSong = await songs.find()
  res.send(readSong)
})




app.listen(port);