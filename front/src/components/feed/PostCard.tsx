type PostCardProps = {
  post: {
    content: string;
    authorName: string;
  };
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-base-100 rounded-btn p-4">
      <h2 className="text-xl font-bold mb-2">Post Title</h2>
      <p className="text-gray-500 mb-2">{post.authorName}</p>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default PostCard;
