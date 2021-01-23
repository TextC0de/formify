import bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

export const UserSchemaName = 'User';

export interface User extends Document {
    readonly username: string;
    readonly password: string;
    readonly forms: [string];
    readonly token?: string;
    readonly created: Date;
    readonly lastModified: Date;
}

export const UserSchema = new Schema<User>(
    {
        username: {
            type: String,
            unique: true,
            match: /^[a-zA-Z0-9\-]+$/,
            required: true
        },
        password: {
            type: String,
            minlength: 8,
            required: true
        },
        token: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'lastModified'
        }
    }
);

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const UserModel = model(UserSchemaName, UserSchema);

export default UserModel;
