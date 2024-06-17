import React from "react";

const PostCard: React.FC = ({ post }) => {
  return (
    <div className="bg-base-100 rounded-btn p-4">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Post Title</h2>
      <p className="text-gray-500 mb-2">Author: John Doe</p>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        nisl ac tincidunt consectetur, mi velit tincidunt nunc, id consectetur
        nunc urna vel nunc.
      </p>
    </div>
  );
};

export default PostCard;
