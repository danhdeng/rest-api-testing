import { Error } from 'mongoose';
import UserModel, { User } from '../models/user.model';
import log from '../utils/logger';
export const createUser = (input: Partial<User>) => {
    try {
        const user = UserModel.create(input);
        log.info(user);
        return user;
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
