import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";

export type DocPartial<T> = DocumentType<T> | Partial<T> | T;

export class BaseModel {
    static async getOrCreate<T extends BaseModel>(
        this: ReturnModelType<AnyParamConstructor<T>, {}>,
        query: Partial<DocumentType<T>> | DocumentType<T>
    ): Promise<DocumentType<T>> {
        if (query instanceof this)
            return query as DocumentType<T>;

        return await this.findOne(query as DocumentType<T>) || await this.create(query) as DocumentType<T>;
    }

    static async getOne<T extends BaseModel>(
        this: ReturnModelType<AnyParamConstructor<T>, {}>,
        query: Partial<DocumentType<T>> | DocumentType<T>
    ): Promise<DocumentType<T> | undefined> {
        if (query instanceof this)
            return query as DocumentType<T>;

        return await this.findOne(query as DocumentType<T>) || undefined
    }

    static async getOneOrFail<T extends BaseModel>(
        this: ReturnModelType<AnyParamConstructor<T>, {}>,
        query: Partial<DocumentType<T>> | DocumentType<T>
    ): Promise<DocumentType<T>> {
        if (query instanceof this)
            return query as DocumentType<T>;

        const doc: DocumentType<T> | null = await this.findOne(query as DocumentType<T>)

        if (!doc) {
            throw new Error(`Couldn't find required document with ${this.modelName}.findOne(${JSON.stringify(query)})`)
        }

        return doc
    }
}
