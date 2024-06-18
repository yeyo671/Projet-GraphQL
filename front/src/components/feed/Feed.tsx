import CommentForm from "./CommentForm";
import PostCard from "./PostCard";

const posts = [
  {
    id: 1,
    user: {
      name: "Dimitri Fiacre",
      avatar: "https://avatar.iran.liara.run/public",
    },
    timestamp: "Il y a 1 heure",
    content: "Overwatch 2 va sortir le 4 octobre 2022, j'ai trop hâte !",
    image: "path/to/image.jpg",
    comments: [
      {
        user: {
          name: "Marc",
          avatar: "https://avatar.iran.liara.run/public",
        },
        content: "Quel est ce jeu ?",
      },
      {
        user: {
          name: "Mbappe",
          avatar: "https://avatar.iran.liara.run/public",
        },
        content: "Overwatch il a changé",
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Dimitri Fiacre",
      avatar: "https://avatar.iran.liara.run/public",
    },
    timestamp: "Il y a 2 heures",
    content:
      "Je viens de finir la saison 3 de The Mandalorian, c'était génial !",
    image: "path/to/image2.jpg",
    comments: [
      {
        user: {
          name: "Marc",
          avatar: "path/to/avatar2.jpg",
        },
        content: "Je suis d'accord !",
      },
      {
        user: {
          name: "Mbappe",
          avatar: "path/to/avatar3.jpg",
        },
        content: "Je n'ai pas encore regardé",
      },
    ],
  },
  {
    id: 3,
    user: {
      name: "Dimitri Fiacre",
      avatar: "path/to/avatar.jpg",
    },
    timestamp: "Il y a 3 heures",
    content: "Je viens de commencer le livre Dune, c'est vraiment bien écrit !",
    image: "path/to/image3.jpg",
    comments: [
      {
        user: {
          name: "Marc",
          avatar: "path/to/avatar2.jpg",
        },
        content: "Je l'ai lu il y a quelques années, c'est un classique !",
      },
      {
        user: {
          name: "Mbappe",
          avatar: "path/to/avatar3.jpg",
        },
        content: "Je ne suis pas très science-fiction",
      },
    ],
  },
];

export default function Feed() {
  return (
    <>
      <div className="container mx-auto pt-4">
        <div className="flex flex-col gap-4">
          <CommentForm />
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
