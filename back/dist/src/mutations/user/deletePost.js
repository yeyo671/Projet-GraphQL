import { getUser } from "../../modules/auth.js";
export const deletePost = async (_, { token, postId }, { dataSources }) => {
    if (!token || !postId) {
        return {
            code: 400,
            message: 'Token and postId are required',
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
        const post = await dataSources.db.post.findUnique({
            where: { id: postId }
        });
        if (!post) {
            return {
                code: 404,
                message: 'Post not found',
                success: false,
                post: null,
            };
        }
        if (post.authorId !== user.id) {
            return {
                code: 403,
                message: 'User not authorized',
                success: false,
                post: null,
            };
        }
        await dataSources.db.post.delete({
            where: { id: postId }
        });
        return {
            code: 200,
            message: 'Post has been deleted',
            success: true,
            post: null,
        };
    }
    catch (e) {
        console.error('Error deleting post:', e);
        return {
            code: 500,
            message: 'Internal server error',
            success: false,
            post: null,
        };
    }
};
