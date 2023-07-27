import { getModelForClass, modelOptions, DocumentType } from "@typegoose/typegoose";
import { myModelOptions } from "../config";
import { OperationItemConcept } from "./OperationItemConcept";

export type DocCountableConcept = DocumentType<CountableConcept>;

/*************************************************************************************
 * Clase "CountableConcept" para Items de Operations
 */
@modelOptions(myModelOptions)
export class CountableConcept extends OperationItemConcept {
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const CountableConceptModel = getModelForClass(CountableConcept);
