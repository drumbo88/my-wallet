export declare enum UserStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    DELETED = "DELETED"
}
export interface IUser {
    name?: String;
    email?: String;
    password?: String;
    status?: UserStatus;
}
export declare const UserFields: {
    name: {
        type: StringConstructor;
        unique: boolean;
        sparse: boolean;
    };
    email: {
        type: StringConstructor;
        unique: boolean;
        sparse: boolean;
    };
    password: StringConstructor;
    status: {
        type: StringConstructor;
        enum: typeof UserStatus;
        default: UserStatus;
    };
};
