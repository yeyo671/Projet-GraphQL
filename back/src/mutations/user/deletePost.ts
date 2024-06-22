import { getUser } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
import { ApolloError } from "apollo-server-errors";

export const deletePost: MutationResolvers["deletePost"] = async (
  _,
  { token, postId },
  { dataSources }
) => {
  if (!token || !postId) {
    throw new ApolloError("Token and postId are required", "BAD_USER_INPUT");
  }

  try {
    const user = getUser(token);
    if (!user) {
      throw new ApolloError("User not authenticated", "UNAUTHENTICATED");
    }

    const post = await dataSources.db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new ApolloError("Post not found", "NOT_FOUND");
    }

    if (post.authorId !== user.id) {
      throw new ApolloError("User not authorized", "FORBIDDEN");
    }

    await dataSources.db.post.delete({
      where: { id: postId },
    });

    return {
      code: 200,
      message: "Post has been deleted",
      success: true,
      post: null,
    };
  } catch (e) {
    console.error("Error deleting post:", e);

    if (
      e instanceof ApolloError &&
      ["BAD_USER_INPUT", "UNAUTHENTICATED", "FORBIDDEN", "NOT_FOUND"].includes(
        e.extensions.code
      )
    ) {
      throw e;
    } else {
      throw new ApolloError(
        "An unexpected error occurred",
        "INTERNAL_SERVER_ERROR"
      );
    }
  }
};
