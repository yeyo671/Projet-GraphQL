// Import necessary hooks and types from Apollo and your GraphQL file
import { useMutation } from "@apollo/client";
import { DeletePostDocument, GetPostsDocument } from "../../gql/graphql";

interface DeleteButtonProps {
  postId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId }) => {
  const [deletePost, { loading, error }] = useMutation(DeletePostDocument, {
    variables: { postId, token: localStorage.getItem("token") ?? "" },
    refetchQueries: [{ query: GetPostsDocument }],
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost();
      } catch (err) {
        console.error("Error caught in handleDelete:", err);
      }
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="btn btn-error">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
