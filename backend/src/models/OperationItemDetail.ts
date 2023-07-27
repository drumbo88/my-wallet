import { OperationItemConcept } from "./OperationItemConcept";
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { myModelOptions } from '../config';
import { BaseModel } from './BaseModel';

/*************************************************************************************
 * Clase "OperationItem" para Items de Operations
 */
export class OperationItemDetail extends BaseModel
{    @prop({ type: String, required: true, trim: true })
    name: string

    @prop({ type: String, trim: true })
    code: string
}

// Genera el modelo a partir de la clase utilizando Typegoose
// export const OperationItemDetailModel = getModelForClass(OperationItemDetail);
