import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import UserModel from '../model/user/user.model';
import redis from '../redis';

const authentication = async (req: any, _res: any, next: NextFunction) => {
    try {
        const {
            headers: { authorization }
        } = req;
        if (!authorization) {
            return next();
        }

        const accessToken = authorization.split(' ')[1];

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (!decoded) {
            return next();
        }

        const isExpired = await redis.get(`expiredToken:${accessToken}`);
        if (isExpired) {
            return next();
        }

        const user = await UserModel.findById((decoded as any).userId);
        if (!user) {
            return next();
        }

        Object.assign(req, {
            user,
            accessToken
        });

        return next();
    } catch (error) {
        return next();
    }
};

export default authentication;
