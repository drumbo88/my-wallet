import { Schema } from 'mongoose';
import { buildSchema, prop } from '@typegoose/typegoose';

export abstract class BaseModel {
  @prop()
  createdDate?: Date; // provided by timestamps
  @prop()
  updatedDate?: Date; // provided by timestamps
  id?: string; // is actually model._id getter

  static get schema(): Schema {
    return buildSchema(this as any, {
        schemaOptions: {
            timestamps: true,
            toJSON: {
                getters: true,
                virtuals: true,
            },
        }
    });
  }

  static get modelName(): string {
    return this.name;
  }
}
