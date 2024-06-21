import React from "react";
import { GetPostQuery } from "../../gql/graphql";

interface PostContentProps {
  post: GetPostQuery["getPost"];
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return <p className="text-gray-700 mb-2">{post.content}</p>;
};

export default PostContent;
