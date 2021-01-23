import crypto from 'crypto-random-string';
import moment from 'moment';

import type { User } from './user.model';

const userService = {
    verifyRequest: async (user: User): Promise<string> => {
        const token = crypto(4);
        const expiresIn = moment().add(7, 'days');

        user.set({
            token,
            expiresIn
        });

        await user.save();

        return token;
    }
};

export default userService;
