import mongoose, { Schema } from 'mongoose'
import { defaultSchemaOptions } from '../database';
import { IOperationItemDetail, OperationItemDetailFields } from './OperationItemDetail';

export interface IAsset extends IOperationItemDetail {
    //countable: { type: Boolean, required: true }, // Mueble=true, Comida/Consumible=false
}
export const AssetFields = {
    //countable: { type: Boolean, required: true }, // Mueble=true, Comida=false
};

export const Asset = mongoose.model('Asset', new Schema<IAsset>({
    ...OperationItemDetailFields,
    ...AssetFields,
}, defaultSchemaOptions))
