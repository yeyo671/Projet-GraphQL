import { getUser } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-errors";

export const likePost: MutationResolvers["likePost"] = async (
  _,
  { postId },
  { dataSources, user }
) => {
  if (!postId) {
    throw new UserInputError("postId is required");
  }

  if (!user) {
    throw new AuthenticationError("User not authenticated");
  }

  const post = await dataSources.db.post.findUnique({
    where: { id: postId },
    include: { likes: true, comments: true, author: true },
  });

  if (!post) {
    throw new ForbiddenError("Post not found");
  }

  const existingLike = post.likes.find((like) => like.id === user.id);

  try {
    if (existingLike) {
      const updatedPost = await dataSources.db.post.update({
        where: { id: postId },
        data: {
          likes: {
            disconnect: { id: user.id },
          },
        },
        include: { likes: true, comments: true, author: true },
      });

      return {
        code: 200,
        message: "Like has been removed",
        success: true,
        post: {
          ...updatedPost,
          createdAt: updatedPost.createdAt.toISOString(),
        },
      };
    } else {
      const updatedPost = await dataSources.db.post.update({
        where: { id: postId },
        data: {
          likes: {
            connect: { id: user.id },
          },
        },
        include: { likes: true, comments: true, author: true },
      });

      return {
        code: 201,
        message: "Post has been liked",
        success: true,
        post: {
          ...updatedPost,
          createdAt: updatedPost.createdAt.toISOString(),
        },
      };
    }
  } catch (e) {
    console.error("Error liking/unliking post:", e);
    throw new Error("Internal server error");
  }
};
