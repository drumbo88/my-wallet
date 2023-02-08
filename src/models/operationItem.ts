import mongoose, { Schema } from "mongoose";
import { IOperationItemDetailRef, OperationItemDetail, OperationItemDetailRef } from "./OperationItemDetail";

export interface IOperationItemConcept {

}
export interface IOperationItem {
  currencyCode?: String,
  quantity?: number,
  amount?: number,
  total?: number,

  conceptId?: IOperationItemDetailRef, //Schema.Types.ObjectId,
  concept?: OperationItemDetail,

  detail: String,
};

export const schema = new Schema({
  currencyCode: { type: String, ref: 'Currency' },
  quantity: { type: Number, default: 0 },
  amount: { type: Number, default: 0, required: true },
  total: { type: Number, default: 0 },

  conceptId: new Schema(OperationItemDetailRef),
  // excluyent types of item
  //asset: { type: Schema.Types.ObjectId, ref: 'Asset' }, // Opcional (objetos tangibles o intangibles)
  //concept: { type: Schema.Types.ObjectId, ref: 'OperationConcept' }, // Opcional (impuesto, interés, conceptos abstractos)

  detail: { type: String },
})