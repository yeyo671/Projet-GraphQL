import React from "react";

type PostCardProps = {
  post: {
    content: string;
    user: {
      name: string;
      avatar: string;
    };
  };
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-base-100 rounded-btn p-4">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={post.user.avatar} />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Post Title</h2>
      <p className="text-gray-500 mb-2">{post.user.name}</p>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default PostCard;
