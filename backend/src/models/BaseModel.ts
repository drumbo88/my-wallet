import { DocumentType, isDocument, ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor, Ref } from "@typegoose/typegoose/lib/types";
import { AnyObject, Model, ObjectId, PopulateOptions } from "mongoose";

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
        query: Partial<DocumentType<T>> | DocumentType<T> | Ref<ObjectId>
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

    /**
     *
     * @param this
     * @param path
     *
     * Before) await operation.populate('fromEntity'); const fromEntity: DocEntity | undefined = isDocument(operation.fromEntity) ? operation.fromEntity : undefined
     * After) const fromEntity = await operation.populateAndGet<Entity>('fromEntity')
     */

    async populateAndGet<U extends BaseModel, T = this, Paths = {}>(
        this: DocumentType<T, {}>,
        path: string | PopulateOptions | (string | PopulateOptions)[]
    ): Promise<DocumentType<U>>;
    async populateAndGet<U extends BaseModel, T = this, Paths = {}>(
        this: DocumentType<T, {}>,
        path: string, select?: string | AnyObject, model?: Model<any>, match?: AnyObject, options?: PopulateOptions
    ): Promise<DocumentType<U> | undefined> {
        await this.populate<Paths>(path, select, model, match, options)
        return isDocument(this[path]) ? this[path] as DocumentType<U> : undefined
    }

}
