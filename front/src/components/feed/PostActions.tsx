import { useMutation } from "@apollo/client";
import { LikePostDocument, GetPostQuery } from "../../gql/graphql";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface LikeButtonProps {
  post: GetPostQuery["getPost"];
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const [likePost, { loading, error }] = useMutation(LikePostDocument);

  const currentUser = localStorage.getItem("username");

  const handleLike = async () => {
    try {
      await likePost({
        variables: {
          postId: post.id,
          token: localStorage.getItem("token") ?? "",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const userHasLiked = post.likes.some(
    (like) => like?.username === currentUser
  );

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center justify-center"
    >
      {userHasLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      {post.likes.length > 0 && ` (${post.likes.length})`}
    </button>
  );
};

export default LikeButton;
