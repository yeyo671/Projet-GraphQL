import { getUser } from "../../modules/auth.js";
export const likePost = async (_, { token, postId }, { dataSources }) => {
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
            where: { id: postId },
            include: { likes: true, comments: true, author: true }
        });
        if (!post) {
            return {
                code: 404,
                message: 'Post not found',
                success: false,
                post: null,
            };
        }
        const existingLike = post.likes.find(like => like.id === user.id);
        if (existingLike) {
            const updatedPost = await dataSources.db.post.update({
                where: { id: postId },
                data: {
                    likes: {
                        disconnect: { id: user.id }
                    }
                },
                include: { likes: true, comments: true, author: true }
            });
            return {
                code: 200,
                message: 'Like has been removed',
                success: true,
                post: {
                    id: updatedPost.id,
                    content: updatedPost.content,
                    authorId: updatedPost.authorId,
                    authorName: updatedPost.author.username,
                    createdAt: updatedPost.createdAt.toISOString(),
                    likes: updatedPost.likes,
                    comments: updatedPost.comments
                }
            };
        }
        const updatedPost = await dataSources.db.post.update({
            where: { id: postId },
            data: {
                likes: {
                    connect: { id: user.id }
                }
            },
            include: { likes: true, comments: true, author: true }
        });
        return {
            code: 201,
            message: 'Post has been liked',
            success: true,
            post: {
                id: updatedPost.id,
                content: updatedPost.content,
                authorId: updatedPost.authorId,
                authorName: updatedPost.author.username,
                createdAt: updatedPost.createdAt.toISOString(),
                likes: updatedPost.likes,
                comments: updatedPost.comments
            }
        };
    }
    catch (e) {
        console.error('Error liking post:', e);
        return {
            code: 500,
            message: 'Internal server error',
            success: false,
            post: null,
        };
    }
};
