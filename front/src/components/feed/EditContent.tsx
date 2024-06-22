import React from "react";
import UniversalErrorAlert from "../UniversalErrorAlert";
import { useEditPost } from "../../hooks/useEditPost";
import { MdOutlineEdit } from "react-icons/md";

const EditContent: React.FC = () => {
  const { handleEdit, loading, error } = useEditPost();

  return (
    <div>
      {error && <UniversalErrorAlert error={error} />}
      <button
        onClick={handleEdit}
        disabled={loading}
        className="btn btn-circle btn-ghost"
      >
        <MdOutlineEdit />
      </button>
    </div>
  );
};

export default EditContent;
