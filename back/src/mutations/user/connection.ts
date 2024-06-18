import { comparePassword, createJWT } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const connection: MutationResolvers['connection'] = async (_, { password, username }, { dataSources }) => {
  if (!username || !password) {
    return {
      code: 400,
      message: 'Username and password are required',
      success: false,
      token: null,
    };
  }

  try {
    const user = await dataSources.db.user.findUnique({ where: { username } });
    if (!user) {
      return {
        code: 404,
        message: 'User not found',
        success: false,
        token: null,
      };
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return {
        code: 401,
        message: 'Invalid password provided',
        success: false,
        token: null,
      };
    }

    const token = createJWT(user);

    return {
      code: 200,
      message: 'User has been signed in',
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (e) {
    console.error('Error during sign-in:', e);

    return {
      code: 500,
      message: 'Internal server error',
      success: false,
      token: null,
    };
  }
};
