const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const app = express();
const { buildSchema } = require("graphql");


const typeDefs = gql`
  type Book {
    _id: ID!
    title: String!
    author: String!
    price: Int!
  }

  type calculatePrice{
    bookPrice: Float
    totalDiscount: Float
    totalTax: Float
    priceAfterDiscount: Float
    totalPrice: Float
  }

  type Query {
    getAllBooks: [Book]
    getBook(_id: ID!): Book
    calculatePrice(_id: ID!): Book
  }

  type Mutation {
    createBook(
      title: String!
      author: String!
      price: Int!
    ): Book!,
    
    updateBook(
      _id: ID!
      title: String
      author: String
      price: Int
    ): Book!,

    deleteBook(_id: ID): Boolean

    calculatePrice(
      bookPrice: Float
      totalDiscount: Float
      totalTax: Float
      priceAfterDiscount: Float
      totalPrice: Float
    ): calculatePrice!
  }
`;

module.exports = typeDefs;
