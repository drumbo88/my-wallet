import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";

export type DocPartial<T> = DocumentType<T> | Partial<T> | T;

export class BaseModel {
    static async findOrCreate<T extends BaseModel>(
        this: ReturnModelType<AnyParamConstructor<T>, {}>,
        query: Partial<DocumentType<T>> | DocumentType<T>
    ): Promise<DocumentType<T>> {
        if (query instanceof this)
            return query as DocumentType<T>;

        return await this.findOne(query as DocumentType<T>) || await this.create(query) as DocumentType<T>;
    }
}
