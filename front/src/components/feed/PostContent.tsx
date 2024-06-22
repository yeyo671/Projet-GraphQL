import React from "react";
import { useEditPost } from "../../hooks/useEditPost";
import UniversalErrorAlert from "../UniversalErrorAlert"; // Import UniversalErrorAlert for error handling

const PostContent: React.FC = () => {
  const { editMode, newContent, setNewContent, handleEdit, loading, error } =
    useEditPost();

  return (
    <div className="flex flex-col gap-1 my-2">
      {error && <UniversalErrorAlert error={error} />}
      {editMode ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="input input-bordered flex flex-grow items-center gap-2 bg-base-200"
          />
          <button
            onClick={handleEdit}
            disabled={loading}
            className="btn btn-sm btn-primary w-fit"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      ) : (
        <p className="text-gray-700">{newContent}</p>
      )}
    </div>
  );
};

export default PostContent;
