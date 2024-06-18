import { hashPassword } from "../../modules/auth.js";
export const registration = async (_, { username, password }, { dataSources }) => {
    if (!username || !password) {
        return {
            code: 400,
            message: 'Username and password are required',
            success: false,
            user: null,
        };
    }
    try {
        const hashedPassword = await hashPassword(password);
        const registration = await dataSources.db.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        return {
            code: 201,
            message: 'User has been created',
            success: true,
            user: {
                id: registration.id,
                username: registration.username,
            },
        };
    }
    catch (e) {
        console.error('Error creating user:', e);
        if (e.code === 'P2002' && e.meta && e.meta.target.includes('username')) {
            return {
                code: 409,
                message: 'Username already exists',
                success: false,
                user: null,
            };
        }
        return {
            code: 500,
            message: 'Internal server error',
            success: false,
            user: null,
        };
    }
};
