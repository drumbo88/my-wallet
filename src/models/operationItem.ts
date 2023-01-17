import mongoose from "mongoose";
import { OperationItemDetailRef } from "./OperationItemDetail";
const { Schema } = mongoose;

export const OperationItemFields = {
  currency: { type: String, required: true, ref: 'Currency' },
  quantity: { type: Number },
  amount: { type: Number, required: true },

  concept: { type: OperationItemDetailRef },
  // excluyent types of item
  //asset: { type: Schema.Types.ObjectId, ref: 'Asset' }, // Opcional (objetos tangibles o intangibles)
  //concept: { type: Schema.Types.ObjectId, ref: 'OperationConcept' }, // Opcional (impuesto, interés, conceptos abstractos)

  detail: { type: String },
};

export const schema = new Schema(OperationItemFields)