import { getUser } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const createPost: MutationResolvers['createPost'] = async (_, { token, content }, { dataSources }) => {
  if (!token || !content) {
    return {
      code: 400,
      message: 'Token and content are required',
      success: false,
      post: null,
    };
  }

  try {
    const user = getUser(token);
    if (!user) {
      return {
        code: 403,
        message: 'User not authenticated',
        success: false,
        post: null,
      };
    }

    const createdPost = await dataSources.db.post.create({
      data: {
        content: content,
        authorId: user.id,
        authorName: user.username,
      },
    });

    return {
      code: 201,
      message: 'Post has been created',
      success: true,
      post: {
        id: createdPost.id,
        content: createdPost.content,
        authorId: createdPost.authorId,
        authorName: user.username,
        createdAt: createdPost.createdAt.toISOString(),
        likes: [],
        comments: [],
      },
    };
  } catch (e) {
    console.error('Error creating post:', e);

    return {
      code: 500,
      message: 'Internal server error',
      success: false,
      post: null,
    };
  }
};
