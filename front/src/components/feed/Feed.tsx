import CommentForm from "./CommentForm";
import PostCard from "./PostCard";

import { GetPostsDocument } from "../../gql/graphql";
import { useQuery } from "@apollo/client";

export default function Feed() {
  const { data, loading, error } = useQuery(GetPostsDocument);
  if (error) return <p>Error :</p>;

  return (
    <>
      <div className="container mx-auto pt-4">
        <div className="flex flex-col gap-4">
          <CommentForm />
          {loading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          ) : (
            data?.getPosts.map(
              (post) => post && <PostCard key={post.id} post={post} />
            )
          )}
        </div>
      </div>
    </>
  );
}
