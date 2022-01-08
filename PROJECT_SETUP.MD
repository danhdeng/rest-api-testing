# installed required packages

yarn add express zod config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid module-alias nodemailer argon2 @typegoose/typegoose mongodb-memory-server

# add all dependencies packages

yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid @types/nodemailer ts-node-dev typescript -D

# install packages for testing

yarn add supertest jest ts-jest @types/jest @types/supertest -D

# create jest config file

yarn ts-jest config:init
