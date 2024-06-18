import { Resolvers } from "./types.js";
import { registration } from "./mutations/user/registration.js";
import { connection } from "./mutations/user/connection.js";
import { createPost } from "./mutations/user/createPost.js";
import { likePost } from "./mutations/user/likePost.js";
import { createComment } from "./mutations/user/createComment.js";
import { deletePost } from "./mutations/user/deletePost.js";
import db from "./datasources/db.js";

export const resolvers: Resolvers = {
  Query: {
    getUser: async () => {
      try {
        const users = await db.user.findMany();
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
    getPosts: async () => {
      try {
        const posts = await db.post.findMany({
          include: {
            author: true,
            likes: true,
            comments: true,
          },
        });
        return posts.map(post => ({
          ...post,
          createdAt: post.createdAt.toISOString(),
          likes: post.likes,
        }));
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
      }
    },
    getPost: async (_: any, { postId }: { postId: string }) => {
      try {
        const post = await db.post.findUnique({
          where: { id: postId },
          include: {
            author: true,
            likes: true,
            comments: true,
          },
        });
        if (!post) {
          throw new Error('Post not found');
        }
        return {
          ...post,
          createdAt: post.createdAt.toISOString(),
          likes: post.likes,
        };
      } catch (error) {
        console.error('Error fetching post:', error);
        throw new Error('Failed to fetch post');
      }
    },
  },

  Mutation: {
    registration,
    connection,
    createPost,
    likePost,
    createComment,
    deletePost,
  },
};
