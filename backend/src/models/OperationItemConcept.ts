import { getModelForClass, prop } from '@typegoose/typegoose';
import { BaseModel } from './BaseModel';

export class OperationItemConcept extends BaseModel
{
    @prop({ type: String, required: true, trim: true })
    name: string

    @prop({ type: String, trim: true })
    code: string
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const OperationItemConceptModel = getModelForClass(OperationItemConcept);
