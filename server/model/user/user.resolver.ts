import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import redis from '../../redis';
import UserModel, { User } from './user.model';

const user = {
    name: 'user',
    type: 'User!',
    resolve: ({ context: { user } }: { context: { user: User } }): User => user
};

type Args = {
    args: { username: string; password: string };
};

type LoginReturnType = { accessToken: string };

const login = {
    name: 'login',
    type: 'AccessToken!',
    args: {
        username: 'String!',
        password: 'String!'
    },
    resolve: async ({
        args: { username, password }
    }: Args): Promise<LoginReturnType> => {
        try {
            const user = await UserModel.findOne({ username });

            if (!user) {
                return Promise.reject(new Error('User not found.'));
            }

            const comparePassword = await user.comparePassword(password);
            if (!comparePassword) {
                return Promise.reject(new Error('Password is incorrect.'));
            }

            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || 'secret',
                {
                    expiresIn: process.env.JWT_EXPIRATION || '24h'
                }
            );

            return { accessToken };
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const signup = {
    name: 'signup',
    type: 'AccessToken!',
    args: {
        username: 'String!',
        password: 'String!'
    },
    resolve: async ({
        args: { username, password }
    }: Args): Promise<{
        username: string;
        accessToken: string;
    }> => {
        try {
            let user = await UserModel.findOne({ username });
            if (user) {
                return Promise.reject(
                    new Error('Username has already been taken.')
                );
            }

            const hash = bcrypt.hashSync(password, 10);

            user = await new UserModel({
                username,
                password: hash
            }).save();

            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || 'secret',
                {
                    expiresIn: process.env.JWT_EXPIRATION || '24h'
                }
            );

            return { username, accessToken };
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

type LogoutContext = {
    context: {
        user: User;
        accessToken: string;
    };
};

const logout = {
    name: 'logout',
    type: 'Succeed!',
    resolve: async ({
        context: { user, accessToken }
    }: LogoutContext): Promise<{ succeed: boolean }> => {
        try {
            await redis.set(
                `expiredToken:${accessToken}`,
                user._id,
                'EX',
                process.env.REDIS_TOKEN_EXPIRY
            );

            return { succeed: true };
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default {
    user,
    login,
    signup,
    logout
};
