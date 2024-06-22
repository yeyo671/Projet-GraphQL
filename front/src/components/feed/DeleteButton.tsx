import { useMutation } from "@apollo/client";
import { DeletePostDocument, GetPostsDocument } from "../../gql/graphql";
import UniversalErrorAlert from "../UniversalErrorAlert";
import { FiTrash } from "react-icons/fi";

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
    <div>
      {error && <UniversalErrorAlert error={error} />}
      {/* Display the error alert if there's an error */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="btn btn-circle btn-ghost"
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i> Deleting...
          </span>
        ) : (
          <FiTrash />
        )}
      </button>
    </div>
  );
};

export default DeleteButton;
