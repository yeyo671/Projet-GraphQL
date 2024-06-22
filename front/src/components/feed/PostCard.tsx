import { GetPostQuery } from "../../gql/graphql";
import CommentForm from "./CommentForm";
import CommentsDisplay from "./CommentsDisplay";
import LikeButton from "./PostActions";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

interface PostCardProps {
  post: GetPostQuery["getPost"];
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-base-100 rounded-btn p-4">
      <PostHeader post={post} />

      <PostContent />

      <LikeButton post={post} />

      {post.comments.length > 0 && <div className="divider my-0" />}

      <CommentsDisplay comments={post.comments} />
      <CommentForm postId={post.id} />
    </div>
  );
};

export default PostCard;
