import { GetPostQuery } from "../../gql/graphql";
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
    </div>
  );
};

export default PostCard;
