const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const app = express();


const typeDefs = gql`
    type Song {
        _id: ID
        id: Int
        title: String
        artist: String
        genre: String
        duration: String
    }

    type User {
        name: String,
        password: String,
        email: String,
        address: String
    }

    type LoginUser {
        name: String,
        email: String,
        password: String,
        address: String
    }

    type Playlist {
        _id: ID
        title: String
        duration: Int   
        song_ids: [Song]
    }

    type Playlist_Input {
        _id: ID
        title: String
        duration: Int   
        song_ids: [Int]
    }

    input paginationInput{
        limit: Int
        skip: Int
      }

    input UserInput {
        name: String,
        password: String,
        email: String,
        address: String
    }
    
    input LoginUserInput {
        password: String,
        email: String
    }

    input PlaylistInput {
        title: String
        duration: Int
    }

    type Query {
        getAllSong(pagination: paginationInput): [Song]
        getSong(_id: ID!): Song
        getAllUser(pagination: paginationInput): [User]
        getUser(_id: ID!): Song
        getAllPlaylist: [Playlist]
        getOnePlaylist(_id: ID!): Playlist
    }

    type Mutation {
        createSong(
            id: Int
            title: String
            artist: String
            genre: String
            duration: String
        ): Song!,

        updateSong(
            _id: ID
            id: Int!
            title: String
            artist: String
            genre: String
            duration: String
        ): Song!,

        deleteSong(_id: ID): Boolean

        insertUser(user_input: UserInput) : User
        loginUser(user_input: LoginUserInput): LoginUser

        createPlaylist(playlist_input: PlaylistInput): Playlist_Input
    }

`;

module.exports = typeDefs;