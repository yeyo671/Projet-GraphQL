import React, { createContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { EditPostDocument, GetPostDocument } from "../gql/graphql";

export interface EditPostContextType {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  newContent: string;
  setNewContent: React.Dispatch<React.SetStateAction<string>>;
  handleEdit: () => void;
  loading: boolean;
  error: any;
}

export const EditPostContext = createContext<EditPostContextType | undefined>(
  undefined
);

export const EditPostProvider: React.FC<{
  post: any;
  children: React.ReactNode;
}> = ({ post, children }) => {
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(post.content);

  const [editPost, { loading, error }] = useMutation(EditPostDocument, {
    refetchQueries: [
      { query: GetPostDocument, variables: { postId: post.id } },
    ],
    onError: (err) => {
      console.error("Mutation error:", err);
    },
  });

  const handleEdit = async () => {
    if (editMode) {
      await editPost({
        variables: {
          postId: post.id,
          newContent: newContent,
          token: localStorage.getItem("token") ?? "",
        },
      });
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  return (
    <EditPostContext.Provider
      value={{
        editMode,
        setEditMode,
        newContent,
        setNewContent,
        handleEdit,
        loading,
        error,
      }}
    >
      {children}
    </EditPostContext.Provider>
  );
};
