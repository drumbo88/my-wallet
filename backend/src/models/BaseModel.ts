import { DocumentType, isDocument, ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor, Ref, RefType } from "@typegoose/typegoose/lib/types";
import { AnyObject, Model, Types, PopulateOptions } from "mongoose";

export type DocPart<T> = DocumentType<T> | Partial<T>;
export type DocTypePart<T> = Partial<DocumentType<T>> | DocPart<T>;
export type DocPartOrObj<T> = DocPart<T> | T;

type RefOrDocument<T,V extends RefType> = T | V | Ref<T,V> | Types.ObjectId;

export type DocPartial<T> = {
  [P in keyof T]: T[P] extends object
    ? (T[P] extends RefOrDocument<infer U, infer V>
        ? T[P]
        : DocPartial<T[P]> | DocPartOrObj<T[P]>
      )
    : T[P];
};
export class BaseModel
{
    static async getOrCreate<T extends BaseModel>(
        this: ReturnModelType<AnyParamConstructor<T>, {}>,
        query: DocPartial<T>
    ): Promise<DocumentType<T>> {
        if (query instanceof this)
            return query as DocumentType<T>;

        return await this.findOne(query as DocumentType<T>) || await this.create(query) as DocumentType<T>;
    }

    static async getOne<T extends BaseModel>(
        this: ReturnModelType<AnyParamConstructor<T>, {}>,
        query: DocPartial<T> | Ref<T, Types.ObjectId>
    ): Promise<DocumentType<T> | undefined> {
        if (query instanceof this)
            return query as DocumentType<T>;

        return await this.findOne(query as DocumentType<T>) || undefined
    }

    static async getOneOrFail<T extends BaseModel>(
        this: ReturnModelType<AnyParamConstructor<T>, {}>,
        query: DocPartial<T> | Ref<T, Types.ObjectId>
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
    ): Promise<DocumentType<U> | undefined>;
    async populateAndGet<U extends BaseModel, T = this, Paths = {}>(
        this: DocumentType<T, {}>,
        path: string, select?: string | AnyObject, model?: Model<any>, match?: AnyObject, options?: PopulateOptions
    ): Promise<DocumentType<U> | undefined> {
        await this.populate<Paths>(path, select, model, match, options)
        return isDocument(this[path]) ? this[path] as DocumentType<U> : undefined
    }

}
