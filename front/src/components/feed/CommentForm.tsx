// front/src/components/feed/CommentForm.tsx
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateCommentDocument, GetPostDocument } from "../../gql/graphql";
import { VscSend } from "react-icons/vsc";

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [createComment, { loading, error }] = useMutation(
    CreateCommentDocument,
    {
      refetchQueries: [{ query: GetPostDocument, variables: { postId } }],
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;

    try {
      await createComment({
        variables: {
          content: comment,
          token: localStorage.getItem("token") ?? "",
          postId,
        },
      });
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 form-control rounded-btn p-4"
    >
      <div className="flex flex-row gap-3">
        <label className="input input-bordered flex flex-grow items-center gap-2 bg-base-200">
          <input
            type="text"
            className="w-full"
            placeholder="Ecrire un commentaire..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary btn-circle"
          disabled={loading}
        >
          {loading ? "Posting..." : <VscSend />}
        </button>
      </div>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default CommentForm;
