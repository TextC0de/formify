import validator from 'validator';

const userValidator = {
    login: async (resolve, source, args, context, info) => {
        let { username } = args;

        username = validator.trim(username);
        Object.assign(args, { username });

        return resolve(source, args, context, info);
    },
    signup: async (resolve, source, args, context, info) => {
        let { username } = args;

        username = validator.trim(username);

        Object.assign(args, { username });

        const { password } = args;

        if (validator.isEmpty(username)) {
            return Promise.reject(
                new Error('El nombre de usuario no debe estar vacio')
            );
        }

        if (!validator.isLength(password, { min: 8 })) {
            return Promise.reject(
                new Error('La contraseña debe de tener al menos 8 caracteres')
            );
        }

        return resolve(source, args, context, info);
    }
};

export default userValidator;
