import { DocumentType, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { myModelOptions } from "../config";
import { BaseModel } from "./BaseModel";
import { Currency } from "./Currency";
import { OperationItemDetail } from "./OperationItemDetail";
import { OperationItemStatus } from "common/types/operationItem";
import { Asset } from "./Asset";
import { CountableConcept } from "./CountableConcept";

export type DocOperationItem = DocumentType<OperationItem>;

export type OperationItemType = Asset | CountableConcept // CountableConcept | CountableOperation

/*************************************************************************************
 * Clase "OperationItem" para Items de Operations
 */
@modelOptions(myModelOptions)
export class OperationItem extends BaseModel
{
    @prop({ ref: () => Currency, foreignField: 'code', localField: 'currency', alias: "currencyCode", required: true })
    currency: Ref<Currency, string>

    @prop({ type: Number, default: 1, required: true })
    quantity: number

    @prop({ type: Number, default: 0, required: true })
    amount: number

    @prop({ type: Number, default: 0, required: true })
    total: number

    @prop({ refPath: 'conceptType' })
    concept: Ref<OperationItemType>

    @prop({ type: String, enum: ['Asset', 'CountableConcept'] })
    conceptType: string

    @prop({ type: String, trim: true })
    detail: string

    @prop({ type: String, enum: OperationItemStatus, default: OperationItemStatus.ASSIGNED, required: true })
    status: string
}

export const OperationItemModel = getModelForClass(OperationItem);

/*
export const schema = new Schema({
  currencyCode: { type: String, ref: () => 'Currency' },
  quantity: { type: Number, default: 0 },
  amount: { type: Number, default: 0, required: true },
  total: { type: Number, default: 0 },

  concept: new Schema(OperationItemDetailRef, defaultSchemaOptions),
  // excluyent types of item
  //asset: { type: Schema.Types.ObjectId, ref: () => 'Asset' }, // Opcional (objetos tangibles o intangibles)
  //concept: { type: Schema.Types.ObjectId, ref: () => 'OperationConcept' }, // Opcional (impuesto, interés, conceptos abstractos)

  detail: { type: String },
}, defaultSchemaOptions)
*/