import { getUser } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const editPost: MutationResolvers["editPost"] = async (
  _,
  { token, postId, newContent },
  { dataSources }
) => {
  if (!token || !postId || !newContent) {
    return {
      code: 400,
      message: "Token, postId, and newContent are required",
      success: false,
      post: null,
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
      };
    }

    const post = await dataSources.db.post.findUnique({
      where: { id: postId },
    });

    if (!post || post.authorId !== user.id) {
      return {
        code: 404,
        message: "Post not found or user not authorized",
        success: false,
        post: null,
      };
    }

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

    return {
      code: 500,
      message: "Internal server error",
      success: false,
      post: null,
    };
  }
};
