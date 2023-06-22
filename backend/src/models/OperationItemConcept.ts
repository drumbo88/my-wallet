import { DocumentType, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { myModelOptions } from '../config';
import { BaseModel } from './BaseModel';

export type DocOperationItemConcept = DocumentType<OperationItemConcept>;

/*************************************************************************************
 * Clase "OperationItem" para Items de Operations
 */
@modelOptions(myModelOptions)
export class OperationItemConcept extends BaseModel
{
    @prop({ type: String, required: true })
    name: string

    @prop({ type: String })
    code: string

    @prop({ type: Boolean, required: true })
    countable: boolean // Mueble=true, Comida/Consumible=false
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const OperationItemConceptModel = getModelForClass(OperationItemConcept);
