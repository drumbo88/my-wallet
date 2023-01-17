import { Schema } from 'mongoose'

export enum UserStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

export interface IUser {
    name?: String,
    email?: String,
    password?: String,
    status?: UserStatus,
}

export const UserFields = {
    name: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    password: String,
    status: { type: String, enum: UserStatus, default: UserStatus.ACTIVE },
}

export const schema = new Schema<IUser>(UserFields)