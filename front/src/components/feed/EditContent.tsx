import { useMutation } from "@apollo/client";
import {
  EditPostDocument,
  GetPostDocument,
  GetPostQuery,
} from "../../gql/graphql";
import { useState } from "react";

interface EditContentProps {
  post: GetPostQuery["getPost"];
}

const EditContent: React.FC<EditContentProps> = ({ post }) => {
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(post.content);
  const [editPost, { loading, error }] = useMutation(EditPostDocument, {
    refetchQueries: [
      { query: GetPostDocument, variables: { postId: post.id } },
    ],
  });

  const handleEdit = async () => {
    if (editMode) {
      try {
        await editPost({
          variables: {
            postId: post.id,
            newContent: newContent,
            token: localStorage.getItem("token") ?? "",
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
    setEditMode(!editMode);
  };

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  return (
    <div>
      {editMode ? (
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      ) : (
        <p>{post.content}</p>
      )}
      <button onClick={handleEdit} disabled={loading}>
        {editMode ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default EditContent;
