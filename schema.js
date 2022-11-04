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
    stock: Int
    amount: Int
    bookPrice: Float
    totalDiscount: Float
    totalTax: Float
    priceAfterDiscount: Float
    totalPrice: Float
  }

  type valPrice {
    bookPrice: Float
    totalDiscount: Float
    totalTax: Float
    priceAfterDiscount: Float
    totalPrice: Float
  }

  type priceTotal {
    month: Int
    creditPrice: Float,
    paylater: Float
  }

  type Total {
    Price: valPrice
    TotalPrice: [priceTotal]
  }

  type TotalBook{
    count: Int
  }

  type pagination{
    book: [Book]
    count: [TotalBook]
  }

  input paginationInput{
    limit: Int
    skip: Int
  }

  type Query {
    getAllBooks(pagination2:paginationInput): [pagination]
    getBook(_id: ID!): Book
    getPagination(limit: Int, skip: Int): [pagination]  
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

    calculatePrices(
      stock: Int
      amount: Int
      bookPrice: Float
      totalDiscount: Float
      totalTax: Float
      priceAfterDiscount: Float
      totalPrice: Float
    ): calculatePrice!
  }
`;

module.exports = typeDefs;
