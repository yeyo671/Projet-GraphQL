export type User = {
  id: string;
  username: String;
};

export type Post = {
  id: string;
  content: String;
  user: User;
  authorId: String;
  authorName: String;
  comments: Comment[];
  likes: User[];
};

export type Comment = {
  id: string;
  content: String;
  user: User;
  authorId: String;
  authorName: String;
  postId: String;
};
