// const {graphqlHTTP} = require("express-graphql");
// import {ApolloServer} from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const app = express();
const { buildSchema } = require("graphql");
function getOneBook() {
    const book1 = {
    id: 'C001',
    title: 'Algorithm',
    author: 'Nathan Mckane',
    price: '30000'}
    return book1}

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: String
    price: Int
  }
  enum tes {
    active
    deleted
  }
  type Query {
    getOneBook: Book
  }
`;
// const schema = buildSchema(`
//   type Book {
//     id: ID!
//     title: String!
//     author: String!
//     price: Int!
//   }

//   type RootQuery {
//     book: Book!
//   } 

//   schema {
//     query: RootQuery
//   }
// `);

const resolvers = {
    Query: {
        getOneBook
    }
};



const resolver = {
    getOneBook
  };

const servers = new ApolloServer({ typeDefs, resolvers });
servers.start().then(res => {
    servers.applyMiddleware({
        app
    });
    // run port 
    app.listen({port:4000}, () => {
        console.log(`App running in port`);
    });
});


// const server = new ApolloServer({
//     schema,
//     resolver
// })

// const { url } = await startStandaloneServer(server, {

//     listen: { port: 4000 },
  
//   });
// console.log(`🚀  Server ready at: ${url}`);

//   app.use(
//     "/graphql",
//     graphqlHTTP({
//       schema: schema,
//       rootValue: resolver,
//       graphiql: true,
//     })
//   );
  
//   app.listen(4000, () => {
//     console.log("server started");
//   });