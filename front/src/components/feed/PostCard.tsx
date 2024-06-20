import { GetPostQuery } from "../../gql/graphql";
import LikeButton from "./PostActions";

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
      <p className="text-gray-700 mb-2">{post.content}</p>
      <div className="flex items-center">
        <LikeButton post={post} />
      </div>
    </div>
  );
};

export default PostCard;
