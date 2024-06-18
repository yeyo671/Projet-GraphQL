import { Resolvers } from "./types.js";
import { registration } from "./mutations/user/registration.js";
import { connection } from "./mutations/user/connection.js";

export const resolvers: Resolvers = {
    Mutation: {
        registration,
        connection,
    }
};