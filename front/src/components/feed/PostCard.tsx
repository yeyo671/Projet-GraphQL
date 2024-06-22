import { GetPostQuery } from "../../gql/graphql";
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
    </div>
  );
};

export default PostCard;
