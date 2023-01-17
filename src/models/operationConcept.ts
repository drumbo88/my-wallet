import mongoose, { Schema, Document, Model } from 'mongoose'
import { OperationItemDetailFields } from './OperationItemDetail';

export const OperationConceptFields = {
  name: { type: String, required: true },
  code: { type: String, required: true },
  //countable: { type: Boolean, required: true }, // Mueble=true, Comida=false
};

export const model = mongoose.model('OperationConcept', new Schema({
  ...OperationItemDetailFields,
  ...OperationConceptFields,
}))
