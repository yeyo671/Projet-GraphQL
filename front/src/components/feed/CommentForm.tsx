import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreatePostDocument, GetPostsDocument } from "../../gql/graphql";

const CommentForm = () => {
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

  return (
    <form onSubmit={handleSubmit} className="bg-base-100 rounded-btn p-4">
      <div className="flex justify-between gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <label className="input input-bordered flex flex-grow items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default CommentForm;
