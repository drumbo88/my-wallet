import { DocumentType, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { myModelOptions } from "../config";
import { BaseModel } from "./BaseModel";
import { Currency } from "./Currency";
import { OperationItemDetail } from "./OperationItemDetail";
import { OperationItemStatus } from "common/types/operationItem";

export type DocOperationItem = DocumentType<OperationItem>;

/*************************************************************************************
 * Clase "OperationItem" para Items de Operations
 */
@modelOptions(myModelOptions)
export class OperationItem extends BaseModel
{
    @prop({ ref: Currency, foreignField: 'code', alias: "currencyCode" })
    currency: Ref<Currency>

    @prop({ type: Number, default: 0, required: true })
    quantity: number

    @prop({ type: Number, default: 0, required: true })
    amount: number

    @prop({ type: Number, default: 0, required: true })
    total: number

    @prop({ type: () => OperationItemDetail, ref: OperationItemDetail })
    concept: Ref<OperationItemDetail>

    @prop({ type: String })
    detail: string

    @prop({ type: String, enum: OperationItemStatus, default: OperationItemStatus.ASSIGNED, required: true })
    status: string
}


/*
export const schema = new Schema({
  currencyCode: { type: String, ref: 'Currency' },
  quantity: { type: Number, default: 0 },
  amount: { type: Number, default: 0, required: true },
  total: { type: Number, default: 0 },

  conceptId: new Schema(OperationItemDetailRef, defaultSchemaOptions),
  // excluyent types of item
  //asset: { type: Schema.Types.ObjectId, ref: 'Asset' }, // Opcional (objetos tangibles o intangibles)
  //concept: { type: Schema.Types.ObjectId, ref: 'OperationConcept' }, // Opcional (impuesto, interés, conceptos abstractos)

  detail: { type: String },
}, defaultSchemaOptions)
*/