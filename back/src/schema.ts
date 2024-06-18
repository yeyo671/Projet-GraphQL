import gql from "graphql-tag";

export const typeDefs = gql`

  type User {
    id: ID!
    username: String!
  }

  type Post {
    id: ID!
    createdAt: String!
    content: String!
    authorId: ID!
    authorName: String!
    likes: [User]!
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    content: String!
    authorId: ID!
    authorName: String!
    postId: ID!
  }

  type Mutation {
    registration(username: String!, password: String!): RegistrationResponse!
    connection(username: String!, password: String!): ConnectionResponse!
    createPost(token: String!, content: String!): CreatePostResponse!
    createComment(token: String!, text: String!, postId: ID!): CreateCommentResponse!
    likePost(token: String!, postId: ID!): CreatePostResponse!
    deletePost(token: String!, postId: ID!): CreatePostResponse!
  }

  type RegistrationResponse {
    code: Int!
    message: String!
    success: Boolean!
    user: User
  }

  type ConnectionResponse {
    code: Int!
    message: String!
    success: Boolean!
    token: String
    user: User
  }

  type CreatePostResponse {
    code: Int!
    message: String!
    success: Boolean!
    post: Post
  }

  type CreateCommentResponse {
    code: Int!
    message: String!
    success: Boolean!
    post: Post
    comment: Comment
  }

    type Query {
    getUser: [User]!
    getPosts: [Post]!
    getPost(postId: ID!): Post!
  }
`;