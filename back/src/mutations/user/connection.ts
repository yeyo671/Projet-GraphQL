import {
  AuthenticationError,
  UserInputError,
  ApolloError,
} from "apollo-server-errors";
import { comparePassword, createJWT } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const connection: MutationResolvers["connection"] = async (
  _,
  { password, username },
  { dataSources }
) => {
  // Check for missing username or password
  if (!username || !password) {
    throw new UserInputError("Username and password are required");
  }

  try {
    const user = await dataSources.db.user.findUnique({ where: { username } });
    if (!user) {
      throw new AuthenticationError("User not found");
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new AuthenticationError("Invalid password provided");
    }

    const token = createJWT(user);

    return {
      code: 200,
      message: "User has been signed in",
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (e) {
    console.error("Error during sign-in:", e);
    if (e instanceof AuthenticationError || e instanceof UserInputError) {
      throw e;
    } else {
      throw new ApolloError(
        "An unexpected error occurred",
        "INTERNAL_SERVER_ERROR"
      );
    }
  }
};
