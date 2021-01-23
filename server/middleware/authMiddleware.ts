const authMiddleware = {
    isAuth: async (
        resolve: any,
        source: any,
        args: any,
        context: any,
        info: any
    ): Promise<any> => {
        const { user } = context;

        if (!user) {
            return Promise.reject(new Error('You must be authorized.'));
        }

        return resolve(source, args, context, info);
    },
    isGuest: async (
        resolve: any,
        source: any,
        args: any,
        context: any,
        info: any
    ): Promise<any> => {
        const { user } = context;

        if (user) {
            return Promise.reject(new Error('You have already authorized.'));
        }

        return resolve(source, args, context, info);
    }
};

export default authMiddleware;
