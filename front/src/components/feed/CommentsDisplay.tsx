// front/src/components/feed/CommentsDisplay.tsx
import React from "react";
import { GetPostQuery } from "../../gql/graphql";

interface CommentsDisplayProps {
  comments: GetPostQuery["getPost"]["comments"];
}

const CommentsDisplay: React.FC<CommentsDisplayProps> = ({ comments }) => {
  return (
    <div className="comments-section flex flex-col gap-1">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <div className="flex flex-row gap-2 items-center">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                  <span className="text-sm">
                    {comment.authorName[0].toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <div className="post-author text-sm">{comment.authorName}</div>
                <div className="post-date text-xs">{comment.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsDisplay;
