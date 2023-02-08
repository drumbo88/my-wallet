import mongoose, { Schema } from "mongoose";
import { Asset } from './Asset'
import { OperationItemConcept } from "./OperationItemConcept";

// Abstract Document for Asset/OperationItemConcept
export enum OperationItemDetailType {
  ASSET = 'Asset',
  CONCEPT = 'OperationItemConcept'
}

export interface IOperationItemDetail {
  name: String,
  code?: String,
}

export const OperationItemDetailFields = {
  name: { type: String, required: true },
  code: { type: String },
  //countable: { type: Boolean, required: true }, // Mueble=true, Comida=false
};

export interface IOperationItemDetailRef {
  entity: Schema.Types.ObjectId,
  type: String
}
export const OperationItemDetailRef = {
  entity: { type: Schema.Types.ObjectId, refPath: 'type', required: true },
  type: { type: String, enum: OperationItemDetailType, required: true },
}

export type OperationItemDetail = typeof Asset | typeof OperationItemConcept