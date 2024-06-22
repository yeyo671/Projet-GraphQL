import React from "react";
import EditContent from "./EditContent";
import DeleteButton from "./DeleteButton";
import { GetPostQuery } from "../../gql/graphql";
import { formatDistance } from "date-fns";

interface PostHeaderProps {
  post: GetPostQuery["getPost"];
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const formattedDate = formatDistance(new Date(post.createdAt), new Date(), {
    addSuffix: true,
  });

  const currentUser = localStorage.getItem("username");
  const isMyPost = post.authorName === currentUser;

  return (
    <div className="post-header flex justify-between">
      <div className="flex flex-row">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
            <span className="text-sm">{post.authorName[0].toUpperCase()}</span>
          </div>
        </div>
        <div>
          <div className="post-author">{post.authorName}</div>
          <div className="post-date text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>
      {isMyPost && (
        <div className="flex flex-row">
          <EditContent />
          <DeleteButton postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default PostHeader;
