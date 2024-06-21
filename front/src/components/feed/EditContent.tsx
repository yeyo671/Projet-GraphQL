import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  EditPostDocument,
  GetPostDocument,
  GetPostQuery,
} from "../../gql/graphql";
import UniversalErrorAlert from "../UniversalErrorAlert";

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
    onError: (error) => {
      console.error("Mutation error:", error);
    },
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
        setEditMode(false);
      } catch (err) {
        console.error("Error caught in handleEdit:", err);
      }
    } else {
      setEditMode(true);
    }
  };

  return (
    <div>
      {error && <UniversalErrorAlert message={error.message} />}
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
