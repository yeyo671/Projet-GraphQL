import { useMutation } from "@apollo/client";
import { LikePostDocument } from "../../gql/graphql";
import { GetPostQuery } from "../../gql/graphql";

interface LikeButtonProps {
  post: GetPostQuery["getPost"];
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const [likePost, { loading, error }] = useMutation(LikePostDocument);

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

  return (
    <button onClick={handleLike} disabled={loading}>
      {loading ? "Liking..." : "Like"}
      {post.likes.length > 0 && ` (${post.likes.length})`}
    </button>
  );
};

export default LikeButton;
