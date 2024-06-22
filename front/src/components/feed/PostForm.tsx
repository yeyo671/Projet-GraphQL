import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreatePostDocument, GetPostsDocument } from "../../gql/graphql";

const PostForm = () => {
  const [comment, setComment] = useState("");
  const [createComment, { loading, error }] = useMutation(CreatePostDocument, {
    refetchQueries: [{ query: GetPostsDocument }],
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!comment) return;

    try {
      await createComment({
        variables: {
          content: comment,
          token: localStorage.getItem("token") ?? "",
        },
      });
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const username = localStorage.getItem("username") ?? "";

  return (
    <form onSubmit={handleSubmit} className="bg-base-100 rounded-btn p-4">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
              <span className="text-sm">{username[0]?.toUpperCase()}</span>
            </div>
          </div>
          <label className="input input-bordered flex flex-grow items-center gap-2 bg-base-200">
            <input
              type="text"
              className="grow"
              placeholder="Ecire un post..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Posting..." : "Publier"}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default PostForm;
