export declare enum PersonGenders {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
export interface IPersonData {
    firstname: String;
    lastname: String;
    birthdate: Date;
    gender: PersonGenders;
}
export interface IPerson {
    person: IPersonData;
}
export declare const PersonFields: {
    firstname: StringConstructor;
    lastname: StringConstructor;
    birthdate: DateConstructor;
    gender: {
        type: StringConstructor;
        enum: typeof PersonGenders;
    };
};
