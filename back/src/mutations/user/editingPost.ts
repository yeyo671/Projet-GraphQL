import { MutationResolvers } from "../../types.js";
import {
  AuthenticationError,
  UserInputError,
  ForbiddenError,
} from "apollo-server-errors";

export const editPost: MutationResolvers["editPost"] = async (
  _,
  { token, postId, newContent },
  { dataSources, user }
) => {
  if (!token || !postId || !newContent) {
    throw new UserInputError("Token, postId, and newContent are required");
  }

  if (!user) {
    throw new AuthenticationError("User not authenticated");
  }

  const post = await dataSources.db.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.authorId !== user.id) {
    throw new ForbiddenError("Post not found or user not authorized");
  }

  try {
    const updatedPost = await dataSources.db.post.update({
      where: { id: postId },
      data: { content: newContent },
      include: { comments: true, likes: true },
    });

    return {
      code: 200,
      message: "Post has been updated",
      success: true,
      post: {
        ...updatedPost,
        comments: updatedPost.comments || [],
        likes: updatedPost.likes || [],
        createdAt: updatedPost.createdAt.toISOString(),
      },
    };
  } catch (e) {
    console.error("Error updating post:", e);
    throw new Error("Internal server error");
  }
};
