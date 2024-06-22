import React from "react";
import EditContent from "./EditContent";
import DeleteButton from "./DeleteButton";
import { GetPostQuery } from "../../gql/graphql";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";

interface PostHeaderProps {
  post: GetPostQuery["getPost"];
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const formattedDate = formatDistance(new Date(post.createdAt), new Date(), {
    addSuffix: true,
    locale: fr,
  });

  const currentUser = localStorage.getItem("username");
  const isMyPost = post.authorName === currentUser;

  return (
    <div className="post-header flex justify-between">
      <div className="flex flex-row gap-2 items-center">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
            <span className="text-sm">{post.authorName[0].toUpperCase()}</span>
          </div>
        </div>
        <div>
          <div className="post-author">{post.authorName}</div>
          <div className="post-date text-xs text-neutral-400">
            {formattedDate}
          </div>
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
