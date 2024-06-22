import React from "react";
import { useEditPost } from "../../hooks/useEditPost";
import UniversalErrorAlert from "../UniversalErrorAlert"; // Import UniversalErrorAlert for error handling

const PostContent: React.FC = () => {
  const { editMode, newContent, setNewContent, handleEdit, loading, error } =
    useEditPost();

  return (
    <div>
      {error && <UniversalErrorAlert error={error} />}
      {editMode ? (
        <>
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="form-input"
          />
          <button
            onClick={handleEdit}
            disabled={loading}
            className="btn btn-primary mt-2"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </>
      ) : (
        <p className="text-gray-700 mb-2">{newContent}</p>
      )}
    </div>
  );
};

export default PostContent;
