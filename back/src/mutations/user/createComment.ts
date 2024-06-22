import { getUser } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

// Update the parameter name from `text` to `content` to match the frontend
export const createComment: MutationResolvers["createComment"] = async (
  _,
  { token, content, postId },
  { dataSources }
) => {
  if (!token || !content || !postId) {
    return {
      code: 400,
      message: "Token, content, and postId are required",
      success: false,
      post: null,
      comment: null,
    };
  }

  try {
    const user = getUser(token);
    if (!user) {
      return {
        code: 403,
        message: "User not authenticated",
        success: false,
        post: null,
        comment: null,
      };
    }

    const post = await dataSources.db.post.findUnique({
      where: { id: postId },
      include: { author: true, comments: true, likes: true },
    });

    if (!post) {
      return {
        code: 404,
        message: "Post not found",
        success: false,
        post: null,
        comment: null,
      };
    }

    const createdComment = await dataSources.db.comment.create({
      data: {
        content: content, // Use `content` here instead of `text`
        authorName: user.username,
        authorId: user.id,
        postId: postId,
      },
    });

    return {
      code: 201,
      message: "Comment has been created",
      success: true,
      post: {
        ...post,
        createdAt: post.createdAt.toISOString(),
        authorName: post.author.username,
      },
      comment: {
        ...createdComment,
        authorName: user.username,
      },
    };
  } catch (e) {
    console.error("Error creating comment:", e);
    return {
      code: 500,
      message: "Internal server error",
      success: false,
      post: null,
      comment: null,
    };
  }
};
