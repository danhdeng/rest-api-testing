import { Error } from 'mongoose';
import UserModel, { User } from '../models/user.model';

export const createUser = (input: Partial<User>) => {
    try {
        return UserModel.create(input);
    } catch (e: any) {
        throw new Error(e);
    }
};

export const findUserById = (id: string) => {
    return UserModel.findById(id);
};

export const findUserByEmail = (email: string) => {
    return UserModel.findOne({ email });
};
