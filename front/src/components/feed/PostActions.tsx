import { useMutation } from "@apollo/client";
import { LikePostDocument } from "../../gql/graphql";
import { GetPostQuery } from "../../gql/graphql";

interface LikeButtonProps {
  postId: GetPostQuery["getPost"]["id"];
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const [likePost, { loading, error }] = useMutation(LikePostDocument);

  const handleLike = async () => {
    try {
      await likePost({
        variables: {
          postId,
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
    </button>
  );
};

export default LikeButton;
