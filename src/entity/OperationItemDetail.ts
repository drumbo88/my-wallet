import mongoose from "mongoose";
const { Schema } = mongoose;

// Abstract Document for Asset/OperationConcept
export enum OperationItemDetailType {
  ASSET = 'ASSET',
  CONCEPT = 'CONCEPT'
}

export const OperationItemDetailFields = {
  name: { type: String, required: true },
  code: { type: String, required: true },
  //countable: { type: Boolean, required: true }, // Mueble=true, Comida=false
};

export const OperationItemDetailRef = {
  entity: { type: Schema.Types.ObjectId, refPath: 'type', required: true },
  type: { type: String, enum: OperationItemDetailType, required: true },
}
