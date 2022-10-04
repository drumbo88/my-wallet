import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  currency: { type: String, required: true, ref: 'Currency' },
  quantity: { type: Number, min: 0 },
  amount: { type: Number, required: true, min: 0 },

  // excluyent types of item
  asset: { type: Schema.Types.ObjectId, ref: 'Asset' }, // Opcional
  concept: { type: Schema.Types.ObjectId, ref: 'OperationConcept' }, // Opcional

  detail: { type: String },
});

schema.statics.seed = mongoose.seed

const model = mongoose.model('OperationItem', schema);

export { model, schema };
