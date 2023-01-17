import mongoose, { Schema } from 'mongoose'
import { OperationItemDetailFields } from './OperationItemDetail';

export const AssetFields = {
  name: { type: String, required: true },
  code: { type: String, required: true },
  //countable: { type: Boolean, required: true }, // Mueble=true, Comida=false
};

export const model = mongoose.model('Asset', new Schema({
  ...OperationItemDetailFields,
  ...AssetFields,
}))
