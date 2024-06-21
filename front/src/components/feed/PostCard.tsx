import { GetPostQuery } from "../../gql/graphql";
import EditContent from "./EditContent";
import LikeButton from "./PostActions";
import PostContent from "./PostContent";

interface PostCardProps {
  post: GetPostQuery["getPost"];
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-base-100 rounded-btn p-4">
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-10">
          <span className="text-sm">{post.authorName[0].toUpperCase()}</span>
        </div>
      </div>
      <p className="text-gray-500 mb-2">{post.authorName}</p>
      <PostContent post={post} />
      <EditContent post={post} />
      <div className="flex items-center">
        <LikeButton post={post} />
      </div>
    </div>
  );
};

export default PostCard;
