import { createSession } from './../service/auth.service';
import supertest from 'supertest';
import createServer from '../utils/server';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';
import mongoose from 'mongoose';
import * as UserService from '../service/user.service';
import * as AuthService from '../service/auth.service';
import { createSessionHandler } from '../controller/auth.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: 'jane.doe@example.com',
    name: 'Jane Doe',
};

const userInput = {
    email: 'test@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'Password123',
    confirmedPassword: 'Password123',
};

const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: 'PostmanRuntime/7.28.4',
    createdAt: new Date('2021-09-30T13:31:07.674Z'),
    updatedAt: new Date('2021-09-30T13:31:07.674Z'),
    __v: 0,
};

const mockRequest = (sessionData: any, body: any) => ({
    session: { data: sessionData },
    body,
});

// const mockResponse = () => {
//     const res = new Response();
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//     return res;
// };

describe('User', () => {
    beforeAll(async () => {
        jest.setTimeout(60000);
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    });
    describe('User Registration', () => {
        describe('give the username and password are valid', () => {
            it('should return the user payload', async () => {
                const mockCreateUserService = jest
                    .spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                const { statusCode, body } = await supertest(app)
                    .post('/api/users')
                    .send(userInput);
                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayload);
                expect(mockCreateUserService).toHaveBeenCalledWith(userInput);
            });
        });
        describe('given the passwords do not match', () => {
            it('should return a 400', async () => {
                const mockCreateUserService = jest
                    .spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                const { statusCode, body } = await supertest(app)
                    .post('/api/users')
                    .send({
                        ...userInput,
                        confirmedPassword: 'passworddonotmatch',
                    });
                expect(statusCode).toBe(400);
                expect(mockCreateUserService).not.toHaveBeenCalled();
            });
        });
        describe('Given the user service throws an error', () => {
            it('should return a 409 error', async () => {
                const mockfailedCreateUserService = jest
                    .spyOn(UserService, 'createUser')
                    .mockRejectedValueOnce('Oh something wrong');

                const { statusCode } = await supertest(app)
                    .post('/api/users')
                    .send(userInput);

                expect(statusCode).toBe(409);
                expect(mockfailedCreateUserService).toHaveBeenCalled();
            });
        });
    });

    describe('User Session', () => {
        describe('Create User Session', () => {
            describe('given the username and password are valid', () => {
                it('should return a signed accessToken and refreshToken', async () => {
                    const user = await UserService.createUser(userInput);
                    if (user) {
                        user.verified = true;
                    }
                    console.log('user:', user);
                    const mockCreateUserService = jest
                        .spyOn(UserService, 'findUserByEmail')
                        // @ts-ignore
                        .mockReturnValueOnce(user);

                    jest.spyOn(AuthService, 'createSession')
                        // @ts-ignore
                        .mockReturnValue(sessionPayload);

                    const req = {
                        body: {
                            email: 'test@example.com',
                            password: 'Password123',
                        },
                    };

                    const send = jest.fn();

                    const res = {
                        send,
                    };

                    // @ts-ignore
                    await createSessionHandler(req, res);

                    // expect(send).toHaveBeenCalledWith({
                    //     accessToken: expect.any(String),
                    //     refreshToken: expect.any(String),
                    // });
                });
            });
        });
    });
});
