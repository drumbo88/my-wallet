import mongoose, { Schema, Document, Model } from 'mongoose'
import { defaultSchemaOptions } from '../database';
import { IOperationItemDetail, OperationItemDetailFields } from './OperationItemDetail';

export interface IOperationItemConcept extends IOperationItemDetail {
  //countable: { type: Boolean, required: true }, // Mueble=true, Comida/Consumible=false
}
export const OperationConceptFields = {

}

export const OperationItemConcept = mongoose.model('OperationItemConcept', new Schema({
  ...OperationItemDetailFields,
  ...OperationConceptFields,
}, defaultSchemaOptions))
