import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    articles: [Article!]!
    comments: [Comment!]!
    likes: [Like!]!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    likes: [Like!]!
    createdAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    article: Article!
    createdAt: String!
  }

  type Like {
    id: ID!
    user: User!
    article: Article!
  }

  type Query {
    me: User
    articles: [Article!]!
    article(id: ID!): Article
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createArticle(title: String!, content: String!): Article!
    updateArticle(id: ID!, title: String, content: String): Article!
    deleteArticle(id: ID!): Article!
    createComment(articleId: ID!, content: String!): Comment!
    deleteComment(id: ID!): Comment!
    likeArticle(articleId: ID!): Like!
    unlikeArticle(articleId: ID!): Like!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;