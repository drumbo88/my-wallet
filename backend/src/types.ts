import { Document, Model } from "mongoose";

export interface ISeed {}

export abstract class MyModel<T extends Document> extends Model<T> {
    //static seed?<T extends Document>(seeds: T | T[]): Promise<T[]>
    static seed?<T extends ISeed>(seeds: T | T[]): Promise<Document | Document[]>
}
