import { useContext } from "react";
import {
  EditPostContext,
  EditPostContextType,
} from "../contexts/EditPostContext";

export const useEditPost = (): EditPostContextType => {
  const context = useContext(EditPostContext);
  if (!context) {
    throw new Error("useEditPost must be used within an EditPostProvider");
  }
  return context;
};
